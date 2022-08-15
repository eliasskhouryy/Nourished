import React, { useEffect, useState } from 'react';
import RecipeDefaultShow from './RecipeDefaultShow';
import '../recipe.css';
import { Link } from 'react-router-dom';

export default function Recipes2() {
	const YOUR_APP_ID = `2cb4a854`;
	const YOUR_APP_KEY = `68c5e9abaabd7cda76ac6d01c1c7a90f`;

	const [recipes, setRecipes] = useState([]);
	const [recipes1, setRecipes1] = useState([]);
	const [search, setSearch] = useState('');
	const [query, setQuery] = useState('');

	useEffect(() => {
		getRecipes();
		getRecipes1();
	}, [query]);

	const getRecipes = async () => {
		const response = await fetch(`https://api.edamam.com/search?q=${'chicken'}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
		const data = await response.json();
		setRecipes(data.hits);
		console.log(data.hits);
	};
	const getRecipes1 = async () => {
		const response = await fetch(`https://api.edamam.com/search?q=${'egg'}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
		const data = await response.json();
		setRecipes1(data.hits);
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
			<h1>Nourished</h1>
			Want to find your own? <Link to="/search">Press here to search</Link>
			<h1>{'Chicken'}</h1>
			<div className="contain">
				{recipes.map((recipe) => (
					<RecipeDefaultShow key={recipe.recipe.label} title={recipe.recipe.label} calories={parseInt(recipe.recipe.calories)} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
				))}
			</div>
			<h1>{'Egg'}</h1>
			<div className="contain">
				{recipes1.map((recipe) => (
					<RecipeDefaultShow key={recipe.recipe.label} title={recipe.recipe.label} calories={parseInt(recipe.recipe.calories)} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
				))}
			</div>
		</div>
	);
}
