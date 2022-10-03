const {app_port} = require('./config/config');
const db = require('./config/db');
const express = require('express');

const app = express();





(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();




const port = app_port|| 3000;
app.listen(port, () => console.log(`Listening on Port: ${port}`));