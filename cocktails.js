
var cocktailList = [];
var yourCocktailList = [];
var cocktailnames = [];
var yourCocktailnames = [];

//function for creating your own cocktail in app
export function Cocktail(photo, type, name, ing, steps){
  this.photo = photo;
  this.type = type;
  this.name = name;
  this.ing = ing;
  this.steps = steps;
  cocktailList.push(this);
  cocktailnames.push(name)

};

export function YourCocktail(photo, type, name, ing, steps){
  this.photo = photo;
  this.type = type;
  this.name = name;
  this.ing = ing;
  this.steps = steps;
  yourCocktailList.push(this);
  yourCocktailnames.push(name)

};

var oldFashioned = new Cocktail(
  "none",
  "Whiskey",
  "Old Fashioned",
  ["bitters", "sugar", "orange wheel", "cherry", "soda", "bourbon"],
  ["muddle all but bourbon and cherry", "remove rind", "garnish"]
);

var oldFashioned2 = new Cocktail(
  "none",
  "Whiskey",
  "Old Fashioned2",
  ["bitters", "sugar", "orange wheel", "cherry", "soda", "bourbon"],
  ["muddle all but bourbon and cherry", "remove rind", "garnish"]
);

export {cocktailList};
export {yourCocktailList};
export {cocktailnames};
export {yourCocktailnames};
/*
<List>
  <FlatList
    data = {this.state.dataSource}
    renderItem = {({ item }) => (
      <ListItem
        title= {`${item.name}`}
      />
    )}
  />
</List>
*/
