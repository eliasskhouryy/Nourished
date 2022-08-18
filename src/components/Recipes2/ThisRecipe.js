import React, { useState, useEffect } from 'react';
import '../recipe.css';
import axios from 'axios';
import SearchResultShow from './SearchResultShow';
import { useParams } from 'react-router-dom';
import '../result.css';
import Home from '../Authentication/Home';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

export default function ThisRecipe() {
	let { id } = useParams();
	const [recipe, setRecipe] = useState([]);
	const apiKeyRef = collection(db, 'apiKey');
	const [apiKey, setApiKey] = useState('');

	console.log(id);
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

		const getApiKey = async () => {
			const data = await getDocs(apiKeyRef);
			setApiKey(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getApiKey();
	}, []);

	return (
		<div>
			<Home />
			{console.log(apiKey)}
			<div className="result">
				<h1>{recipe.title}</h1>
				<img src={recipe.image} />

				<h2>Instructions</h2>
				<p dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

				<p>
					{recipe.winePairing ? (
						<div>
							<h2>Want to pair with a glass of Wine?</h2>
							{recipe.winePairing.pairingText}
						</div>
					) : (
						''
					)}
				</p>
			</div>
		</div>
	);
}
