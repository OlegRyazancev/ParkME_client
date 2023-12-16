import React from 'react';
import cl from "./Reservations.module.css";

const ReservationsTable = ({reservations, onCancel, filter}) => {

    const handleCancel = (id) => {
        onCancel(id);
    }

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

    if (!reservations.length) {
        return (
            <div className={cl.resException} >Reservations not found!</div>
        )
    }

    return (
        <div>
            {filter}
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
                {reservations.map((reservation, index) => (
                    <tr key={index}>
                        <td>{reservation.timeFrom}</td>
                        <td>{reservation.timeTo}</td>
                        <td>{reservation.zone.number}</td>
                        <td>{reservation.place.number}</td>
                        <td>{reservation.car.number}</td>
                        <td style={{color: getStatusColor(reservation.status)}}>{reservation.status}</td>
                        {(reservation.status === 'ACTIVE' || reservation.status === 'PLANNED')
                            ?
                            <>
                                <td>
                                    <button>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleCancel(reservation.id)}>Cancel</button>
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
    );
};

export default ReservationsTable;
