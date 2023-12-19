import React, {useEffect, useState} from "react";
import ZoneList from "../../components/Zone/ZoneList";
import cl from "./Zones.module.css";
import {useFetching} from "../../hooks/useFetching";
import ZoneService from "../../service/ZoneService";
import {observer} from "mobx-react-lite";
import Loader from "../../components/UI/Loader/Loader";

const Zones = () => {
    const [zones, setZones] = useState([])
    const [fetchZones, isZonesLoading] = useFetching(async () => {
        const response = await ZoneService.getAll();
        setZones([...zones, ...response.data])
    })
    const sortedZones = [...zones].sort((a, b) => a.id - b.id);

    useEffect(() => {
        fetchZones();
    }, []);

    return (
        <div className="App">
            <div className={cl.zonesHeader}>Parking zones</div>
            {isZonesLoading && <Loader/>}
            <ZoneList zones={sortedZones}/>
        </div>
    )
}

export default observer(Zones);