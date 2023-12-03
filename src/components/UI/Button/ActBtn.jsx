import React from "react";
import cl from './ActBtn.module.css'

const ActBtn = ({label}) => {
    return (
        <button className={cl.actBtn}>{label}</button>
    )
}

export default ActBtn