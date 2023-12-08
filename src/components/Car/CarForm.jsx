import React, {useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";

const CarForm = ({onSubmit, validation, carId}) => {
    const [carNumber, setCarNumber] = useState('');
    let buttonLabel;

    const handleSubmit = () => {
        if (carId) {
            onSubmit({
                id: carId,
                number: carNumber
            });
            buttonLabel = 'edit'
        } else {
            onSubmit({
                number: carNumber
            });
            buttonLabel = 'create'
        }

        setCarNumber('');
    };

    return (
        <div>
            <input
                onChange={(e) => setCarNumber(e.target.value)}
                value={carNumber}
                type="text"
                placeholder="carNumber"
            />
            <p>{validation}</p>
            <ActBtn action={handleSubmit} label={buttonLabel}/>
        </div>
    );
};

export default CarForm;
