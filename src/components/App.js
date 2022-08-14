import Recipes from './Recipes';
import axios from 'axios';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { auth } from '../firebase';
import Recipes2 from './Recipes2/Recipes2';
import Search from './Recipes2/Search';

import Home from './Authentication/Home';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import ProtectedRoute from './Authentication/ProtectedRoute';
import { UserAuthContextProvider } from '../context/UserAuthContext';

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

	return (
		<div>
			<div>
				<Router>
					<UserAuthContextProvider>
						<Routes>
							<Route
								path="/home"
								element={
									<ProtectedRoute>
										<Home />
									</ProtectedRoute>
								}
							/>
							<Route exact path="/" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/recipes2" element={<Recipes2 />} />
							<Route path="/search" element={<Search />} />
						</Routes>
					</UserAuthContextProvider>
				</Router>
			</div>
		</div>
	);
}

export default App;
