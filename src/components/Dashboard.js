import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export default function Dashboard() {
	const [error, setError] = useState('');
	const { currentUser } = getAuth();
	const Navigate = useNavigate();
	const auth = getAuth();

	function handleLogout() {
		signOut(auth);
		Navigate('/login');
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<strong>Email:</strong> {currentUser ? currentUser.email : 'user'}
					<Link to="/updateprofile" className="btn btn-primary w-100 mt-3">
						Update Profile
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button onClick={handleLogout}>Log Out</Button>
			</div>
		</>
	);
}
