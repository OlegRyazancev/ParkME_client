import React, {useState} from 'react';
import cl from "../../pages/UserProfile/UserProfile.module.css";
import ReservationsFilter from "./ReservationsFilter";
import {useReservations} from "../../hooks/useReservations";

const ReservationsTable = ({reservations, onUpdate, onCancel}) => {

    const [filter, setFilter] = useState({sort: ''});
    const sortedReservations = useReservations(reservations, filter.sort);

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE':
                return '#135d13';
            case 'CANCELED':
                return '#7c2020';
            case 'PLANNED':
                return '#917321'
            case 'COMPLETED':
                return '#187777';
            default:
                return 'white';
        }
    };

    return (
        <div>
            <p className={cl.propHeader}>Reservations</p>
            <div>
                <ReservationsFilter
                    filter={filter}
                    setFilter={setFilter}
                />
                <table>
                    <thead>
                    <tr>
                        <th>Time From</th>
                        <th>Time To</th>
                        <th>Zone</th>
                        <th>Place</th>
                        <th>Car</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedReservations.map((reservation, index) => (
                        <tr key={index}>
                            <td>{reservation.timeFrom}</td>
                            <td>{reservation.timeTo}</td>
                            <td>{reservation.zone?.number}</td>
                            <td>{reservation.place?.number}</td>
                            <td>{reservation.car?.number}</td>
                            <td style={{color: getStatusColor(reservation.status)}}>
                                {reservation.status}
                            </td>
                            {(reservation.status === 'ACTIVE' || reservation.status === 'PLANNED')
                                ?
                                <>
                                    <td>
                                        <button
                                            onClick={() => onUpdate(reservation)}>
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => onCancel(reservation.id)}>
                                            Cancel
                                        </button>
                                    </td>
                                </>
                                :
                                <>
                                    <td></td>
                                    <td></td>
                                </>
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationsTable;