
import {
  cocktailList,
  yourCocktailList,
} from './cocktails.js';
import React, { Component } from 'react';
import { styles } from './styles.js';
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
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'teal' }}>
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
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        yourCocktailList
      ]),
    };
  }
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'teal' }}>
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

class CocktailCreatorScreen extends Component{
  state = {
    types: [],
    mode: Picker.MODE_DIALOG,
  };
  render(){
    const addIngredient = () => {

    };
    const addStep = () => {

    };
    const removeIngredient = () => {

    };
    const removeStep = () => {

    };
    return(
      <View style = {{flex: 1, flexDirection: 'column', backgroundColor: 'teal' }}>
        <Text style = {styles.createText}>Name your Cocktail</Text>
        <TextInput
          style={{height: 20}}
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
        <TextInput
          style={{height: 20}}
          placeholder="Add ingredient"
          placeholderTextColor='black'
          backgroundColor='white'
        />
        <View style={{flex: .25, flexDirection: 'row'}}>
          <Button
            onPress = {addIngredient}
            title="+"
            color="black"
          />
          <Button
            onPress = {removeIngredient}
            title="-"
            color="black"
          />
        </View>
        <Text style = {styles.createText}>Steps in your recipe</Text>
        <TextInput
          style={{height: 20}}
          placeholder="Add step"
          placeholderTextColor='black'
          backgroundColor='white'
        />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button
            onPress = {addStep}
            title="+"
            color="black"
          />
          <Button
            onPress = {removeStep}
            title="-"
            color="black"
          />
        </View>
        <Button
          onPress = {removeStep}
          title="Finish"
          color="black"
        />
      </View>
    );
  }
}

const MainScreenNavigator = TabNavigator({
  //tabs at bottom
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
