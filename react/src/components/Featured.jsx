import React from 'react';
import Promotion from "./Promotion";


const Featured = (props) => {
    return (
        <div className="container-fluid">
            Both socks and space rockets 🚀 will take you to new heights, but only one will get cold feet!
            <h5>Featured</h5>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>{
                props.data.map((promo) => (
                    <Promotion key={promo.id} data={promo} />
                ))
            }</div>
        </div>
    );
};

export default Featured;