import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Home from './Home';
import { db } from '../../firebase';
import '../profile.css';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

export default function Profile() {
	const { logOut, user } = useUserAuth();
	const [NewUpdates, setNewUpdates] = useState('');

	const [ingredient, setIngredient] = useState('');
	const [userIngredients, setUserIngredient] = useState([]);

	const [newLastName, setNewLastName] = useState('');
	const [userDetails, setUserDetails] = useState([]);

	const userDetailCollectionRef = collection(db, 'userDetails');
	const userIngredientsRef = collection(db, 'userIngredients');

	const navigate = useNavigate();

	const addUserDetail = async () => {
		await addDoc(userDetailCollectionRef, { userId: user.uid, name: newLastName });

		window.location.reload();
	};

	const addIngredient = async () => {
		await addDoc(userIngredientsRef, { userIdIngredient: user.uid, ingredients: ingredient });

		window.location.reload();
	};

	useEffect(() => {
		const getUserDetails = async () => {
			const data = await getDocs(userDetailCollectionRef);
			setUserDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUserDetails();

		const getUserIngredients = async () => {
			const data = await getDocs(userIngredientsRef);
			setUserIngredient(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUserIngredients();
	}, []);

	// userDetails.map((u) => {
	// 	u.userId == user.uid ? u.name : '';
	// 	console.log(user.uid, u.userId, u.name);
	// });

	return (
		<div>
			<Home />
			<div className="profile">
				{/* Hello {user.email} */}
				{userDetails.map((u) => (u.userId == user.uid ? u.name : ''))}
				<p>
					{userDetails.map((user) => {
						return (
							<div>
								{/* {user.firstName} */}
								{/* <input type="text" onChange={(event) => setNewUpdates(event.target.value)} />
								<button onClick={updateFirstName}>UpdateName</button> */}
							</div>
						);
					})}{' '}
				</p>
				{/* <p>{userDetails.map((user) => user.lastName)}</p> */}
			</div>
			<div>
				<input type="text" placeholder="name" onChange={(event) => setNewLastName(event.target.value)} />
				<button onClick={addUserDetail}>Add Name</button>{' '}
			</div>

			<div>
				<h1>Add Default Ingredients from your Pantry</h1>

				<input type="text" placeholder="Lettuce" onChange={(event) => setIngredient(event.target.value)} />
				<button onClick={addIngredient}>Add Ingredient</button>

				{userIngredients.map((i) => (i.userIdIngredient == user.uid ? <li> {i.ingredients}</li> : ''))}
			</div>
		</div>
	);
}
