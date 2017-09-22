import React, { Component } from 'react';
import { 
  Container,
  Footer,
  FooterTab,
  Button,
  Text,
  Icon
} from 'native-base';

import ProfileScreen from './profile-screen'
import LeaderboardScreen from './leaderboard-screen'
import RidesScreen from './rides-screen'

const screenMap = {
  profile: ProfileScreen,
  leaderboard: LeaderboardScreen,
  rides: RidesScreen,
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "profile"
    };
  }

  getActiveTab(tab) {
    return (tab === this.state.currentScreen);
  }

   switchScreen(screen) {
      this.setState({currentScreen: screen})
   }

  render() {
    const Screen = screenMap[this.state.currentScreen];
    const { authToken } = this.props.navigation.state.params;

    return (
      <Container>
        <Screen authToken={authToken}/>
        <Footer>
          <FooterTab>
            <Button 
              onPress={() => this.switchScreen("leaderboard") }
              active={this.getActiveTab("leaderboard")}
            >
              <Icon name="trophy" />
              <Text>Leaderboard</Text>
            </Button>
            <Button 
              onPress={() => this.switchScreen("rides") }
              active={this.getActiveTab("rides")}
            >
              <Icon name="ios-bicycle" />
              <Text>Rides</Text>
            </Button>
            <Button 
              onPress={() => this.switchScreen("profile") }
              active={this.getActiveTab("profile")}
            >
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    )
  }
}