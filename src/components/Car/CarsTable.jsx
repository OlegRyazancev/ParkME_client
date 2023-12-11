import React, {useState} from 'react';
import cl from "./Cars.module.css";
import ActBtn from "../UI/Button/ActBtn";
import CarForm from "./CarForm";
import Modal from "../UI/Modal/Modal";

const CarsTable = ({
                       cars,
                       onDelete,
                       onUpdate,
                       validationMsg,
                       onModalClose,
                       visible,
                       setVisible
                   }) => {

    const [selectedCar, setSelectedCar] = useState({});

    const handleDelete = (id) => {
        onDelete(id);
    }
    const handleUpdate = (car) => {
        setSelectedCar(car);
        setVisible(true)
    }

    if (!cars.length) {
        return (
            <div className={cl.carException}>Cars not found!</div>
        )
    }

    return (
        <>
            <table>
                <tbody>
                {cars.map((car) => (
                    <tr key={car.id}>
                        <td className={cl.carNum}>
                            {car.number}
                        </td>
                        <td>
                            <ActBtn label="edit"
                                    action={() => handleUpdate(car)}/>
                        </td>
                        <td>
                            <ActBtn label="delete"
                                    action={() => handleDelete(car.id)}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal visible={visible}
                   setVisible={setVisible}
                   onClose={onModalClose}>
                <CarForm
                    onSubmit={onUpdate}
                    validation={validationMsg}
                    carId={selectedCar.id}
                    oldNumber={selectedCar.number}
                />
            </Modal>
        </>

    );
};

export default CarsTable;
