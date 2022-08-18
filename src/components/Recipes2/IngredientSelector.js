import {React, useState, useEffect} from 'react';

const IngredientSelector = (props) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(()=>
    {
        const jsonItems = localStorage.getItem('selectedIngredients') || '[]'
        const items = JSON.parse(jsonItems);
        setSelectedIngredients(items);
    },[]);

    const toggle = (ingredient) => {
        
        console.log(ingredient)
        let updatedIngredients;
        if (selectedIngredients.includes(ingredient)) {
            updatedIngredients = selectedIngredients.filter((i) => i != ingredient);
        } else {
            updatedIngredients = [...selectedIngredients, ingredient];
        }
        setSelectedIngredients(updatedIngredients);
        localStorage.setItem('selectedIngredients', JSON.stringify(updatedIngredients))

        props.onUpdate(updatedIngredients);
    }
    console.log(selectedIngredients);

    return (
        <div>
            {
                props.ingredients.map((i) => (
                    <label>
                        {i}:
                        <input
                            type="checkbox"
                            onChange={() => toggle(i)}
                            checked={selectedIngredients.includes(i)}
                            />
                    </label>
                    
                ))
            }
        </div>
    );
};

export default IngredientSelector;