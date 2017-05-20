
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  TextInput,
  ListView,
} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';

class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Welcome',
  };
}

class CocktailScreen extends Component{
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    const isInfo = state.params.mode === 'info';
    const {user} = state.params;
    return {
      title: isInfo ? "Rachael's Contact Info" : 'Chat with Rachael',
      headerTintColor: 'red',
    };
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

class AllCocktailsScreen extends Component{
  constructor(props) {
    super(props);
    this.state = { text: ''};
  }
  render(){
    const { navigate } = this.props.navigation;
    return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'red' }}>
      <View style={{backgroundColor: 'white', padding: 10}}>
        <TextInput
          style={{height: 20}}
          placeholder="Search"
          placeholderTextColor= 'black'
        />
      </View>
      <Text style = {{paddingTop: 20}}>list of cocktails</Text>
    </View>
    );
  }
}

class YourCocktailsScreen extends Component{
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'red' }}>
        <View style={{backgroundColor: 'white', padding: 10}}>
          <TextInput
          style={{height: 20}}
            placeholder="Search"
            placeholderTextColor= 'black'
          />
          <Button
            title="Create"
            color="black"
          />
        </View>
        <Text style = {{paddingTop: 20,}}>List of your cocktails</Text>
      </View>
    );
  }
}

const MainScreenNavigator = TabNavigator({
  "All Cocktails": {
    screen: AllCocktailsScreen
  },
  "Your Cocktails": {
     screen: YourCocktailsScreen
  },
}, {
  tabBarOptions: {
    activeBackgroundColor: 'grey',
    labelStyle: {
      fontSize: 16,
      color: 'white',
      paddingBottom: 12,
    },
    style: {
      backgroundColor: 'black',
    },
  },
});

MainScreenNavigator.navigationOptions = {
  title: 'BarBack',
};

const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: CocktailScreen },
});

AppRegistry.registerComponent('Barback_mobile', () => SimpleApp);
