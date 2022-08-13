import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';

export default function Login() {
	const [error, setError] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setconfirmPassword] = useState('');
	const navigate = useNavigate();

	const { dispatch } = useContext(AuthContext);

	function handleSignup(e) {
		if (password.current.value !== confirmPassword.current.value) {
			alert('Passwords Do not match');
			return setError('Passwords do not match');
		}
		e.preventDefault();

		createUserWithEmailAndPassword(auth, email, password, confirmPassword)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch({ type: 'LOGIN', payload: user });
				navigate('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	}
	return (
		<Card>
			<Card.Body>
				<h2 className="text-center mb-4">Signup</h2>
				<Form onSubmit={handleSignup}>
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" name="" id="" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
					</Form.Group>
					<Form.Group id="email">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
					</Form.Group>
					<Form.Group id="email">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control type="password" placeholder="password" onChange={(e) => setconfirmPassword(e.target.value)} />
					</Form.Group>
					<Button type="submit" className="w-100">
						Login
					</Button>
					{error && <span>Wrong email or password</span>}
				</Form>
			</Card.Body>
		</Card>
	);
}
