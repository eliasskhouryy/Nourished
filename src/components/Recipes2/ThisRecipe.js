import React, { useState, useEffect } from 'react';
import '../recipe.css';
import axios from 'axios';
import SearchResultShow from './SearchResultShow';
import { useParams } from 'react-router-dom';

export default function ThisRecipe() {
    let { id } = useParams();
    const [recipe, setRecipe] = useState([]);
console.log(id)
	const options = {
		method: 'GET',
		url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
		headers: {
			'X-RapidAPI-Key': '65f1475d55msh8d83be2f52d92f3p15f278jsnc4e28a3274ce',
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	};
	useEffect(() => {
		axios
			.request(options)
			.then(function (response) {
				setRecipe(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

		return (
				<div>
					<h1>{recipe.title}</h1>
					<img src={recipe.image} />
                    <h2 dangerouslySetInnerHTML={{__html: recipe.instructions}} />
                    
				</div>

		);


}