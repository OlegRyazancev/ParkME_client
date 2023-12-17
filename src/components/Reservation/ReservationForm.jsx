import React, {useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";
import {format} from "date-fns";
import cl from "../Car/Cars.module.css";

const ReservationForm = ({onSubmit, validation, reservation}) => {
    const [selectedTimeTo, setSelectedTimeTo] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const handleSubmit = () => {
        onSubmit({
            id: reservation.id,
            timeTo: selectedTimeTo
        });
        setSelectedTimeTo('');
    }

    const handleTimeTo = (data) => {
        const selectedDateTime = new Date(data);
        if (selectedDateTime >= Date.now()) {
            const formattedTimeTo =
                format(selectedDateTime, 'yyyy-MM-dd HH:mm');
            setSelectedTimeTo(formattedTimeTo);
        } else {
            setValidationMessage('Time to must be after or equal ' +
                'to the current time');
            setSelectedTimeTo('');
        }
    }
    return (
        <div className={cl.formContainer}>
            <p className={cl.formHeader}>Edit reservation</p>
            <div className={cl.inputContainer}>
                <span>Select new time to: </span>
                <input
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, 16)}
                    max={'2050-01-01T00:00'}
                    onChange={(e) => handleTimeTo(e.target.value)}
                />
            </div>
            <p className={cl.validationMsg}>{validationMessage ? validationMessage : validation}</p>
            <ActBtn action={handleSubmit} label={"Edit"}/>
        </div>
    );
};

export default ReservationForm;