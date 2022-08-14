import React from 'react';
import Recipes from './test function to component';

export default function RecipeGallery({ title,  image, link, title1, calories1, image1, link1, title2, calories2, image2, link2 }) {
	return (
		<div>
            
            <div className="fl w-10 bg-light-green dib br3 pa3 ma2 grow dim bw2 shadow-5" onClick={(link) => link} target="_blank">
                <a href= {link} target="_blank" >
                <h2>{title}</h2>
                <img src={image} />
                {/* <ul>
                    {ingredients.map((ingredient) => (
                        <li>{ingredient.text}</li>
                    ))}
                </ul> */}
                {/* <p> Calories: {calories}</p> */}
                </a>
            </div>
            
             {/* <div className="fl w-10 bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5" onClick={(link) => link} target="_blank">
                <h1>{title1}</h1>
               
                <a href= {link1} target="_blank" >
                <img src={image1} alt="" onClick={(link1) => link1}/>
                </a>
            </div>
             <div className="fl w-10 bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5" onClick={(link) => link} target="_blank">
                <h1>{title2}</h1>
                
                <a href= {link2} target="_blank" >
                <img src={image2} alt="" onClick={(link2) => link2}/>
                </a>
            </div> */}
		</div>
	);
}
// import React from 'react';

// const RecipeGallery = (props) => {
//     return(
//         <div>
//         { props.images.map((url,index) => <img src={url} key={index}/> )}
//     </div>
//     );
// };

// export default RecipeGallery;