import React, { Component } from "react";

import { 
  Container, 
  Header, 
  Body,
  Title,
  Content,
  Text,
} from 'native-base';


export default class RidesScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Rides</Title>
          </Body>
        </Header>
        <Content>
          <Text>TBD</Text>
        </Content>
      </Container>
    );
  }
}