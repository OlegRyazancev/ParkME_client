import React from 'react';
import cl from "./Select.module.css"

const Select = ({label, value, options, action, isDisabled}) => {
    return (
        <div className={cl.selectContainer}>
            <span>{label}</span>
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