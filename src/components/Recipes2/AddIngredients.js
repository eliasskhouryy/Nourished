import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchResultShow from './SearchResultShow';
import '../recipe.css';

class AddIngredients extends Component {
	constructor() {
		super();
		this.state = {
			UsersIngredients: [],
			pantryitems: []
		};
		this._updateIngredients = this._updateIngredients.bind(this);
		// this._updatePantry = this._updatePantry.bind(this)
	}

	_updateIngredients = (value) => {
		let updatedIngredients = [];
		if(this.state.UsersIngredients.includes(value)){
			updatedIngredients = this.state.UsersIngredients.filter((i)=> i!=value)
		} else {
			updatedIngredients = [...this.state.UsersIngredients, value]
		}

		this.setState({ UsersIngredients: updatedIngredients });
	};

	// _updatePantry = (value) => {
    //     this.setState({ pantryitems: [...this.state.pantryitems,value] });
    // };

	render() {
		return (
			<div className="display_Ingredients">
				<SearchFormIngredients _updateIngredients={this._updateIngredients} onSubmit={this._updateIngredients} ingredients={this.state.UsersIngredients} onClick={this._handleClick} />
				<DisplayIngredients UsersIngredients={this.state.UsersIngredients} />
				<PantryForm onChange={this._updateIngredients} UsersIngredients={this.state.UsersIngredients}  />
			</div>
		);
	}
}

const DisplayIngredients = (props) => {
	return (
		<div>
			<p>Ingredients: {props.UsersIngredients.length}</p>
			{props.UsersIngredients.map((s) => (
				<p key={s.toString()}>{s}</p>
			))}
		</div>
	);
};

const SearchFormIngredients = (props) => {
	const [value, setValue] = useState('');
	const _handleSubmit = (event) => {
		event.preventDefault();
		props.onSubmit(value);
		setValue('');
	};
	return (
		<div className="mainSearch">
			<h1>Add ingredients</h1>

			<form onSubmit={_handleSubmit}>
				<input type="search" required placeholder="Add your ingredients" value={value} onChange={(e) => setValue(e.target.value)} className="searchBar" />
				<input type="submit" value="+" className="button" />
			</form>
			<Link to={`/results/${props.ingredients.join(',')}`}>
				<input type="button" value="Search for filtert Recipes" className="filterButton" />
			</Link>
		</div>
	);

};

const PantryForm = (props) => {
    console.log(props)
    const [garlic,setFirst]=useState(true);
    const [oliveoil,setSecond]=useState(true);
    const handleChange = (data) => {
            //     if(garlic === true){
            //     console.log(data)
            //     props.onChange(data)
            // }
		if ( data === 'garlic'){
			setFirst(!garlic) 
		}

		// if(oliveoil === true ){
		// 	console.log(data)
		// 	props.onChange(data)
		// }
		
		if ( data === 'oliveoil'){
			setSecond(!oliveoil)
		}
		props.onChange(data)
        }

    return(
        <div className = "mainSearch pantryform">
            Your Pantry
            <br></br>
            <input onChange = {()=>handleChange("garlic")} type = "checkbox"  value = {garlic} /> Garlic
            <input onChange = {()=>handleChange("oliveoil")} type = "checkbox"  value = {oliveoil}  /> Olive Oil
            {/* <p>Pantryitems: {props.UsersIngredients.length}</p> */}
        </div>
    )
}

export default AddIngredients;
