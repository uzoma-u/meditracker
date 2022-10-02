const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path: './config/.env'});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port: ${port}`));