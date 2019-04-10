import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
  AsyncStorage
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Dialog from 'react-native-dialog';
import { Ionicons } from '@expo/vector-icons';

import { withFirebase } from '../components/Firebase';

class FamilyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      families: [],
      addNewFamily: false,
      newFamilyName: ''
    };
  }

  getFamilies = async () => {
    const families = JSON.parse(await AsyncStorage.getItem('families'));

    if (Array.isArray(families) && !!families.length) {
      const getDataForFamily = async family => {
        const snapshot = await this.props.firebase.family(family).once('value');
        return snapshot.val();
      };
      const familyPromises = families.map(getDataForFamily);
      const completed = await Promise.all(familyPromises);
      return completed;
    } else {
      return [];
    }
  };

  handleAddNewFamily = async () => {
    const newFamilyRef = this.props.firebase.families().push();
    await newFamilyRef.set({
      name: this.state.newFamilyName
    });
    // mergeItem fails here due to type mismatch (wants JSONArray but we can only give JSONObject)
    const oldFamilies = JSON.parse(await AsyncStorage.getItem('families'));
    oldFamilies.push(newFamilyRef.key);
    await AsyncStorage.setItem('families', JSON.stringify(oldFamilies));
    this.setState({
      addNewFamily: false,
      families: await this.getFamilies()
    });
  };

  async componentDidMount() {
    this.setState({
      families: await this.getFamilies(),
      loading: false
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.loading ? (
          <Text>Loading</Text>
        ) : (
          <>
            {this.state.families.map(family => (
              <Touchable
                style={styles.option}
                background={Touchable.Ripple('#ccc', false)}
                key={family.name}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.optionIconContainer}>
                    <Ionicons
                      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
                      resizeMode="contain"
                      fadeDuration={0}
                      size={20}
                    />
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{family.name}</Text>
                  </View>
                </View>
              </Touchable>
            ))}
            <Touchable
              style={styles.option}
              background={Touchable.Ripple('#ccc', false)}
              onPress={() => this.setState({ addNewFamily: true })}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                  <Ionicons
                    name={
                      Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'
                    }
                    resizeMode="contain"
                    fadeDuration={0}
                    size={20}
                  />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionText}>Add new</Text>
                </View>
              </View>
            </Touchable>
          </>
        )}
        <Dialog.Container visible={this.state.addNewFamily}>
          <Dialog.Title>Family name</Dialog.Title>
          <Dialog.Description>
            Please enter a name for the family
          </Dialog.Description>
          <Dialog.Input
            label="Name"
            onChangeText={name => this.setState({ newFamilyName: name })}
            onSubmitEditing={this.handleAddNewFamily}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({ addNewFamily: false })}
          />
          <Dialog.Button label="Confirm" onPress={this.handleAddNewFamily} />
        </Dialog.Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  optionIconContainer: {
    marginRight: 9
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED'
  },
  optionText: {
    fontSize: 15,
    marginTop: 1
  }
});

const ConnectedFamilyScreen = withFirebase(FamilyScreen);
ConnectedFamilyScreen.navigationOptions = {
  title: 'Families'
};
export default ConnectedFamilyScreen;
