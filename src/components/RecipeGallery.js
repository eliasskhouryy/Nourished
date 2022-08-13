import React from 'react';

const RecipeGallery = (props) => {
    return(
        <div>
            {props.RecipesGallery}
        </div>
    );
};

export default RecipeGallery;

// import React, {Component , useState } from "react";
// import axios from "axios";
// import { render } from "@testing-library/react";
// import Recipes from "./Recipes";


// const RecipeGallery = (props) => {
//     const [value, setValue] = useState('');
//     const [rcp,setRcp] = useState([])
//     const [list,setList] = useState('alcohol-free')
    
//     const YOUR_APP_ID= `ed915139`
//     const YOUR_APP_KEY= `0fd96fbce44449366d6bb13f75f9d475`

//     const SERVER_URL = `https://api.edamam.com/search?q=${value}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${list}`;

//     const _handleInput = (event) =>{
//         setValue(event.target.value)
//     };

//     async function getRec (){
//     const result = await axios.get(SERVER_URL)
//     setRcp(result.data.hits)
//     console.log(result.data)
//     }

//     const _handleSubmit = (event) => {
//             event.preventDefault();
//             props.onSubmit(value);
//             setValue('');  
//             getRec()
//         }

//         return(
//         <form onSubmit ={ _handleSubmit }>
            
//             <input type="search" required placeholder="Add your ingredients" value={value} onChange={e => setValue(e.target.value)} />
//             <input type="submit" value="Add Ingredient" />
//             Coming soon
//         </form>
//     );
// }


// export default RecipeGallery;

            /* <br></br>
            Asian
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
           
            <br></br>
            Italian
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <br></br>

            Japanese
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <br></br>

            Indian
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img>
            <img src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100"></img> */
        

