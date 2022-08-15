import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchResultShow from './SearchResultShow';
import '../recipe.css';
import { useUserAuth } from '../../context/UserAuthContext';
import Home from '../Authentication/Home';

export default function Recipes2() {
	const { logOut, user } = useUserAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};
	const YOUR_APP_ID = `2cb4a854`;
	const YOUR_APP_KEY = `68c5e9abaabd7cda76ac6d01c1c7a90f`;

	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState();
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
						key={recipe.recipe.label}
						title={recipe.recipe.label}
						calories={parseInt(recipe.recipe.calories)}
						image={recipe.recipe.image}
						ingredients={recipe.recipe.ingredients}
					/>
				))}
			</div>
		</div>
	);
}
