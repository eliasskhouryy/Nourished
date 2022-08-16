import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useUserAuth } from '../../context/UserAuthContext';
import '../nav.css';
import { Link } from 'react-router-dom';

const Home = () => {
	const { logOut, user } = useUserAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<nav>
			<div className="navLeft">
				<Link to="/">
					<img src="./logo_transparent.png" alt="" />
				</Link>
			</div>

			{user ? (
				<div className="navRight">
					<Link to="/profile">{user.email} </Link>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div className="user">
					<Link to="/login">Login</Link>
				</div>
			)}
		</nav>
	);
};

export default Home;
