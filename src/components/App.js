import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Signup from './Signup';
import { AuthContext } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import { getAuth } from 'firebase/auth';

function App() {
	const { currentUser } = getAuth();

	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to="/login" />;
	};

	// function LoggedIn() {
	// 	return currentUser ? <Navigate exact to="/" /> : <Navigate to="/login" />;
	// }

	console.log(currentUser);

	return (
		<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
			<div className="w-100" style={{ maxWidth: '400px' }}>
				<Router>
					{/* <AuthProvider> */}
					<Routes>
						<Route
							path="/login"
							element={
								// <LoggedIn>
								<Login />
								// </LoggedIn>
							}
						/>
						<Route
							path="/signup"
							element={
								// <LoggedIn>
								<Signup />
								// </LoggedIn>
							}
						/>
						<Route
							index
							element={
								<RequireAuth>
									<Dashboard />
								</RequireAuth>
							}
						/>
					</Routes>
					{/* </AuthProvider> */}
				</Router>
				{/* <Recipes /> */}
			</div>
		</Container>
	);
}
export default App;
