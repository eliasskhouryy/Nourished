import {React, useState} from 'react';

const IngredientSelector = (props) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const toggle = (ingredient) => {
        console.log(ingredient)
        let updatedIngredients;
        if (selectedIngredients.includes(ingredient)) {
            updatedIngredients = selectedIngredients.filter((i) => i != ingredient);
        } else {
            updatedIngredients = [...selectedIngredients, ingredient];
        }
        setSelectedIngredients(updatedIngredients);
        props.onUpdate(updatedIngredients);
    }

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