
import {
  cocktailList,
} from './cocktails.js';
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  Picker,
  StyleSheet,
  TextInput,
  List,
  ListView,
  FlatList,
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
      dataSource: ds.cloneWithRows([
        cocktailList
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
            placeholderTextColor='black'
          />
          <Button
            onPress = {() => navigate('CreateCocktail')}
            title="Create"
            color="black"
          />
        </View>
        <Text style = {{paddingTop: 20}}>List of your cocktails</Text>
      </View>
    );
  }
}

class CocktailCreatorScreen extends Component{
  state = {
    types: [],
    color: 'blue',
    mode: Picker.MODE_DIALOG,
  };
  render(){
    return(
      <View style = {{flex: 1, flexDirection: 'column', backgroundColor: 'red' }}>
        <Text style = {styles.createText}>Name your Cocktail</Text>
        <TextInput
          style={{height: 15, padding: 10}}
          placeholder="Name"
          placeholderTextColor='black'
          backgroundColor='white'
        />
        <Text style = {styles.createText}>What family?</Text>
        <Picker
        style={{backgroundColor: 'white'}}
          selectedValue={this.state.types}
          onValueChange={(type) => this.setState({types: type})}>
          <Picker.Item label="whiskey" value="key0" />
          <Picker.Item label="vodka" value="key1" />
          <Picker.Item label="gin" value="key2" />
          <Picker.Item label="rum" value="key3" />
          <Picker.Item label="other" value="key4" />
        </Picker>
        <Text style = {styles.createText}>List the ingredients</Text>
        <Text style = {styles.createText}>Steps in your recipe</Text>
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
  createText: {
    justifyContent: 'center',
    padding: 10,
  }
});

//figure out how to style the header!!!
MainScreenNavigator.navigationOptions = {
  title: 'BarBack',
};

const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  CocktailDetail: { screen: CocktailScreen },
  CreateCocktail: { screen: CocktailCreatorScreen },
});

AppRegistry.registerComponent('Barback_mobile', () => SimpleApp);
