import React, { useState } from 'react';
import '../recipe.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Recipe1({ title, image, id }) {
	return (
		<Link to={`/result/recipe/${id}`}>
			<div className="box" key={title}>
				<h2>{title}</h2>
				<img src={image} />
			</div>
		</Link>
	);
}
