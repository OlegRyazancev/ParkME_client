import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import ZoneService from "../../service/ZoneService";
import Loader from "../../components/UI/Loader/Loader";
import {observer} from "mobx-react-lite";
import cl from "./ZoneById.module.css"
import PlaceList from "../../components/Place/PlaceList";

const ZoneById = () => {
    const params = useParams();
    const [zone, setZone] = useState({
        id: null,
        number: null,
        places: []
    });
    const [fetchZoneById, isLoading] = useFetching(async (id) => {
        const response = await ZoneService.getById(id);
        setZone(response.data);
    })

    useEffect(() => {
        fetchZoneById(params.id)
    }, []);

    return (
        <div className="App">
            <div className={cl.zoneByIdHeader}>Zone {zone.number}</div>
            <hr className={cl.hrLine}/>
            {isLoading && <Loader/>}
            <div className={cl.placesContainer}>
                Places
                <PlaceList places={zone.places}/>
            </div>
        </div>
    )
}

export default observer(ZoneById);