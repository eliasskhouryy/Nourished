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
           filtertRecipies: [],
           images: []
        }
      

        this._updateIngredients = this._updateIngredients.bind(this)
    }

    _updateIngredients = (value) => {
        this.setState({ UsersIngredients: [...this.state.UsersIngredients,value] });
    };
    

    // fetchIngredients = (q)  => {
    //     console.log(q)
    //     const YOUR_APP_ID= `ed915139`
    //     const YOUR_APP_KEY= `20897d8b19acddb5430623952b860b2a`
    //     const [value, setValue] = useState('');
    //     const [list,setList] = useState('alcohol-free')
    //     const SERVER_URL = `https://api.edamam.com/search?q=${value}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${list}`;
        
        
    //             // const filter = response.data.filter(Recipe => {
    //             // return Recipe.hits[0].recipe.ingredients == this.state.UsersIngredients
    //             // });
    //             // console.log(filter)
    //             // this.setState({
    //             //     filtertRecipies: filter
    //             // });
    //     }; 
    // }
    
    render() {
        return(
            <div>
                <h1>Add ingredients</h1>
                <SearchFormIngredients _updateIngredients={this._updateIngredients}  onSubmit={this._updateIngredients} fetchIngredients={this._updateIngredients} RecipeGallery={this._updateIngredients}/>
                < DisplayIngredients UsersIngredients={this.state.UsersIngredients}/> 
                {/* <RecipeGallery UsersIngredients={this.state.UsersIngredients} /> */}
            </div>
        );
    }
    
}

const SearchFormIngredients = (props) => {
    const [value, setValue] = useState('');
   

    const _handleInput = (event) =>{
        setValue(event.target.value)
    };

    // async function getRec (){
    // const result = await axios.get(SERVER_URL)
    // setRcp(result.data.hits)
    // console.log(result.data)
    // console.log(result.data.hits[0].recipe.image)
    // }

    const _handleSubmit = (event) => {
            event.preventDefault();
            props.onSubmit(value);
            setValue('');  
            // getRec()
        }

        return(
        <form onSubmit ={ _handleSubmit }>
            <input type="search" required placeholder="Add your ingredients" value={value} onChange={e => setValue(e.target.value)} className='pa3 ba b--green bg-light-blue' />
            <input type="submit" value="Add Ingredient" className='pa3 ba ' />
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
const RecipeGallery = async (props) => {
    let inputName = props.UsersIngredients[0];
    console.log(inputName)
    const [rcp,setRcp] = useState([])
    const [list,setList] = useState('alcohol-free')
    
    const YOUR_APP_ID= `ed915139`
    const YOUR_APP_KEY= `20897d8b19acddb5430623952b860b2a`
    const SERVER_URL = `https://api.edamam.com/search?q=${inputName}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${list}`;
    console.log(SERVER_URL)

    // axios(SERVER_URL).then((response) =>{
    //             this.setState({images: response.data.hits[0].recipe.image})
    //             console.log(response.data.hits[0].recipe.image)
    //             console.log(SERVER_URL)


    // })
}


export default SearchForm;