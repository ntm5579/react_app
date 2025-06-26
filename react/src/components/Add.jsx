import React, { useState } from 'react';

const Add = () => {
    const [formData, setFormData] = useState({
        userId: "",
        sockDetails: {
            size: "Small",
            color: "",
            pattern: "",
            material: "",
            condition: "Used",
            forFoot: "Left",
        },
        additionalFeatures: {
            waterResistant: false,
            padded: false,
            antiBacterial: false,
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            addedTimestamp: new Date().toISOString(),
        };
        fetch(`${import.meta.env.VITE_SOCKS_API_URL}`, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    }

    function handleChanges(e) {
        const { name, value, type, checked } = e.target;
        if (name in formData.sockDetails) {
            setFormData({
                ...formData,
                sockDetails: { ...formData.sockDetails, [name]: value }
            });
        }
        else if (name in formData.additionalFeatures) {
            setFormData({
                ...formData,
                additionalFeatures: { ...formData.additionalFeatures, [name]: checked }
            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    return (
        <form className="p-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="userId">User ID</label>
                <input
                    type="text"
                    className="form-control"
                    id="userId"
                    name="userId"
                    value={formData.userId} //what to put in brackets
                    onChange={handleChanges}
                />
            </div>
            <div className="form-group">
                <label htmlFor="size">Size</label>
                <select
                    className="form-control"
                    id="size"
                    name="size"
                    value={formData.sockDetails.size}
                    onChange={handleChanges}
                >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    className="form-control"
                    id="color"
                    name="color"
                    value={formData.sockDetails.color}
                    onChange={handleChanges}
                />
            </div>
            <div className="form-group">
                <label htmlFor="pattern">Pattern</label>
                <input
                    type="text"
                    className="form-control"
                    id="pattern"
                    name="pattern"
                    value={formData.sockDetails.pattern}
                    onChange={handleChanges}
                />
            </div>
            <div className="form-group">
                <label htmlFor="material">Material</label>
                <input
                    type="text"
                    className="form-control"
                    id="material"
                    name="material"
                    value={formData.sockDetails.material}
                    onChange={handleChanges}
                />
            </div>
            <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <select
                    className="form-control"
                    id="condition"
                    name="condition"
                    value={formData.sockDetails.condition}
                    onChange={handleChanges}
                >
                    <option>Used</option>
                    <option>New</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="forFoot">For Foot</label>
                <select
                    className="form-control"
                    id="forFoot"
                    name="forFoot"
                    value={formData.sockDetails.forFoot}
                    onChange={handleChanges}
                >
                    <option>Left</option>
                    <option>Right</option>
                    <option>Both</option>
                </select>
            </div>
            <div className="row">
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="waterResistant"
                        name="waterResistant"
                        value={formData.additionalFeatures.waterResistant}
                        onChange={handleChanges}
                    />
                    <label className="form-check-label" htmlFor="waterResistant">
                        Water Resistant
                    </label>
                </div>
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="padded"
                        name="padded"
                        value={formData.additionalFeatures.padded}
                        onChange={handleChanges}
                    />
                    <label className="form-check-label" htmlFor="padded">
                        Padded
                    </label>
                </div>
                <div className="form-check col">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="antiBacterial"
                        name="antiBacterial"
                        value={formData.additionalFeatures.antiBacterial}
                        onChange={handleChanges}
                    />
                    <label className="form-check-label" htmlFor="antiBacterial">
                        Anti Bacterial
                    </label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default Add;