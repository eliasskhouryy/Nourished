import React, { Component, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchResultShow from './SearchResultShow';
import '../recipe.css';
import { db } from '../../firebase';
import '../profile.css';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import IngredientSelector from './IngredientSelector';
import { useUserAuth } from '../../context/UserAuthContext';

class AddIngredients extends Component {
	constructor() {
		super();

		this.state = {
			UsersIngredients: [],
			pantryitems: [],
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

	_AllIngredientUpdate = (newUsersIngredients, value) => {
		this.setState({ AllIngredients: [...value, ...newUsersIngredients] });
	};

	// useEffect((items) => {
	// 	this.state.AllIngredients(items)
	// 	},[]);
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
						'Potatoes',
						'Onions',
						'Lentils',
					]}
					onUpdate={this._updatePantry}
				/>
				<br />
				<Link to="/profile">Want to add your own ingredients?</Link>
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
	return (
		<div className="ingredientsList">
			<h3>Ingredients</h3>
			{user ? userIngredients.map((i) => (i.userIdIngredient == user.uid ? i.ingredients + ', ' : '')) : ''}
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
	const [value, setValue] = useState(user ? userIngredients.map((i) => (i.userIdIngredient == user.uid ? i.ingredients + ', ' : '')) : '');
	const _handleSubmit = (event) => {
		event.preventDefault();
		props.onSubmit(value + (user ? userIngredients.map((i) => (i.userIdIngredient == user.uid ? i.ingredients + ', ' : '')) : ''));
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
