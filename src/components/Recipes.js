import React, {Component} from "react";
import SearchForm from "./SearchForm";
import axios from "axios";
import RecipeGallery from './RecipeGallery';
import TestForm from './TestForm';


class Recipes extends Component {
    constructor(){
        super();
        this.fetchRecipes = this.fetchRecipes.bind(this)
        this.state={
            ingredients:[],
            recipes: []
        }
        this._updateIngredients = this._updateIngredients.bind(this)
    }
    _updateIngredients = (event) => {
        this.setState({ ingredients:event.target.value });
    }
    render(){
        return(
            <div>

            <h1>Nourished</h1>   
            < SearchForm onInput ={this._updateIngredients}/>
            <RecipeGallery recipes = {this.state.recipes}  />
            
            </div> 
        )
    }
}


export default Recipes;