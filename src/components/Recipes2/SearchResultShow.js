import React, { Component, useEffect, useState } from 'react';
import '../recipe.css';
import axios from 'axios';
import AddIngredients from './AddIngredients';
import { useParams } from 'react-router-dom';

const SearchResultShow = () => {
	let { ingredients } = useParams();
	const [recipes, setRecipes] = useState([]);
	const [link, setLink] = useState([]);
	const options = {
		method: 'GET',
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
		params: {
			ingredients: ingredients,
			number: '2',
			ignorePantry: 'true',
			ranking: '1',
		},
		headers: {
			'X-RapidAPI-Key': '65f1475d55msh8d83be2f52d92f3p15f278jsnc4e28a3274ce',
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

	return recipes.map((recipe) => {
		return (
			<a target="_blank">
				<div key={recipe.title} target="_blank">
					<h1>{recipe.title}</h1>
					<img src={recipe.image} />
				</div>
			</a>
		);
	});
};
export default SearchResultShow;
