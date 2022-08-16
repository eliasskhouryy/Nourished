import React, {Component , useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchResultShow from './SearchResultShow'
import '../recipe.css'

class AddIngredients extends Component{
    constructor(){
        super();
        this.state = {
           UsersIngredients:[],
        }
        this._updateIngredients = this._updateIngredients.bind(this)
    }

    _updateIngredients = (value) => {
        this.setState({ UsersIngredients: [...this.state.UsersIngredients,value] });
    };

    render() {
        return(
            <div className="display_Ingredients">
                <h1>Add ingredients</h1>
                <SearchFormIngredients _updateIngredients={this._updateIngredients}  onSubmit={this._updateIngredients} ingredients={this.state.UsersIngredients} onClick={this._handleClick}/>
                < DisplayIngredients UsersIngredients={this.state.UsersIngredients} /> 
            </div>
        );
    }
}

const DisplayIngredients = (props) => {
    return(
        <div>
            <p>Ingredients: {props.UsersIngredients.length}</p>
            {props.UsersIngredients.map((s) => <p key={s.toString()}>{s}</p>)}
        </div>
    )   
}

const SearchFormIngredients = (props) => {
    const [value, setValue] = useState('');
    const _handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(value);
        setValue('');  
    } 
    return(
        <div>
            <form onSubmit ={ _handleSubmit }>
                <input type="search" required placeholder="Add your ingredients" value={value} onChange={e => setValue(e.target.value)} className='pa3 ba b--green bg-light-blue' />
                <input type="submit" value="Add Ingredient" className='pa3 ba ' />
            </form>
            <Link to={`/results/${props.ingredients.join(",")}`}>
            <input  type="button" value="Search for filtert Recipes" className='filter' />
            </Link>
        </div>
    );
}

export default AddIngredients;