require('dotenv').config();
const app = require('./app');
const log = console.log;
const PORT = 1000;

app.listen(PORT, (error) => {
    if (!error)
        log(`Server is up and running at ${PORT}...`);
    else
        log("Error occurred, server can't start. ", error);
});