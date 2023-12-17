import React, {useState} from 'react';
import ActBtn from "../UI/Button/ActBtn";
import DateTimePicker from "../UI/DateTimePicker/DateTimePicker";
import {format} from "date-fns";

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
        <div>
            <p>Edit reservation</p>
            <DateTimePicker name={"Select new timeTo"}
                            action={handleTimeTo}/>
            <p>{validationMessage ? validationMessage : validation}</p>
            <ActBtn action={handleSubmit} label={"Edit"}/>
        </div>
    );
};

export default ReservationForm;