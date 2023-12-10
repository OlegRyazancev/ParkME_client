import React from 'react';
import cl from "./Reservations.module.css";
import ActBtn from "../UI/Button/ActBtn";

const ReservationsTable = ({reservations, reservationInfo, onCancel, filter}) => {

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
            <tbody>
            {reservations.map((reservation) => (
                <tr key={reservation.id}>
                    {(reservation.status === 'ACTIVE' || reservation.status === 'PLANNED')
                        ?
                        <>
                            <td>
                                <ActBtn label="cancel"
                                        action={() => handleCancel(reservation.id)}/>
                            </td>
                            <td>
                                <ActBtn label="edit"/>
                            </td>
                        </>
                        :
                        <>
                            <td></td>
                            <td></td>
                        </>
                    }
                    <td className={cl.timeRange}
                        onClick={() => reservationInfo(reservation)}>
                        {reservation.timeFrom} - {reservation.timeTo}
                    </td>
                    <td style={{color: getStatusColor(reservation.status)}}>
                        {reservation.status}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default ReservationsTable;
