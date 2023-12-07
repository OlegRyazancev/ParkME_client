import React from "react";
import cl from './ActBtn.module.css'

const ActBtn = ({label , action}) => {
    return (
        <button className={cl.actBtn} onClick={action}>{label}</button>
    )
}

export default ActBtn