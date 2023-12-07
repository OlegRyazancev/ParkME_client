import React from 'react';
import cl from "./Reservations.module.css";
import ActBtn from "../UI/Button/ActBtn";

const ReservationsTable = ({reservations}) => {

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE':
                return '#096209';
            case 'CANCELED':
                return '#850000';
            case 'PLANNED':
                return '#986601'
            case 'COMPLETED':
                return '#017373';
            default:
                return 'white';
        }
    };

    return (
        <table>
            <tbody>
            {reservations.map((reservation) => (
                <tr key={reservation.id}>
                    {(reservation.status === 'ACTIVE' || reservation.status === 'PLANNED')
                        ?
                        <>
                            <td>
                                <ActBtn label="cancel"/>
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

                    <td className={cl.timeRange}>
                        {reservation.timeFrom} - {reservation.timeTo}
                    </td>
                    <td style={{color: getStatusColor(reservation.status)}}>
                        {reservation.status}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ReservationsTable;
