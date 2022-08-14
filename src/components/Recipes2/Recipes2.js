import React, { useEffect, useState } from 'react';
import Recipe1 from './Recipe1';
// import '.../App.css';
import { Container } from 'react-bootstrap';

export default function Recipes2() {
	const YOUR_APP_ID = `2cb4a854`;
	const YOUR_APP_KEY = `68c5e9abaabd7cda76ac6d01c1c7a90f`;

	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('');

	useEffect(() => {
		getRecipes();
	}, [query]);

	const getRecipes = async () => {
		const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
		const data = await response.json();
		setRecipes(data.hits);
		console.log(data.hits);
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
		setSearch('');
	};

	return (
		<div>
			<h1>food app</h1>
			<form onSubmit={getSearch} className="search-form">
				<input className="search-bar" type="text" value={search} onChange={updateSearch} />
				<button className="search-button" type="submit">
					Search
				</button>
			</form>
			{recipes.map((recipe) => (
				<Recipe1 key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
			))}
		</div>
	);
}
