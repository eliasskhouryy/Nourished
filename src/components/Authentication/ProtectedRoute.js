import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
const ProtectedRoute = ({ children }) => {
	// forumla to make sure that a user cannot access a certain page when called upon if not logged in
	const { user } = useUserAuth();

	console.log('Check user in Private: ', user);
	if (!user) {
		return <Navigate to="/login" />;
	}
	return children;
};

export default ProtectedRoute;
