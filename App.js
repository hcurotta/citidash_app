import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import LoginScreen from './screens/login-screen'
import ProfileScreen from './screens/profile-screen'
import RefreshDataScreen from './screens/refresh-data-screen'
import Main from './screens/main'

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'main' })
    ]
});

const MainNav = StackNavigator({
    Profile: { 
      screen: ProfileScreen,
      navigationOptions: {
        header: null, 
      },
    },
});

const LoginNav = StackNavigator({
    Login: { 
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    RefreshData: { 
      screen: RefreshDataScreen,
      navigationOptions: {
        header: null,
      },
    },
    Main: { 
      screen: Main,
      navigationOptions: {
        header: null,
      },
    },
});


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <View style={{padding: 10}}>
        <LoginNav />
      // </View>
    );
  }
}
