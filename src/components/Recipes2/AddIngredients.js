import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchResultShow from './SearchResultShow';
import '../recipe.css';
import IngredientSelector from './IngredientSelector'


class AddIngredients extends Component {
	constructor() {
		super();
		this.state = {
			UsersIngredients: [],
			pantryitems: [],
			AllIngredients:[]
		};
		this._updateIngredients = this._updateIngredients.bind(this);
	}

	_updateIngredients = (value) => {
        this.setState({ UsersIngredients: [...this.state.UsersIngredients,value] });
		this._AllIngredientUpdate([...this.state.UsersIngredients,value],this.state.pantryitems);
    };

	_updatePantry = (value) => {
        this.setState({ pantryitems: value });
		this._AllIngredientUpdate(this.state.UsersIngredients, value);
    };

	_AllIngredientUpdate = (newUsersIngredients,value) => {

        this.setState({ AllIngredients: [...value, ...newUsersIngredients] });
    };

	// useEffect((items) => {
	// 	this.state.AllIngredients(items)
	// 	},[]);
	render() {
		return (
			<div className="display_Ingredients">
				<SearchFormIngredients _updateIngredients={this._updateIngredients} onSubmit={this._updateIngredients} ingredients={this.state.AllIngredients} onClick={this._handleClick} />
				<DisplayIngredients UsersIngredients={this.state.UsersIngredients} />
				<IngredientSelector ingredients={ ['Garlic', 'Oliveoil', 'Turmeric','Pasta', 'Rice', 'Butter'] } onUpdate={ this._updatePantry } />
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

export default AddIngredients;










