import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchResultShow from './SearchResultShow';
import '../recipe.css';
import { useUserAuth } from '../../context/UserAuthContext';
import Home from '../Authentication/Home';
import axios from 'axios';
import Profile from '../Authentication/Profile';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

export default function Recipes2() {
	const [userIngredients, setUserIngredient] = useState([]);

	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState();
	const [query, setQuery] = useState([]);
	const { logOut, user } = useUserAuth();
	const userIngredientsRef = collection(db, 'userIngredients');

	const options = {
		method: 'GET',
		url: 'https://api.spoonacular.com/recipes/findByIngredients',
		params: {
			ingredients: recipes,
			number: '10',
			ignorePantry: 'true',
			ranking: '1',
		},
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
		setSearch('');
	};

	useEffect(() => {
		axios
			.request(options)
			.then(function (response) {
				setRecipes(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, [query]);
	useEffect(() => {
		const getUserIngredients = async () => {
			const data = await getDocs(userIngredientsRef);
			setUserIngredient(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUserIngredients();
	}, []);

	return (
		<div>
			<Home />

			<h1>Nourished</h1>
			<form onSubmit={getSearch} className="search-form">
				<input className="search-bar" type="text" value={userIngredients.map((i) => (i.userIdIngredient == user.uid ? i.ingredients : ''))} onChange={updateSearch} />
				<button className="search-button" type="submit">
					Search
				</button>
			</form>

			<h1>{query}</h1>
			<div className="contain">
				{recipes.map((recipe) => (
					<SearchResultShow key={recipe.title} title={recipe.title} image={recipe.image} />
				))}
			</div>
		</div>
	);
}
