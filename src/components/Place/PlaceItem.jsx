import React, {useContext, useState} from 'react';
import cl from './Place.module.css'
import placeLogo from "../../images/place_logo.png";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {useFetching} from "../../hooks/useFetching";
import AdminService from "../../service/AdminService";
import Modal from "../UI/Modal/Modal";

const PlaceItem = (props) => {
    const {store} = useContext(Context);
    const [modalMessage, setModalMessage] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    let statusClass;

    const [changePlaceStatus] = useFetching(async (status) => {
        const changedStatus = status === 'DISABLE' ? 'FREE' : 'DISABLE';
        try {
            await AdminService.changePlaceStatusById(props.place.id, changedStatus);
            setMessage('Place status successfully changed!');
            setModalMessage(true);
            props.place.status = changedStatus;
        } catch (e) {
            setMessage(e.response.data.message);
            setModalMessage(true);
        }
    });

    const [deletePlace] = useFetching(async (id) => {
        try {
            await AdminService.deletePlace(id);
            setMessage('Place successfully deleted! Please reload the page');
            setModalMessage(true);
        } catch (e) {
            setMessage(e.response.data.message);
            setModalMessage(true);
        }
    })


    const handlePickClick = () => {
        localStorage.setItem("selectedZone", JSON.stringify(props.zone));
        localStorage.setItem("selectedPlace", JSON.stringify(props.place));
        navigate("/new-reservation");
    }
    switch (props.place.status) {
        case 'FREE':
            statusClass = cl.free;
            break;
        case 'OCCUPIED':
            statusClass = cl.occupied;
            break;
        case 'DISABLE':
            statusClass = cl.disable;
            break;
        default:
            statusClass = '';
    }
    return (
        <div className={cl.placeContainer}>
            <Modal
                visible={modalMessage}
                setVisible={setModalMessage}>
                {message}
            </Modal>
            <div className={cl.placeProps}>
                <span className={cl.num}>Place {props.place.number}</span>
                <span className={statusClass}>{props.place.status}</span>
            </div>
            <img className={cl.placeImg} src={placeLogo} alt="place_logo"/>
            <button className={cl.btn} onClick={handlePickClick}>PICK
            </button>
            {store.user.roles.includes('ROLE_ADMIN') && (
                <>
                    <button
                        onClick={() => changePlaceStatus(props.place.status)}
                        disabled={props.place.status === 'OCCUPIED'}
                    >
                        {props.place.status === 'DISABLE' ? 'Activate' : 'Disable'}
                    </button>
                    <button
                        onClick={() => deletePlace(props.place.id)}
                        disabled={props.place.status === 'OCCUPIED'}
                    >
                        Delete
                    </button>
                </>
            )}

        </div>
    );
}

export default PlaceItem;

