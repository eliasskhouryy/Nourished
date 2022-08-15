import React from 'react';
import '../recipe.css';

export default function SearchResultShow({ title, calories, image, link }) {
	return (
		<div className="box">
			<h2>{title}</h2>
			<img src={image} alt="" />
			<p>Calories: {calories}</p>
		</div>
	);
}
