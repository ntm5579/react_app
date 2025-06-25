import React from 'react';

const Footer = (props) => {
    let myStyles = {};
    if (props.environment === "DEVELOPMENT"){
        myStyles = "bg-yellow";
    }
    else if (props.environment === "PRODUCTION"){
        myStyles = "bg-yellow";
    }

    return (
        <footer className="text-muted">
            <div className={myStyles}><strong>{props.environment}</strong></div>
        </footer>
        
    );
};

export default Footer;