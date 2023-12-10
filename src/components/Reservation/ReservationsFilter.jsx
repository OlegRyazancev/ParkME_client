import React from 'react';
import cl from "./Reservations.module.css"

const ReservationsFilter = ({filter, setFilter}) => {
    return (
        <div>
            <select className={cl.filterSelect}
                value={filter.sort}
                onChange={(event) => setFilter({
                    ...filter,
                    sort: event.target.value
                })}
            >
                <option disabled value="">Sort by</option>
                <option value="timeFrom">By time from</option>
                <option value="status">By status</option>
            </select>
        </div>
    );
};

export default ReservationsFilter;
