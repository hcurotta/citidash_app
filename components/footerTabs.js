import React, { Component } from 'react';
import { 
  Footer,
  FooterTab,
  Button,
  Text,
  Icon 
} from 'native-base';

export default class FooterTabs extends Component {
  getActiveState(tab) {
    return (tab === this.props.activeTab);
  }

  render() {
    return (
        <Footer>
          <FooterTab>
            <Button active={this.getActiveState("leaderboard")}>
              <Icon name="trophy" />
              <Text>Leaderboard</Text>
            </Button>
            <Button active={this.getActiveState("rides")}>
              <Icon name="ios-bicycle" />
              <Text>Rides</Text>
            </Button>
            <Button active={this.getActiveState("profile")}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}