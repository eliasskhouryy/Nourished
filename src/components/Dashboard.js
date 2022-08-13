import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin';
import { Container } from 'react-bootstrap';
import { auth } from '../firebase';

export default function Dashboard() {
	const [user, setUser] = useState({});

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	const logout = async () => {
		await signOut(auth);
		Navigate('/signin');
	};

	return (
		<div>
			<h4> User Logged In: </h4>
			{user?.email}

			<button onClick={logout}> Sign Out </button>
		</div>
	);
}
