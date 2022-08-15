import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Recipes2 from './Recipes2/Recipes2';
import Search from './Recipes2/Search';

import Profile from './Authentication/Profile';
import Home from './Authentication/Home';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import ProtectedRoute from './Authentication/ProtectedRoute';
import { UserAuthContextProvider } from '../context/UserAuthContext';

function App() {
	return (
		<div>
			<div>
				<Router>
					<UserAuthContextProvider>
						<Routes>
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>
							<Route exact path="/home" element={<Home />} />
							<Route exact path="/" element={<Recipes2 />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/recipes2" element={<Recipes2 />} />
							<Route path="/search" element={<Search />} />
							<Route path="/login" element={<Login />} />
						</Routes>
					</UserAuthContextProvider>
				</Router>
			</div>
		</div>
	);
}

export default App;
