import React, {Component} from "react";
import axios from "axios";
import RecipeGallery from './RecipeGallery';


class Recipes extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                cominig
            <RecipeGallery />
            </div>
            
            
        )
    }

}


export default Recipes;