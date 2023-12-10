import React from 'react';

const Select = ({label, value, options, action, isDisabled}) => {
    return (
        <div>
            {label}
            <select
                onChange={(e) => action(e.target.value)}
                disabled={isDisabled}
                value={value}
            >
                {options}
            </select>
        </div>
    );
};

export default Select;