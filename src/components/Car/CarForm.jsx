import React, {useEffect, useMemo, useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";
import cl from "./Cars.module.css"
import Select from "../UI/Select/Select";

const CarForm = ({onSubmit, validation, carId, oldNumber}) => {
    const [carNumber, setCarNumber] = useState('');
    const [carType, setCarType] = useState('');
    const [buttonLabel, setButtonLabel] = useState(carId ? 'edit' : 'create')
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
        setButtonLabel(carId ? 'save' : 'create');
    }, [carId]);

    const handleSubmit = () => {
        if (!carNumber.trim() || !carType.trim()) {
            setValidationMessage('Please fill in all fields');
            return;
        }
        if (carId) {
            onSubmit({
                id: carId,
                number: carNumber,
                type: carType
            });
        } else {
            onSubmit({
                number: carNumber,
                type: carType
            });
        }
        setCarNumber('');
    };

    const carTypes = [
        'SEDAN',
        'COUPE',
        'CONVERTIBLE',
        'SUV',
        'TRUCK',
        'HATCHBACK',
        'MINIVAN',
        'ELECTRIC',
        'HYBRID',
    ];
    const carTypeOptions = useMemo(() => (
        <>
            <option value="">Select Car Type</option>
            {carTypes.map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </>
    ), [carTypes]);

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
                <Select options={carTypeOptions}
                        action={(selectedType) => setCarType(selectedType)}/>
            </div>
            <p className={cl.validationMsg}>
                {validationMessage
                    ? validationMessage
                    : validation}
            </p>
            <ActBtn action={handleSubmit} label={buttonLabel}/>
        </div>
    );
};

export default CarForm;
