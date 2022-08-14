import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

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
		<Card>
			<Card.Body>
				<Form>
					<h2 className="text-center mb-4"> Login </h2>
					<Form.Group id="email">
						<Form.Control
							placeholder="Email..."
							onChange={(event) => {
								setLoginEmail(event.target.value);
							}}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Control
							placeholder="Password..."
							type="password"
							onChange={(event) => {
								setLoginPassword(event.target.value);
							}}
						/>
					</Form.Group>

					<Button className="w-100" onClick={login}>
						{' '}
						Login
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
