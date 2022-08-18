import React, { useEffect, useState } from 'react';
import '../recipe.css';
import { Link } from 'react-router-dom';
import AddIngredients from './AddIngredients';
import Home from '../Authentication/Home';
import axios from 'axios';
import { UserAuthContextProvider } from '../../context/UserAuthContext';

export default function Recipes2() {
	const [recipes, setRecipes] = useState([]);
	const [recipes1, setRecipes1] = useState([]);
	const [apiKey, setApiKey] = useState('');

	const options = {
		method: 'GET',
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
		params: {
			ingredients: 'asian',
			number: '10',
			ignorePantry: 'true',
			ranking: '1',
		},
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	};
	const options1 = {
		method: 'GET',
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
		params: {
			ingredients: 'pasta',
			number: '10',
			ignorePantry: 'true',
			ranking: '1',
		},
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	};

	useEffect(() => {
		// 	 axios.request(options).then(function (response) {
		// 	  setRecipes1(response.data);
		//   }).catch(function (error) {
		// 	  console.error(error);
		//   });
		axios
			.request(options1)
			.then(function (response) {
				setRecipes(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	return (
		<div>
			<Home />
			<AddIngredients />
			<h2>{'Pasta'}</h2>
			<div className="contain">
				{recipes.map((recipe) => (
					<div className="box">
						<Link to={`/result/recipe/${recipe.id}`}>
							<div key={recipe.title}>
								<h2>{recipe.title}</h2>
								<img src={recipe.image} />
							</div>
						</Link>
					</div>
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
