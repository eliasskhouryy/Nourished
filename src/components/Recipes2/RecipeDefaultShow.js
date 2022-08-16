import React, { useState } from 'react';
import '../recipe.css';
import axios from 'axios';

export default function Recipe1({ title, image, id }) {
	const [link, setLink] = useState([]);
	const options = {
		method: 'GET',
		url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
		headers: {
			'X-RapidAPI-Key': '65f1475d55msh8d83be2f52d92f3p15f278jsnc4e28a3274ce',
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	};
	const _handleClick = () => {
		axios
			.request(options)
			.then(function (response) {
				window.open(response.data.sourceUrl, '_blank');
				console.log(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<a onClick={_handleClick} target="_blank">
			<div className="box" onClick={(link) => link} target="_blank">
				<h2>{title}</h2>
				<img src={image} alt="" />
			</div>
		</a>
	);
}
