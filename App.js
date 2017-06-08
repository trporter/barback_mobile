import {
  cocktailList,
  yourCocktailList,
  Cocktail,
  yourCocktailnames,
  YourCocktail,
} from './cocktails.js';
import React, { Component } from 'react';
import { styles } from './styles.js';
import {
  AppRegistry,
  Text,
  Button,
  ScrollView,
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
  }
  render(){
    const onPressRow = (rowData) => {
      this.props.navigation.navigate('CocktailDetail', { cocktail: rowData.name })
    }
    const { navigate } = this.props.navigation;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(cocktailList),
    };
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'teal' }}>
        <View style={{backgroundColor: 'white', padding: 10}}>
          <TextInput
            style={{height: 20}}
            placeholder="Search"
            placeholderTextColor= 'black'
          />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableHighlight onPress={onPressRow}>
              <Text style={{padding: 5}}>{rowData.name.toString()}</Text>
            </TouchableHighlight>
          }
        />
      </View>
    );
  }
}

class YourCocktailsScreen extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    const onPressRow = () => {
      this.props.navigation.navigate('CocktailDetail', { cocktail: yourCocktailnames[0] })
    }
    const { navigate } = this.props.navigation;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(yourCocktailnames),
    };
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
          renderRow={(rowData) =>
            <TouchableHighlight onPress={onPressRow}>
              <Text style={{padding: 5}}>{rowData}</Text>
            </TouchableHighlight>
          }
        />
      </View>
    );
  }
}

class CocktailCreatorScreen extends Component{
  constructor() {
    super();
    this.state = {
      textIngNumber: 0,
      ingredients: [],
      textStepNumber: 0,
      steps: [],
      types: [],
      mode: Picker.MODE_DIALOG,
      name: '',
      photo: '',
    };
  }
  render(){
    const addIng = () => {
      this.setState({ textIngNumber: this.state.textIngNumber += 1});
      this.state.ingredients.push(
        <TextInput
          onChangeText={(ing) => this.setState({ingredients: ingredients.push(ing)})}
          key = {this.state.textIngNumber}
          style={{height: 20}}
          placeholder="Add ingredient"
          placeholderTextColor='black'
          backgroundColor='white'
        />
      )
    }
    const removeIng = () => {
      this.setState({ textIngNumber: this.state.textIngNumber -= 1});
      this.state.ingredients.pop();
    }
    const addStep = () => {
      this.setState({ textStepNumber: this.state.textStepNumber += 1});
      this.state.steps.push(
        <TextInput
          key = {this.state.textStepNumber}
          style={{height: 20}}
          placeholder="Add Step"
          placeholderTextColor='black'
          backgroundColor='white'
        />
      )
    }
    const removeStep = () => {
      this.setState({ textStepNumber: this.state.textStepNumber -= 1});
      this.state.steps.pop();
    }
    const makeCocktail = () => {
      yourCocktailList.push(YourCocktail(
        this.state.photo,
        this.state.type,
        this.state.name,
        this.state.ingredients,
        this.state.steps));
      this.props.navigation.navigate('Your Cocktails');
    }
    return(
      <View style = {{flex: 1, flexDirection: 'column', backgroundColor: 'teal'}}>
        <ScrollView>
          <Text style = {styles.createText}>Name your Cocktail</Text>
          <TextInput
            onChangeText={(name) => this.setState({name: name})}
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
            onChangeText={(ing) => this.setState({ingredients: ingredients.push(ing)})}
            style={{height: 20}}
            placeholder="Add ingredient"
            placeholderTextColor='black'
            backgroundColor='white'
          />
          {this.state.ingredients}
          <View style={{flex: .25, flexDirection: 'row'}}>
            <Button
              onPress = {addIng}
              title="+"
              color="black"
            />
            <Button
              onPress = {removeIng}
              title="-"
              color="black"
            />
          </View>
          <Text style = {styles.createText}>Steps in your recipe</Text>
          <TextInput
            onChangeText={(step) => this.setState({steps: steps.push(step)})}
            style={{height: 20}}
            placeholder="Add step"
            placeholderTextColor='black'
            backgroundColor='white'
          />
          {this.state.steps}
          <View style={{flex: .25, flexDirection: 'row'}}>
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
            onPress = {makeCocktail}
            title="Finish"
            color="black"
          />
        </ScrollView>
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
