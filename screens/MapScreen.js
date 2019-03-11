import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { WebBrowser, MapView, Permissions, Location } from 'expo';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
    locationResult: null
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.locationResult ? (
          <MapView
            style={styles.map}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            <MapView.Marker
              coordinate={this.state.location.coords}
              title="Liam"
              description="15m ago"
            />
            <MapView.Marker
              coordinate={{
                accuracy: 15.494999885559082,
                altitude: 0,
                heading: 0,
                latitude: 37.7,
                longitude: -121.9,
                speed: 0
              }}
              title="Mr. Kaehms"
              description="Just now"
            />
          </MapView>
        ) : (
          <ActivityIndicator style={styles.locationLoading} size="large" />
        )}
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  map: {
    flex: 1
  },
  locationLoading: {
    flex: 1
  }
});
