import React from 'react';
import cl from "./Cars.module.css";
import ActBtn from "../UI/Button/ActBtn";

const CarsTable = ({ cars }) => {
    return (
        <table>
            <tbody>
            {cars.map((car) => (
                <tr key={car.id}>
                    <td className={cl.carNum}>
                        {car.number}
                    </td>
                    <td>
                        <ActBtn label="edit"/>
                    </td>
                    <td>
                        <ActBtn label="delete"/>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CarsTable;
