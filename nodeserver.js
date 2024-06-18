const express = require('express');
const path = require('path');

const app = express();

//routing
app.get('/app1', function(req, res) {
    //  JSON data
    const jsonData = {
        name: "app1",
        value: "44",
    };
    // Sending JSON response
    res.json(jsonData);
});

app.get('/app2', function(req, res) {
    //  JSON data
    const jsonData = {
        name: "app2",
        value: "54",
    };
    // Sending JSON response
    res.json(jsonData);
});



// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//catch all unknown URLs
app.use((req, res) => {
    res.status(404).json({ error: "Not Found, invalid url" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

