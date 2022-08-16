import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../../context/UserAuthContext';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [password, setPassword] = useState('');
	const { signUp } = useUserAuth();
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await signUp(email, password);
			navigate('/');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="formContainer">
			<h2>Signup</h2>
			{error && <Alert variant="danger">{error}</Alert>}
			<form onSubmit={handleSubmit}>
				<input type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />

				<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

				<div className="d-grid gap-2">
					<button variant="primary" type="Submit">
						Sign up
					</button>
				</div>
			</form>
			<br />
			<div className="bottomText">
				Already have an account? <Link to="/login">Log In</Link>
			</div>
		</div>
	);
};

export default Signup;
