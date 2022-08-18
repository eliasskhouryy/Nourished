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

	const createNameCheck = (authenticationTable, userInfoTable, currentUserID) => {
		let output;
		for (let i = 0; i < userInfoTable.length; i++) {
			if (currentUserID == userInfoTable[i].userId) {
				if (userInfoTable[i].name !== undefined) {
					output = userInfoTable[i].name;
				}
			}
		}
		if (output) {
			return <h1>{output}</h1>;
		} else {
			return (
				<div>
					<h2>Add your name to your profile</h2>
					<input type="text" placeholder="name" onChange={(event) => setNewLastName(event.target.value)} />
					<button onClick={addUserDetail}>Add Name</button>{' '}
				</div>
			);
		}
	};

	return (
		<div>
			<Home />
			<div className="profile">
				{/* Hello {user.email} */}
				{createNameCheck(user, userDetails, user.uid)}
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
			<div>{createNameCheck}</div>

			<div>
				<h2>Add Default Ingredients from your Pantry</h2>

				<input type="text" placeholder="Lettuce" onChange={(event) => setIngredient(event.target.value)} />
				<button onClick={addIngredient}>Add Ingredient</button>

				{userIngredients.map((i) => (i.userIdIngredient == user.uid ? <li> {i.ingredients}</li> : ''))}
			</div>
		</div>
	);
}
