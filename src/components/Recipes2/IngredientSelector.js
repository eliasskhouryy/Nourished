import { React, useState, useEffect } from 'react';
import '../recipe.css';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useUserAuth } from '../../context/UserAuthContext';

const IngredientSelector = (props) => {
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	// UseEffect used to ensure callback function runs when the dependencies are changed
	useEffect(() => {
		const jsonItems = localStorage.getItem('selectedIngredients') || '[]';
		const items = JSON.parse(jsonItems);
		setSelectedIngredients(items);
	}, []);

	// functional component that contains checkbox logic
	const toggle = (ingredient) => {
		console.log(ingredient);
		let updatedIngredients;
		if (selectedIngredients.includes(ingredient)) {
			updatedIngredients = selectedIngredients.filter((i) => i != ingredient);
		} else {
			updatedIngredients = [...selectedIngredients, ingredient];
		}
		setSelectedIngredients(updatedIngredients);
		localStorage.setItem('selectedIngredients', JSON.stringify(updatedIngredients));

		props.onUpdate(updatedIngredients);
	};
	console.log(selectedIngredients);

	// checkbox return
	return (
		<div className="checkBoxes">
			{props.ingredients.map((i) => (
				<label>
					<input type="checkbox" onChange={() => toggle(i)} checked={selectedIngredients.includes(i)} />
					{i}
				</label>
			))}
		</div>
	);
};

export default IngredientSelector;
