import React, {Component} from "react";
import SearchForm from "./SearchForm";
import axios from "axios";


class Recipes extends Component {
    constructor(){
        super();
        this.state={
            ingredients:[]
        }
        this._updateIngredients = this._updateIngredients.bind(this)
    }
    _updateIngredients = (event) => {
        this.setState({ ingredients:event.target.value });
    }
    fetchRecipes(q){

    }
    render(){
        return(
            <div>
                < SearchForm onInput ={this._updateIngredients}/>
            </div>
            
            
        )
    }

}


export default Recipes;