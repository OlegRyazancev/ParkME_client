import React from 'react';
import cl from "./Cars.module.css";
import ActBtn from "../UI/Button/ActBtn";

const CarsTable = ({cars, onDelete}) => {

    const handleDelete = (id) => {
        onDelete(id);
    }

    if (!cars.length) {
        return (
            <div style={{color: "#850000"}}>cars not found!</div>
        )
    }

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
                        <ActBtn label="delete" action={() => handleDelete(car.id)}/>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CarsTable;
