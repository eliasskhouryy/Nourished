import React from 'react';
import '../recipe.css';
import HorizontalScroll from 'react-scroll-horizontal';
export default function Recipe1({ title, calories, image, ingredients }) {
	const settings = {};
	return (
		<div>
			<div>
				<h1>{title}</h1>
				<img src={image} alt="" />

				<ul>
					{ingredients.map((ingredient) => (
						<li>{ingredient.text}</li>
					))}
				</ul>
				<p>Calories: {calories}</p>
			</div>
		</div>
	);
}
