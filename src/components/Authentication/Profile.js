import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Home from './Home';
import { db } from '../../firebase';
import '../profile.css';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function Profile() {
	const { logOut, user } = useUserAuth();

	const [newFirstName, setNewFirstName] = useState('');
	const [newLastName, setNewLastName] = useState('');
	const [userDetails, setUserDetails] = useState([]);
	const userDetailCollectionRef = collection(db, 'userDetails');

	const addUserDetail = async () => {
		await addDoc(userDetailCollectionRef, { firstName: newFirstName, lastName: newLastName });
	};

	useEffect(() => {
		const getUserDetails = async () => {
			const data = await getDocs(userDetailCollectionRef);
			setUserDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUserDetails();
	}, []);

	return (
		<div>
			<Home />
			<div className="profile">
				Hello {user.email}
				<p>{userDetails.map((user) => user.firstName)} </p>
				<p>{userDetails.map((user) => user.lastName)}</p>
			</div>
			<div>
				<input type="text" placeholder="first name" onChange={(event) => setNewFirstName(event.target.value)} />
				<input type="text" placeholder="last name" onChange={(event) => setNewLastName(event.target.value)} />
				<button onClick={addUserDetail}>Add Name</button>
			</div>
		</div>
	);
}
