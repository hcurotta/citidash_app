import { ApiUtils } from "CitiDash/util/api-utils"
import React, { Component } from "react";
import { 
  Container,
  Text,
  Spinner,
  H1,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class RefreshDataScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.refreshData();
  }

  refreshData = (e) => {
    const { params } = this.props.navigation.state;

    fetch(
      ApiUtils.getApiEndpoint('refreshData'),
      {
        method: "POST",
        headers: {
          ...ApiUtils.getAuthHeaders(params.authToken),
          ...ApiUtils.getPostHeaders(),
        },
      }
    )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        this.props.navigation.navigate("Login", {logout: true});
        return false;
      }
    })
    .then(responseJson => {
      if (responseJson) {
        this.props.navigation.navigate("Main", {authToken: params.authToken});
      }
    })
    .catch(e => {
      e
    })
  }

  render() {
    return (
      <Container>
        <Grid>
          <Row size={4}/>
          <Row size={1} style={{justifyContent: "center"}}>
            <H1>CitiDash</H1>
          </Row>
          <Row size={1} style={{justifyContent: "center"}}>
            <Text>Downloading your rides</Text>
          </Row>
          <Row size={1} style={{justifyContent: "center"}}>
            <Spinner color='blue' />
          </Row>
          <Row size={4} />
        </Grid>
      </Container>
    );
  }
}