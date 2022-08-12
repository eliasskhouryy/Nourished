import React, {Component , useState } from "react";
import axios from "axios";
import { render } from "@testing-library/react";
import Recipes from "./Recipes";

const SERVER_URL = 'http://localhost:3000/flights.json';

class SearchForm extends Component{
    constructor(){
        super();
        this.state = {
           ingredients: [],
           UsersIngredients:['Chicken', "melon"],
           Recipes:[],
           filtertRecipies: []

        }

        this._updateIngredients = this._updateIngredients.bind(this)
    }

    _updateIngredients = (event) => {
        this.setState({ UsersIngredients:event.target.value });
    };
  

    
    // fetchIngredients = ()  => {
    //     axios(SERVER_URL).then((response) =>{
    //             this.setState({ingredients: response.data})

    //             const filter = response.data.filter(ingredients => {
    //             return ingredients.ADDCONECTION(JSON) == this.state.ingredients
    //             });
    //             console.log(filter)
    //             this.setState({
    //                 filtertRecipies: filter
    //             });
    //     }); 
    // }
    
    render() {
        return(
            <div>
                <h1>Add ingredients</h1>
                <SearchFormIngredients _updateIngredients={this._updateIngredients}  onSubmit={this.fetchIngredients}/>
                < DisplayIngredients UsersIngredients={this.state.UsersIngredients}/> 
            </div>
        );
    }
}

const SearchFormIngredients = (props) => {
    const [value, setValue] = useState('');

    const _handleInput = (e) =>{
        setValue(e.target.value)
    };

    const _handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(value);
        setValue('');  
    }

    return(
        <form onSubmit ={ _handleSubmit }>
            <input type="search" required placeholder="Add your ingredients" onSubmit={_handleInput} />
            <input type="submit" value="Add Ingredient" />
        </form>
    );
}

const DisplayIngredients = (props) => {


    return(
        <div>
            {/* <p>{props.UsersIngredients.length}</p> */}
            {props.UsersIngredients.map((s) => <p key={s.toString()}>{s.UsersIngredients}</p>)}
        </div>
    )
}

export default SearchForm;