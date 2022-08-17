import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useUserAuth } from '../../context/UserAuthContext';
import '../nav.css';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const Home = () => {
	const { logOut, user } = useUserAuth();
	const navigate = useNavigate();
	const userDetailCollectionRef = collection(db, 'userDetails');
	const [userDetails, setUserDetails] = useState([]);
	useEffect(() => {
		const getUserDetails = async () => {
			const data = await getDocs(userDetailCollectionRef);
			setUserDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUserDetails();
	}, []);

	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	const compareIds = (authenticationTable, userInfoTable, currentUserID) => {
		let output;
		for (let i = 0; i < userInfoTable.length; i++) {
			if (currentUserID == userInfoTable[i].userId) {
				if (userInfoTable[i].name !== undefined) {
					output = userInfoTable[i].name;
				}
			}
		}
		if (output) {
			return output;
		} else {
			return authenticationTable.email;
		}
	};

	// compareIds(null, userDetails, user);

	return (
		<nav>
			<div className="navLeft">
				<Link to="/">
					<img src="./logo_transparent.png" alt="" />
				</Link>
			</div>

			{user ? (
				<div className="navRight">
					<Link to="/profile">{compareIds(user, userDetails, user.uid)}</Link>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div className="user">
					<Link to="/login">Login</Link>
					<Link to="/Signup">Sign up</Link>
				</div>
			)}
		</nav>
	);
};

export default Home;
