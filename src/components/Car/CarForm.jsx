import React, {useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";

const CarForm = ({onSubmit, validation}) => {
    const [carNumber, setCarNumber] = useState('');

    const handleSubmit = () => {
        onSubmit({number: carNumber});
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
            <ActBtn action={handleSubmit} label={"Submit"}/>
        </div>
    );
};

export default CarForm;
