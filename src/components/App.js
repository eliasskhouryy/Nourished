import Recipes from './Recipes';
import axios from 'axios';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin';
import { Container } from 'react-bootstrap';
import Dashboard from './Dashboard';
import { auth } from '../firebase';

function App() {
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');

	const [user, setUser] = useState({});

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
			console.log(user);
		} catch (error) {
			console.log(error.message);
		}
	};

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<div>
			<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
				<div className="w-100" style={{ maxWidth: '400px' }}>
					<Router>
						{/* <AuthProvider> */}
						<Routes>
							<Route path="/signin" element={<Signin />} />
							<Route exact path="/" element={<App />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/recipes" element={<Recipes />} />
							{/* <Route path="/signup" element={<Signup />} /> */}
						</Routes>
						{/* </AuthProvider> */}
					</Router>
					{/* <Recipes /> */}
				</div>
			</Container>
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
					onChange={(event) => {
						setRegisterPassword(event.target.value);
					}}
				/>

				<button onClick={register}> Create User</button>
			</div>
		</div>
	);
}

export default App;
