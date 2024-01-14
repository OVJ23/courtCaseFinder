// server.js

const express = require('express');
// const fetch = require('node-fetch');
const bodyParser = require('body-parser');
var cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

// Replace these placeholders with your actual values
const apiKey = 'e27fcca1-ce7a-4a2f-aeb8-ce9028c49514';
const accountId = '724c286ac5c0/cb40f22c-fa0b-400d-8606-266010bbc185';

app.use(cors()); // Enable CORS for all routes
// Use bodyParser middleware
app.use(bodyParser.json());


// Endpoint to initiate the verification process
app.post('/verify-cases', async (req, res) => {
    try {
        const { name } = req.body;
        console.log("POST request sent");
        const response = await fetch('https://eve.idfy.com/v3/tasks/async/verify_with_source/ind_court_record', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify({
                "task_id": "74f4c926-250c-43ca-9c53-453e87ceacd1",
                "group_id": "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",
                "data": {
                    "entity_type": "individual",
                    "entity_type_details": {
                        "name": name,
                    }
                }
            }),
        });

        const data = await response.json();
        console.log(data);
        // document.getElementById('response').innerHTML = `Request ID: ${data.request_id}`;
        // Fetch details after submitting the form
        res.json({ requestId: data.request_id });
        // if (!data.success) {
        //     res.status(500).json({ error: 'Internal Server Error' });
        // } else {
        //     // getDetails(data.request_id);
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get details using request ID
app.get('/get-details/:requestId', async (req, res) => {

    try {
        console.log("GET request sent");
        const response = await fetch(`https://eve.idfy.com/v3/tasks?request_id=${req.params.requestId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
                'account-id': accountId,
            },
        });

        const data = await response.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
