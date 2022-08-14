import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Profile() {
	const [user, setUser] = useState({});

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});
	return (
		<div>
			<h1>Hello {user.email}</h1>
		</div>
	);
}
