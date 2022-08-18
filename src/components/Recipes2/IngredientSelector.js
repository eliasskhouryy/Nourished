import { React, useState, useEffect } from 'react';
import '../recipe.css';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useUserAuth } from '../../context/UserAuthContext';
import { Link } from 'react-router-dom';

const IngredientSelector = (props) => {
	const [value, setValue] = useState('');
	const [userIngredients, setUserIngredient] = useState([]);
	const { logOut, user } = useUserAuth();
	const userIngredientsRef = collection(db, 'userIngredients');
	const [selectedIngredients, setSelectedIngredients] = useState([]);

	useEffect(() => {
		const getUserIngredients = async () => {
			const data = await getDocs(userIngredientsRef);
			setUserIngredient(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUserIngredients();
	}, []);
	let ing = user ? userIngredients.map((i) => (i.userIdIngredient == user.uid ? i.ingredients + ', ' : '')) : '';

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
		<div>
			<div className="checkBoxes">
				{props.ingredients.map((i) => (
					<label>
						<input type="checkbox" onChange={() => toggle(i)} checked={selectedIngredients.includes(i)} />
						{i}
					</label>
				))}
			</div>
			<br />
			{user ? 'Ingredients in your Pantry:' : ''}
			<div>{ing}</div>
			<Link to="/profile">Want to display what's in your Pantry?</Link>
		</div>
	);
};

export default IngredientSelector;
