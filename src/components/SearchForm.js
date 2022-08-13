import React, {Component , useState } from "react";
import axios from "axios";
import { render } from "@testing-library/react";
import Recipes from "./Recipes";



class SearchForm extends Component{
    constructor(){
        super();
        this.state = {
           ingredients: [],
           UsersIngredients:[],
           Recipes:[],
           filtertRecipies: []
        }

        this._updateIngredients = this._updateIngredients.bind(this)
    }

    _updateIngredients = (value) => {
        this.setState({ UsersIngredients: [...this.state.UsersIngredients,value] });
    };

   
    fetchIngredients = ()  => {
        
        const YOUR_APP_ID= `ed915139`
        const YOUR_APP_KEY= `0fd96fbce44449366d6bb13f75f9d475`
        const [value, setValue] = useState('');
        const [list,setList] = useState('alcohol-free')
        const SERVER_URL = `https://api.edamam.com/search?q=${value}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${list}`;

        axios(SERVER_URL).then((response) =>{
                this.setState({Recipes: response.hits.recipe.label})
                console.log(response)

                // const filter = response.data.filter(Recipe => {
                // return ingredients.ADDCONECTION(JSON) == this.state.ingredients
                // });
                // console.log(filter)
                // this.setState({
                //     filtertRecipies: filter
                // });
        }); 
    }

    render() {
        return(
            <div>
                <h1>Add ingredients</h1>
                <SearchFormIngredients _updateIngredients={this._updateIngredients}  onSubmit={this._updateIngredients}/>
                < DisplayIngredients UsersIngredients={this.state.UsersIngredients}/> 

            </div>
        );
    }
    
}

const SearchFormIngredients = (props) => {
    const [value, setValue] = useState('');
    const [rcp,setRcp] = useState([])
    const [list,setList] = useState('alcohol-free')
    
    const YOUR_APP_ID= `ed915139`
    const YOUR_APP_KEY= `0fd96fbce44449366d6bb13f75f9d475`

    const SERVER_URL = `https://api.edamam.com/search?q=${value}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${list}`;


    const _handleInput = (event) =>{
        setValue(event.target.value)
    };

    async function getRec (){
    const result = await axios.get(SERVER_URL)
    setRcp(result.data.hits)
    console.log(result.data)
    }

    const _handleSubmit = (event) => {
            event.preventDefault();
            props.onSubmit(value);
            setValue('');  
            getRec()
        }

        return(
        <form onSubmit ={ _handleSubmit }>
            <input type="search" required placeholder="Add your ingredients" value={value} onChange={e => setValue(e.target.value)} />
            <input type="submit" value="Add Ingredient" />
        </form>
    );
}

const DisplayIngredients = (props) => {
    
    return(
        <div>
            <p>{props.UsersIngredients.length}</p>
            {props.UsersIngredients.map((s) => <p key={s.toString()}>{s}</p>)}
        </div>
    )
}



export default SearchForm;