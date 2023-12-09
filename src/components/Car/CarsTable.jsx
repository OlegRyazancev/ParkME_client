import React, {useState} from 'react';
import cl from "./Cars.module.css";
import ActBtn from "../UI/Button/ActBtn";
import CarForm from "./CarForm";
import Modal from "../UI/Modal/Modal";

const CarsTable = ({cars, onDelete, onUpdate, validationMsg, onModalClose}) => {

    const [selectedCar, setSelectedCar] = useState({});
    const [modalUpdateCar, setModalUpdateCar] = useState(false);
    const [localValidationMsg, setLocalValidationMsg] = useState(validationMsg);

    const handleDelete = (id) => {
        onDelete(id);
    }
    const handleUpdate = (car) => {
        setSelectedCar(car);
        setModalUpdateCar(true)
    }
    const handleCloseModal = () => {
        setModalUpdateCar(false);
        setLocalValidationMsg('');
        onModalClose();
    };


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
            <Modal visible={modalUpdateCar}
                   setVisible={setModalUpdateCar}
                   onClose={handleCloseModal}>
                <CarForm
                    onSubmit={onUpdate}
                    validation={validationMsg}
                    carId={selectedCar.id}
                />
            </Modal>
        </>

    );
};

export default CarsTable;
