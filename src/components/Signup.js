import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Signup() {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
			console.log(user);
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div>
			<div>
				<h3> Register User </h3>
				<input
					placeholder="Email..."
					onChange={(e) => {
						setRegisterEmail(e.target.value);
					}}
				/>
				<input
					placeholder="Password..."
					type="password"
					onChange={(event) => {
						setRegisterPassword(event.target.value);
					}}
				/>

				<button onClick={register}> Create User</button>
			</div>
		</div>
	);
}
