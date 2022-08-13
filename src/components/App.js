import Recipes from './Recipes';
import axios from 'axios';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin';
import { Container } from 'react-bootstrap';
import Dashboard from './Dashboard';
import { auth } from '../firebase';
import Signup from './Signup';

function App() {
	const [user, setUser] = useState({});

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	return (
		<div>
			<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
				<div className="w-100" style={{ maxWidth: '400px' }}>
					<Router>
						{/* <AuthProvider> */}
						<Routes>
							<Route path="/signin" element={<Signin />} />
							<Route path="/signup" element={<Signup />} />
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
		</div>
	);
}

export default App;
