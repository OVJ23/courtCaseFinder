// src/components/LegalHistoryCheck.js
import React, { useState } from 'react';

const LegalHistoryCheck = () => {
    const [name, setName] = useState('');
    const [requestId, setRequestId] = useState('');
    const [details, setDetails] = useState('');

    const submitForm = async () => {
        try {
            const response = await fetch('http://localhost:3000/verify-cases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                }),
            });

            const data = await response.json();
            setRequestId(data.requestId);

            // Fetch details after submitting the form
            const detailsResponse = await fetch(`http://localhost:3000/get-details/${data.requestId}`);
            const detailsData = await detailsResponse.json();
            setDetails(JSON.stringify(detailsData));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Legal History Check</h1>
            <label htmlFor="name">Enter Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="button" onClick={submitForm}>
                Submit
            </button>
            <div>
                <p>Request ID: {requestId}</p>
                <p>Details: {details}</p>
            </div>
        </div>
    );
};

export default LegalHistoryCheck;
