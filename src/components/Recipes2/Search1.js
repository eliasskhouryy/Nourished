import React from 'react';
import '../recipe.css';

export default function Recipe1({ title, calories, image, ingredients }) {
	return (
		<div className="box">
			<h2>{title}</h2>
			<img src={image} alt="" />

			{/* <ul>
				{ingredients.map((ingredient) => (
					<li>{ingredient.text}</li>
				))}
			</ul> */}
			<p>Calories: {calories}</p>
		</div>
	);
}
