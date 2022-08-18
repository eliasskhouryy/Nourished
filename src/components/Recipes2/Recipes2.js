import React, { useEffect, useState } from 'react';
import RecipeDefaultShow from './RecipeDefaultShow';
import '../recipe.css';
import { Link } from 'react-router-dom';
import AddIngredients from './AddIngredients';
import Home from '../Authentication/Home';
import axios from 'axios';

export default function Recipes2() {
	const [recipes, setRecipes] = useState([]);
	const [recipes1, setRecipes1] = useState([]);

	const options = {
		method: 'GET',
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
		params: {
			ingredients: 'asian',
			number: '1',
			ignorePantry: 'true',
			ranking: '1',
		},
		headers: {
			'X-RapidAPI-Key': '65f1475d55msh8d83be2f52d92f3p15f278jsnc4e28a3274ce',
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	};
	const options1 = {
		method: 'GET',
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
		params: {
			ingredients: 'pasta',
			number: '1',
			ignorePantry: 'true',
			ranking: '1',
		},
		headers: {
			'X-RapidAPI-Key': '65f1475d55msh8d83be2f52d92f3p15f278jsnc4e28a3274ce',
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	};

	// useEffect(() => {
	// 	// 	 axios.request(options).then(function (response) {
	// 	// 	  setRecipes1(response.data);
	// 	//   }).catch(function (error) {
	// 	// 	  console.error(error);
	// 	//   });
	// 	axios
	// 		.request(options1)
	// 		.then(function (response) {
	// 			setRecipes(response.data);
	// 			console.log(response.data);
	// 		})
	// 		.catch(function (error) {
	// 			console.error(error);
	// 		});
	// }, []);

	return (
		<div>
			<Home />
			<AddIngredients />
			<h1>{'Pasta'}</h1>
			<div className="contain">
				{recipes.map((recipe) => (
					<RecipeDefaultShow
						key={recipe.title}
						title={recipe.title}
						image={recipe.image}
						id={recipe.id}
						link={`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.id}/information`}
					/>
				))}
			</div>
			{/* <h1>{'Asian'}</h1>
			<div className="contain">
				{recipes1.map((recipe) => (
					<RecipeDefaultShow key={recipe.title} title={recipe.title}  image={recipe.image} />
				))}
			</div> */}
		</div>
	);
}
