import React from 'react';

const Promotion = (props) => {
    const featureds = props.data;
    return (
        <div className="card">
            <div className="card bg-light">
                <div className="card-text">{props.data.feature}</div>
                <div className="card-text"><a href="#">Click to buy!</a></div>
            </div>
        </div>
    );
};

export default Promotion;