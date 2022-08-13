import React, {Component,useState} from "react";
import SearchForm from "./SearchForm";
import axios from "axios";
// <<<<<<< HEAD
import RecipeGallery from './RecipeGallery';
// =======
// >>>>>>> 4f4411d9c09857b45b1a555d9cc0def4ffeddc77


class Recipes extends Component {
    constructor(){
        super();
        this.fetchRecipes = this.fetchRecipes.bind(this);
        this.state={
            ingredients:[],
            RecipesGallery: []
        }
          }

        fetchRecipes = (q)  => {
            const YOUR_APP_ID= `ed915139`
            const YOUR_APP_KEY= `0fd96fbce44449366d6bb13f75f9d475`
            const [value, setValue] = useState('');
            const [list,setList] = useState('alcohol-free')
            const SERVER_URL = `https://api.edamam.com/search?q=${value}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${list}`;
            const ApiParams ={
                search: q,
            };
            axios(SERVER_URL,{ params: ApiParams }).then((response) =>{
                const RecipesGallery = response.data.hits[0].recipe.image;
                this.setState({RecipesGallery: RecipesGallery})
            }); 
        }

    render(){
        return(
            <div>
                < SearchForm onInput ={this._updateIngredients} onSubmit={ this.fetchRecipes } />
                <RecipeGallery RecipesGallery = {this.state.RecipesGallery}  />
            </div>
            
            
        )
    }
}

export default Recipes;