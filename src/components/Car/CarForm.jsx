import React, {useMemo, useState} from 'react';
import ActBtn from '../UI/Button/ActBtn';
import cl from './Cars.module.css';

const CarForm = ({onSubmit, validation, car}) => {
    const [carNumber, setCarNumber] = useState('');
    const [carType, setCarType] = useState('');
    const [buttonLabel] = useState(car ? 'save' : 'create');
    const [validationMessage, setValidationMessage] = useState('');

    const handleSubmit = () => {
        if (car) {
            onSubmit({
                id: car.id,
                number: carNumber,
                type: car.type
            });
        } else {
            if (!carNumber.trim() || !carType.trim()) {
                setValidationMessage('Please fill in all fields');
                return;
            }
            onSubmit({
                number: carNumber,
                type: carType
            });
        }
        setCarNumber('');
        setCarType('');
    };

    const carTypeOptions = useMemo(() => {
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

        return (
            <>
                <option value="">Select Car Type</option>
                {carTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </>
        );
    }, []);

    return (
        <div className={cl.formContainer}>
            <p className={cl.formHeader}>{car ? `Edit: ${car.number}` : 'New car'}</p>
            <div className={cl.inputContainer}>
                <span>Enter new car number: </span>
                <input
                    onChange={(e) => setCarNumber(e.target.value)}
                    value={carNumber}
                    type="text"
                    placeholder="A000AA00"
                />
            </div>
            <div className={cl.inputContainer}>
                <span>Select new car type: </span>
                {car ? (
                    <input
                        type="text"
                        value={car.type}
                        readOnly
                        placeholder={car.type}
                    />
                ) : (

                    <select onChange={(e) => setCarType(e.target.value)}
                            value={carType}>
                        {carTypeOptions}
                    </select>

                )}
            </div>


            <p className={cl.validationMsg}>{validationMessage ? validationMessage : validation}</p>
            <ActBtn action={handleSubmit} label={buttonLabel}/>
        </div>
    );
};

export default CarForm;
