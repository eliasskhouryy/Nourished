import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchResultShow from './SearchResultShow';
import '../recipe.css';
import { useUserAuth } from '../../context/UserAuthContext';
import Home from '../Authentication/Home';
import axios from 'axios';

export default function Recipes2() {
	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('');

	const options = {
		method: 'GET',
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
		params: {
		ingredients: recipes ,
		number: '10',
		ignorePantry: 'true',
		ranking: '1'
		},
		headers: {
		'X-RapidAPI-Key': '0e9c30ad1cmshc1c8722b9c03a83p18e584jsnba09b9fe4bcd',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
		}
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
		 axios.request(options).then(function (response) {
		  setRecipes(response.data);
	  }).catch(function (error) {
		  console.error(error);
	  });
	}, [query]);

	return (
		<div>
			<Home />

			<h1>Nourished</h1>
			<form onSubmit={getSearch} className="search-form">
				<input className="search-bar" type="text" value={search} onChange={updateSearch} />
				<button className="search-button" type="submit">
					Search
				</button>
			</form>
			<h1>{query}</h1>
			<div className="contain">
				{recipes.map((recipe) => (
					<SearchResultShow
						key={recipe.title}
						title={recipe.title}
						image={recipe.image}
					/>
				))}
			</div>
		</div>
	);
}
