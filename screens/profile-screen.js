import React, { Component } from "react";

import { 
  Container, 
  Header, 
  Body,
  Content,
  Title,
  Text,
  H1,
  H2,
  Spinner,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { ApiUtils } from "CitiDash/util/api-utils"

const styles = {
    textCenter: {
      justifyContent: "center"
    }
}

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRetrieved: false
    };
  }

  componentWillMount() {
    const { authToken } = this.props;
    fetch(
      ApiUtils.getApiEndpoint('profile'), 
      {
        headers: ApiUtils.getAuthHeaders(authToken)
      }
    )
    .then(ApiUtils.checkStatus)
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        dataRetrieved: true,
        profile: responseJson.data
      })
    })
    .catch(e => {
      e
    })
  }

  renderProfile() {
    if (this.state.dataRetrieved) {
      const { profile } = this.state;
      const { stats } = profile;

      return (
        <Grid>
          <Row size={4}/>
          <Row size={3} style={styles.textCenter}>
            <H1>
              {profile.first_name} {profile.last_name}
            </H1>
          </Row>
          <Row size={2}>
            <Col>
              <Row style={styles.textCenter}>
                <H2>{stats.yellow_jerseys.toString()}</H2>
              </Row>
              <Row style={styles.textCenter}>
                <Text>Yellow Jerseys</Text>
              </Row>
            </Col>
            <Col>
              <Row style={styles.textCenter}>
                <H2>{stats.trip_count.toString()}</H2>
              </Row>
              <Row style={styles.textCenter}>
                <Text>Trips</Text>
              </Row>
            </Col>
          </Row>
          <Row size={2}>
            <Col>
              <Row style={styles.textCenter}>
                <H2>{stats.total_distance.toString()} miles</H2>
              </Row>
              <Row style={styles.textCenter}>
                <Text>Distance</Text>
              </Row>
            </Col>
            <Col>
              <Row style={styles.textCenter}>
                <H2>{(Math.round(stats.total_duration / 3600)).toString()} hrs</H2>
              </Row>
              <Row style={styles.textCenter}>
                <Text>Duration</Text>
              </Row>
            </Col>
          </Row>
          <Row size={4}/>
        </Grid>
      );
    }
    return (
      <Content>
        <Spinner />
      </Content>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        {this.renderProfile()}
      </Container>
    );
  }
}
