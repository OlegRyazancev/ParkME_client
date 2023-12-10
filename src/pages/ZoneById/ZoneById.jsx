import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import ZoneService from "../../service/ZoneService";
import Loader from "../../components/UI/Loader/Loader";
import {observer} from "mobx-react-lite";
import cl from "./ZoneById.module.css"
import PlaceList from "../../components/Place/PlaceList";
import PageHeader from "../../components/UI/PageHeader/PageHeader";

const ZoneById = () => {
    const params = useParams();
    const [zone, setZone] = useState({
        id: null,
        number: null,
        places: []
    });
    const [zoneToSend, setZoneToSend] = useState();
    const [fetchZoneById, isLoading] = useFetching(async (id) => {
        const response = await ZoneService.getById(id);

        setZone(response.data);
        setZoneToSend({
            id: response.data.id,
            number: response.data.number
        });
    })

    useEffect(() => {
        fetchZoneById(params.id)
    }, []);

    return (
        <div className="App">
            <PageHeader value={`Zone ${zone.number}`}/>
            {isLoading && <Loader/>}
            <div className={cl.placesContainer}>
                Places
                <PlaceList zone={zoneToSend} places={zone.places}/>
            </div>
        </div>
    )
}

export default observer(ZoneById);