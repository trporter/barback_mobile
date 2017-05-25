
import "./cocktails"
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  StyleSheet,
  TextInput,
  ListView,
  TouchableHighlight,
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
    const {cocktail} = state.params;
    return {
      title: isInfo ? "Cocktail Info" : cocktail,
    };
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Details on {params.cocktail}</Text>
      </View>
    );
  }
}

class AllCocktailsScreen extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
      text: '',
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin',
      ]),
    };
    this.onPressButton = this.onPressButton.bind(this);
  }
  onPressButton(){
    this.props.navigation.navigate('CocktailDetail', { cocktail: 'Whiskey' })
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
          <ListView
            dataSource = {this.state.dataSource}
            renderRow = {(rowData) =>
              <TouchableHighlight onPress = {this.onPressButton}>
                <View style = {styles.row}>
                  <Text style = {styles.text}>
                    {rowData}
                  </Text>
                </View>
              </TouchableHighlight>
            }
          />
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F6F6F6',
  },
  text: {
    flex: 1,
  },
});

//figure out how to style the header!!!
MainScreenNavigator.navigationOptions = {
  title: 'BarBack',
};

const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  CocktailDetail: { screen: CocktailScreen },
});

AppRegistry.registerComponent('Barback_mobile', () => SimpleApp);
