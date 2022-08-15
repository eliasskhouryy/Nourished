import React from 'react';
import '../recipe.css';

export default function Recipe1({ title, calories, image, link }) {
	return (
		<a href={link} target="_blank">
			<div className="box" onClick={(link) => link} target="_blank">
				<h2>{title}</h2>
				<img src={image} alt="" />
				<p>Calories: {calories}</p>
			</div>
		</a>
	);
}
