import React, {useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";
import cl from "./Cars.module.css"

const CarForm = ({onSubmit, validation, carId}) => {
    const [carNumber, setCarNumber] = useState('');
    const [buttonLabel, setButtonLabel] = useState(carId? 'edit': 'create')


    const handleSubmit = () => {
        if (carId) {
            onSubmit({
                id: carId,
                number: carNumber
            });
            setButtonLabel('save');
        } else {
            onSubmit({
                number: carNumber
            });
            setButtonLabel('create');
        }

        setCarNumber('');
    };

    return (
        <div className={cl.formContainer}>
            <p className={cl.formHeader}>New car</p>
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
