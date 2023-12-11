import React, {useEffect, useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";
import cl from "./Cars.module.css"

const CarForm = ({onSubmit, validation, carId, oldNumber}) => {
    const [carNumber, setCarNumber] = useState('');
    const [buttonLabel, setButtonLabel] = useState(carId ? 'edit' : 'create')

    useEffect(() => {
        setButtonLabel(carId ? 'save' : 'create');
    }, [carId]);

    const handleSubmit = () => {
        if (carId) {
            onSubmit({
                id: carId,
                number: carNumber
            });
        } else {
            onSubmit({
                number: carNumber
            });
        }
        setCarNumber('');
    };

    return (
        <div className={cl.formContainer}>
            <p className={cl.formHeader}>{carId ? `Edit: ${oldNumber}` : "New car"}</p>
            <div className={cl.inputContainer}>
                <span>Enter new car number: </span>
                <input
                    onChange={(e) => setCarNumber(e.target.value)}
                    value={carNumber}
                    type="text"
                    placeholder="A000AA00"
                />
            </div>
            <p className={cl.validationMsg}>{validation}</p>
            <ActBtn action={handleSubmit} label={buttonLabel}/>
        </div>
    );
};

export default CarForm;
