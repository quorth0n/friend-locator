import React from 'react';
import { ScrollView, StyleSheet, View, Text, Platform } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { Ionicons } from '@expo/vector-icons';

export default class FamilyScreen extends React.Component {
  static navigationOptions = {
    title: 'Families'
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-code' : 'md-code'}
                resizeMode="contain"
                fadeDuration={0}
                size={20}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>AP CSA Period 3</Text>
            </View>
          </View>
        </Touchable>
        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Ionicons
                name={
                  Platform.OS === 'ios'
                    ? 'ios-add-circle-outline'
                    : 'md-add-circle-outline'
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
