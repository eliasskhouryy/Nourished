import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState({});
	const apiKeyRef = collection(db, 'apiKey');
	const [apiKey, setApiKey] = useState('');

	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}

	function logOut() {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			console.log('Auth', currentuser);
			setUser(currentuser);
		});

		const getApiKey = async () => {
			const data = await getDocs(apiKeyRef);
			setApiKey(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getApiKey();
		// apiKey.map((k) => k.key) CHECK TOMORROW WITH JOEL
		return () => {
			unsubscribe();
		};
	}, []);

	return <userAuthContext.Provider value={{ user, logIn, signUp, logOut, googleSignIn }}>{children}</userAuthContext.Provider>;
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
