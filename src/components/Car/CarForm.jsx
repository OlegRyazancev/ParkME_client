import React, {useMemo, useState} from 'react';
import ActBtn from '../UI/Button/ActBtn';
import cl from './Cars.module.css';

const CarForm = ({action, validation, selectedCar}) => {
    const [car, setCar] = useState({number: '', type: ''})
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCar !== null) {
            const updatedCar = {
                ...car, id: selectedCar.id, type: selectedCar.type
            }
            action(updatedCar);
        } else {
            action(car);
        }
        setCar({number: '', type: ''});
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
            <form>
                <p className={cl.formHeader}>
                    {selectedCar !== null
                        ? 'Edit car'
                        : 'Create car'}
                </p>
                <div className={cl.inputContainer}>
                    <span>Enter new car number: </span>
                    <input
                        type="text"
                        onChange={(e) =>
                            setCar({
                                ...car,
                                number: e.target.value
                            })}
                        value={car.number}
                        placeholder="A000AA00"
                    />
                </div>
                <div className={cl.inputContainer}>
                    <span>Select new car type: </span>
                    {selectedCar !== null
                        ? (
                            <input
                            type="text"
                            value={car.type}
                            readOnly
                            placeholder="disable"
                        />
                        )
                        : (
                            <select
                                onChange={(e) => setCar({
                                    ...car,
                                    type: e.target.value
                                })}
                                value={car.type}
                            >
                                {carTypeOptions}
                            </select>

                        )}
                </div>
                <p className={cl.validationMsg}>{validation}</p>
                <ActBtn
                    action={handleSubmit}
                    label={
                        selectedCar !== null
                            ? 'Save'
                            : 'Create'
                    }
                />
            </form>
        </div>
    );
};

export default CarForm;
