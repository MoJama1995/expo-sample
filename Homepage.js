import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Right,
  Icon,
  Title,
  Card,
  View,
  CardItem,
  List,
  Content
} from "native-base";

import { Text, AppState } from "react-native";
import { db, firebase } from "./Api";

export default class Homepage extends Component {
  state = {
    locations: []
  };

  componentDidMount() {
    const arrayOfObjects = [];
    db.collection("locations")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          arrayOfObjects.push(doc.data());
        });
        this.setState({ locations: arrayOfObjects });
      });
  }
  render() {
    const { locations } = this.state;

    console.log(locations);
    return (
      <Container>
        <Button transparent>
          <Icon name="search" />
        </Button>
        <Button transparent>
          <Icon name="menu" />
        </Button>
        <View>
          <Card>
            <Text>hi</Text>
          </Card>
          <Card>
            <Text>"Location 1"</Text>
          </Card>

          <Card>
            <Text>"Location 1"</Text>
          </Card>

          <Card>
            <Text>"Location 1"</Text>
          </Card>

          <Card>
            <Text>"Location 1"</Text>
          </Card>
        </View>
      </Container>
    );
  }
}
