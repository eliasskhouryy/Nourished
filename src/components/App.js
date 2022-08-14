import Recipes from './Recipes';
import axios from 'axios';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin';
import Dashboard from './Dashboard';
import { auth } from '../firebase';
import Signup from './Signup';
import Recipes2 from './Recipes2/Recipes2';
import Profile from './Profile';

function App() {
	const [user, setUser] = useState({});

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	const ProtectedRoute = ({ user, children }) => {
		if (!user) {
			return <Navigate to="/signin" replace />;
		}
		return children;
	};
	const SignedOut = ({ user, children }) => {
		if (user) {
			return <Navigate to="/dashboard" replace />;
		}
		return children;
	};

	return (
		<div>
			<div>
				<Router>
					<Routes>
						<Route
							path="/signin"
							element={
								// <SignedOut user={user}>
								<Signin />
								// </SignedOut>
							}
						/>
						<Route
							path="/signup"
							element={
								<SignedOut user={user}>
									<Signup />
								</SignedOut>
							}
						/>
						<Route exact path="/" element={<App />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/recipes" element={<Recipes />} />
						<Route path="/recipes2" element={<Recipes2 />} />

						<Route
							path="/profile"
							element={
								<ProtectedRoute user={user}>
									<Profile />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</Router>
			</div>
		</div>
	);
}

export default App;
