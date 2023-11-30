import React, {useEffect, useState} from "react";
import ZoneList from "../components/Zone/ZoneList";
import styles from '../components/Zone/Zone.module.css'
import {useFetching} from "../hooks/useFetching";
import ZoneService from "../service/ZoneService";
import {observer} from "mobx-react-lite";
import Navbar from "../components/UI/Navbar/Navbar";

function Zones() {
    const [zones, setZones] = useState([])
    const [fetchZones] = useFetching(async () => {
        const response = await ZoneService.getAll();
        setZones([...zones, ...response.data])
    })

    useEffect(() => {
        fetchZones();
    }, []);

    return (
        <div className="App">
            <Navbar/>
            <div className={styles.zonesHeader}>Parking zones</div>
            <ZoneList zones={zones}/>
        </div>
    )
}

export default observer(Zones);