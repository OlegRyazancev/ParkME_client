import React from 'react';
import cl from "./PageHeader.module.css"

const PageHeader = ({value}) => {
    return (
        <div>
            <p className={cl.header}>{value}</p>
            <hr className={cl.hrLine}/>
        </div>
    );
};

export default PageHeader;