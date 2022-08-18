import React, { Component, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import '../recipe.css';
import { db } from '../../firebase';
import '../profile.css';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import IngredientSelector from './IngredientSelector';
import { useUserAuth } from '../../context/UserAuthContext';
import { uid } from 'browser-router/html5-history/adapter';

const jsonIngredients = localStorage.getItem('selectedIngredients'); //getting values of locally stored ingredients
const jsonUpdatedIngredients = JSON.parse(jsonIngredients); // converting from JSON format to a regular string in an array

class AddIngredients extends Component {
	constructor() {
		super();
		this.state = {
			UsersIngredients: [],
			pantryitems: [jsonUpdatedIngredients], // State on page load
			AllIngredients: [],
		};
		this._updateIngredients = this._updateIngredients.bind(this);
	}

	_updateIngredients = (value) => {
		this.setState({ UsersIngredients: [...this.state.UsersIngredients, value] });
		this._AllIngredientUpdate([...this.state.UsersIngredients, value], this.state.pantryitems);
	};

	_updatePantry = (value) => {
		this.setState({ pantryitems: value });
		this._AllIngredientUpdate(this.state.UsersIngredients, value);
	};

	_AllIngredientUpdate = (newUsersIngredients, value, userIngrediented) => {
		this.setState({ AllIngredients: [...value, ...newUsersIngredients] });
	};

	render() {
		return (
			<div className="mainSearch">
				<SearchFormIngredients _updateIngredients={this._updateIngredients} onSubmit={this._updateIngredients} ingredients={this.state.AllIngredients} onClick={this._handleClick} />
				<DisplayIngredients UsersIngredients={this.state.UsersIngredients} />

				<IngredientSelector
					ingredients={[
						'Garlic',
						'Olive Oil',
						'Turmeric',
						'Pasta',
						'Rice',
						'Butter',
						'Salt',
						'Pepper',
						'Balsamic',
						'Ketchup',
						'Mayonnaise',
						'Red Chilli',
						'Olives',
						'Tomato',
						'Flour',
						'Honey',
						'Eggs',
						'Vinegar',
						'Potatoes',
						'Onions',
						'Lentils',
					]}
					onUpdate={this._updatePantry}
				/>
				<br />
			</div>
		);
	}
}

const DisplayIngredients = (props) => {
	const [userIngredients, setUserIngredient] = useState([]);
	const { logOut, user } = useUserAuth();
	const userIngredientsRef = collection(db, 'userIngredients');
	useEffect(() => {
		const getUserIngredients = async () => {
			const data = await getDocs(userIngredientsRef);
			setUserIngredient(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUserIngredients();
	}, []);
	let ing = user ? userIngredients.map((i) => (i.userIdIngredient == user.uid ? i.ingredients + ', ' : '')) : '';

	return (
		<div className="ingredientsList">
			<h3>Ingredients</h3>

			{props.UsersIngredients.map((s) => (
				<p key={s.toString()}>
					{s.toString()}
					{props.UsersIngredients.length == 1 ? '' : ','}
					&nbsp;
				</p>
			))}
			<br></br>
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
		<div>
			<h1>Add ingredients</h1>

			<form onSubmit={_handleSubmit}>
				<input type="search" required placeholder="Add your ingredients" value={value} onChange={(e) => setValue(e.target.value)} className="searchBar" />
				<input type="submit" value="+" className="button" />
			</form>
			<Link to={`/results/${props.ingredients.join(',')}`}>
				<input type="button" value="Search Recipes" className="filterButton" />
			</Link>
		</div>
	);
};

export default AddIngredients;
