import React, { Component, useEffect, useState } from 'react';
import '../recipe.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ThisRecipe from './ThisRecipe';
import Home from '../Authentication/Home';
import '../recipe.css';
import AddIngredients from './AddIngredients';

const SearchResultShow = () => {
	let { ingredients } = useParams();
	const [recipes, setRecipes] = useState([]);
	const [link, setLink] = useState([]);
	const options = {
		method: 'GET',
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
		params: {
			ingredients: ingredients,
			number: '10',
			ignorePantry: 'false',
			ranking: '1',
		},
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	};

	useEffect(() => {
		axios
			.request(options)
			.then((response) => {
				setRecipes(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [ingredients]);

	return (
		<div>
			<Home />
			<AddIngredients />
			<div className="contain">
				{recipes.map((recipe) => {
					return (
						<div className="box">
							<Link to={`/result/recipe/${recipe.id}`}>
								<div key={recipe.title}>
									<h2>{recipe.title}</h2>
									<img src={recipe.image} />
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default SearchResultShow;
