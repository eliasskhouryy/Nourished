import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Home from './Home';
import { db } from '../../firebase';
import '../profile.css';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
// This is the profile page that takes care of the both the users name and ingredients list
export default function Profile() {
	const { logOut, user } = useUserAuth();
	const [NewUpdates, setNewUpdates] = useState('');

	const [ingredient, setIngredient] = useState('');
	const [userIngredients, setUserIngredient] = useState([]);

	const [newLastName, setNewLastName] = useState('');
	const [userDetails, setUserDetails] = useState([]);

	const userDetailCollectionRef = collection(db, 'userDetails'); // the reference that speaks to the firebase collection to retrieve the users name
	const userIngredientsRef = collection(db, 'userIngredients'); // the reference that speaks to the firebase collection to retrieve the users ingredients

	const navigate = useNavigate();

	const addUserDetail = async () => {
		// this function sends the users details to the firebase collection
		await addDoc(userDetailCollectionRef, { userId: user.uid, name: newLastName });

		window.location.reload();
	};

	const addIngredient = async () => {
		// similar to the addUserDetail where it sends the ingredients to the firebase collection with the users id included
		await addDoc(userIngredientsRef, { userIdIngredient: user.uid, ingredients: ingredient });

		window.location.reload();
	};

	useEffect(() => {
		// this use state functions to get both the users details and ingredients
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
		//name check functioned mention before to check if the users name is matched with the current user logged in
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
				<div className="formy">
					<h2>Add your name to your profile</h2>
					<input type="text" placeholder="name" onChange={(event) => setNewLastName(event.target.value)} />
					<button onClick={addUserDetail}>Add Name</button>{' '}
				</div>
			);
		}
	};

	return (
		<div className="bodily">
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
			</div>

			<div className="formy">
				<h2>Add Default Ingredients from your Pantry</h2>
				<input type="text" placeholder="Lettuce" onChange={(event) => setIngredient(event.target.value)} required />
				<button onClick={addIngredient}>+</button>
				<br /> <br />
				<div className="listings">{userIngredients.map((i) => (i.userIdIngredient == user.uid ? <li> {i.ingredients}</li> : ''))}</div>
			</div>
		</div>
	);
}
