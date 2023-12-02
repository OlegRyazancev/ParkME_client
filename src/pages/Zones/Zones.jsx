import React, {useEffect, useState} from "react";
import ZoneList from "../../components/Zone/ZoneList";
import cl from "./Zones.module.css";
import {useFetching} from "../../hooks/useFetching";
import ZoneService from "../../service/ZoneService";
import {observer} from "mobx-react-lite";
import Navbar from "../../components/UI/Navbar/Navbar";
import Loader from "../../components/UI/Loader/Loader";

const Zones = () => {
    const [zones, setZones] = useState([])
    const [fetchZones, isZonesLoading] = useFetching(async () => {
        const response = await ZoneService.getAll();
        setZones([...zones, ...response.data])
    })

    useEffect(() => {
        fetchZones();
    }, []);

    return (
        <div className="App">
            <Navbar/>
            <div className={cl.zonesHeader}>Parking zones</div>
            {isZonesLoading && <Loader/>}
            <ZoneList zones={zones}/>
        </div>
    )
}

export default observer(Zones);