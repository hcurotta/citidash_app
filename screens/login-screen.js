import { serialize } from "CitiDash/util/utils";
import { ApiUtils } from "CitiDash/util/api-utils"
import React, { Component } from "react";

import {
  View,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";

import { 
  Container,
  Content,
  Text,
  H1,
  Form,
  Item,
  Input,
  Label,
  Button,
  Spinner,
} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggingIn: false,
      authTokenChecked: false,
    };
  }

  async getAuthToken() {
      try {
        const token = await AsyncStorage.getItem('authToken');
        this.props.navigation.navigate("RefreshData", {authToken: token});
        this.setState({authTokenChecked: true})
      } catch (error) {
        this.setState({authTokenChecked: true})
      } 
  }

  async setAuthToken(token) {
      try {
        console.log(token);
        await AsyncStorage.setItem('authToken', token);
        if (token != null) {
          this.props.navigation.navigate("RefreshData", {authToken: token});
        }
      } catch (error) {
        console.log(error)
        alert("Login failed, please try again.");
        this.setState({loggingIn: false})
      } 
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('authToken');
      this.setState({authTokenChecked: true})
    } catch (error) {
      this.setState({authTokenChecked: true})
      console.log(error)
    } 
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params && params.logout) {
      this.logout()
    } else {
      this.getAuthToken();
    }
  }

  login = (e) => {
    this.setState({loggingIn: true});
    const email = this.state.email;
    const password = this.state.password;
    // const body = serialize({
    //     email: "hcurotta@gmail.com",
    //     password: "Alias007",
    //   })

    const body = serialize({
        email: email,
        password: password,
      })


    fetch(
      ApiUtils.getApiEndpoint('login'),
      {
        method: "POST",
        headers: {
          ...ApiUtils.getAuthHeaders(),
          ...ApiUtils.getPostHeaders(),
        },
        body: body,
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        alert("Login failed, please try again.");
        this.setState({loggingIn: false});
        return false;
      }
    })
    .then((responseJson) => {
      if (responseJson) {
        this.setAuthToken(responseJson.auth_token);
      }
    })
    .catch((error) => {
      this.setState({loggingIn: false});
      console.error(error);
    });
  }

  renderSplash() {
    if (this.state.authTokenChecked) {
      return
    }

    return(
      <Content>
        <Text>Checking Auth Token</Text>
      </Content>
    );
  }

  renderLoginForm() {
    if (!this.state.authTokenChecked) {
      return
    }

    const { loggingIn } = this.state;
    const loginButtonText = loggingIn ? "Signing in..." : "Sign in";
    
    return(
      <Grid>
          <Row size={1}/>
          <Row style={{justifyContent: "center"}}>
            <Text>Enter your Citibike details below</Text>
          </Row>
          <Row size={3}>
            <Col>
              <Form>
                <Item>
                  <Input
                    placeholder="Citibike Email"
                    onChangeText={(text) => this.setState({email: text})}
                  />
                </Item>
                <Item last>
                  <Input
                    placeholder="Citibike Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                  />
                </Item>
              </Form>

              <Button block 
                style={{ margin: 15, marginTop: 50 }}
                onPress={this.login.bind(this)}
                disabled={loggingIn}
              >
                <Text>{loginButtonText}</Text>
              </Button>
            </Col>
          </Row>
          <Row size={2}/>
      </Grid>
    );
  }

  render() {
    return (
      <Container>
        {this.renderSplash()}
        {this.renderLoginForm()}
      </Container>
    );
  }
}