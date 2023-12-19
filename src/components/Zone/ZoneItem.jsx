import React from 'react';
import zone_logo from '../../images/zone_logo.png';
import styles from '../../pages/Zones/Zones.module.css'
import {useNavigate} from "react-router-dom";

const ZoneItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className={styles.zoneContainer}
            onClick={() => navigate(`/zones/${props.zone.id}`)}>
            <img src={zone_logo} alt="zone_logo" className={styles.zoneLogo}/>
            <div className={styles.zoneName}>
                Zone {props.zone.number}
            </div>
            <div className={styles.zoneProperties}>
                <div className={styles.total}>
                    total:{props.zone["totalPlaces"]}
                </div>
                <div className={styles.free}>
                    free:{props.zone["freePlaces"]}
                </div>
            </div>
        </div>
    );
};

export default ZoneItem;