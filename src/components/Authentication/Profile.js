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
	const [newFirstName, setNewFirstName] = useState('');
	const [newLastName, setNewLastName] = useState('');
	const [userDetails, setUserDetails] = useState([]);
	const userDetailCollectionRef = collection(db, 'userDetails');
	const navigate = useNavigate();

	const updateFirstName = async (id, firstName) => {
		const userDoc = doc(db, 'userDetails');
		const newFields = { firstName: NewUpdates };
		await updateDoc(userDoc, newFields);
	};

	const addUserDetail = async () => {
		await addDoc(userDetailCollectionRef, { userId: user.uid, name: newLastName });

		window.location.reload();
	};

	useEffect(() => {
		const getUserDetails = async () => {
			const data = await getDocs(userDetailCollectionRef);
			setUserDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUserDetails();
	}, []);

	// userDetails.map((u) => {
	// 	u.userId == user.uid ? u.name : '';
	// 	console.log(user.uid, u.userId, u.name);
	// });

	return (
		<div>
			<Home />
			<div className="profile">
				Hello {user.email}
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
				<button onClick={addUserDetail}>Add Name</button>
			</div>
		</div>
	);
}
