import React, { Component } from "react";

import { 
  Container, 
  Header, 
  Body,
  Right,
  Left,
  Title,
  Content,
  Segment,
  Button,
  Text,
  List, 
  ListItem,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { ApiUtils } from "CitiDash/util/api-utils"

export default class LeaderboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRetrieved: false,
      leaderboard: "tripLeaderboard",
    };
  }

  componentWillMount() {
    this.fetchData(this.state.leaderboard);
  }

  getActiveLeaderboard(leaderboard) {
    return (this.state.leaderboard === leaderboard);
  }

  switchLeaderboard(leaderboard) {
    this.setState({leaderboard: leaderboard});
    this.fetchData(leaderboard)
  }

  fetchData(leaderboard) {
    const { authToken } = this.props;
    fetch(
      ApiUtils.getApiEndpoint(leaderboard), 
      {
        headers: ApiUtils.getAuthHeaders(authToken)
      }
    )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        dataRetrieved: true,
        leaderboardData: responseJson.data
      })
    })
    .catch(e => {
      e
    })    
  }

  renderLeaderboardList() {
    if (this.state.dataRetrieved) {
      const { leaderboardData } = this.state;
      const { leaderboard } = this.state;
      let stat = "";
      listItems = leaderboardData.map((data, i) => {
        if (leaderboard === "tripLeaderboard") {
          stat = `${data.trip_count} trips`;
        } else if (leaderboard === "durationLeaderboard") {
          stat = `${(Math.round(data.total_duration / 3600)).toString()} hrs`
        } else if (leaderboard === "distanceLeaderboard") {
          stat = `${data.total_distance} miles`
        }

        return (
          <ListItem key={i}>
            <Left>
              <Text>{i + 1}. {data.user.name}</Text>
            </Left>
            <Right>
              <Text style={{textAlign: 'right'}}>{stat}</Text>
            </Right>
          </ListItem>
        );
      });

      return (
        <List>
          {listItems}
        </List>
      );
    }
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Body>
            <Title>Leaderboard</Title>
          </Body>
        </Header>
        <Segment>
          <Button first
            active={this.getActiveLeaderboard("tripLeaderboard")}
            onPress={() => this.switchLeaderboard("tripLeaderboard") }
          >
            <Text>Rides</Text>
          </Button>
          <Button
            active={this.getActiveLeaderboard("durationLeaderboard")}
            onPress={() => this.switchLeaderboard("durationLeaderboard") }
          >
            <Text>Duration</Text>
          </Button>
          <Button last 
            active={this.getActiveLeaderboard("distanceLeaderboard")}
            onPress={() => this.switchLeaderboard("distanceLeaderboard") }
          >
            <Text>Distance</Text>
          </Button>
        </Segment>
        <Content>
          {this.renderLeaderboardList()}
        </Content>
      </Container>
    );
  }
}