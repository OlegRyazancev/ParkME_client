import React from 'react';

const DateTimePicker = ({ name, value, action }) => {
    return (
        <div>
            {name}
            <input
                type="datetime-local"
                value={value}
                min={new Date().toISOString().slice(0, 16)}
                max={'2050-01-01T00:00'}
                onChange={(e) => action(e.target.value)}
            />
        </div>
    );
};

export default DateTimePicker;
