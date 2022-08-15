import React, { Component, useState } from 'react';
import '../recipe.css';

class AddIngredients extends Component {
	constructor() {
		super();
		this.state = {
			ingredients: [],
			UsersIngredients: [],
			Recipes: [],
			filtertRecipies: [],
			images: [],
		};
		this._updateIngredients = this._updateIngredients.bind(this);
	}

	_updateIngredients = (value) => {
		this.setState({ UsersIngredients: [...this.state.UsersIngredients, value] });
	};

	render() {
		return (
			<div className="display_Ingredients">
				<SearchFormIngredients
					_updateIngredients={this._updateIngredients}
					onSubmit={this._updateIngredients}
					fetchIngredients={this._updateIngredients}
					RecipeGallery={this._updateIngredients}
				/>
				<DisplayIngredients UsersIngredients={this.state.UsersIngredients} />
			</div>
		);
	}
}

const SearchFormIngredients = (props) => {
	const [value, setValue] = useState('');

	const _handleSubmit = (event) => {
		event.preventDefault();
		props.onSubmit(value);
		setValue('');
	};

	return (
		<div className="mainSearch">
			<form onSubmit={_handleSubmit}>
				<h1>Add Ingredients</h1>
				<input type="search" required placeholder="Add your ingredients" value={value} onChange={(e) => setValue(e.target.value)} className="searchBar" />
				<input type="submit" value="+" className="button" />
			</form>
			<input type="submit" value="Search" className="filterButton" />
		</div>
	);
};

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

export default AddIngredients;
