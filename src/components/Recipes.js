import React, {Component} from "react";
import SearchForm from "./SearchForm";
import axios from "axios";


class Recipes extends Component {
    constructor(){
        super();
        this.state={
            ingredients:[]
        }
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