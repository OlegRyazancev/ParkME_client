import React from 'react';

const ReservationsFilter = ({filter, setFilter}) => {
    return (
        <div>
            <select
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
