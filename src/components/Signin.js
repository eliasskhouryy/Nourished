import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Signin() {
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
			Navigate('/dashboard');

			console.log(user);
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div>
			<div>
				<h3> Login </h3>
				<input
					placeholder="Email..."
					onChange={(event) => {
						setLoginEmail(event.target.value);
					}}
				/>
				<input
					placeholder="Password..."
					type="password"
					onChange={(event) => {
						setLoginPassword(event.target.value);
					}}
				/>

				<button onClick={login}> Login</button>
			</div>
		</div>
	);
}
