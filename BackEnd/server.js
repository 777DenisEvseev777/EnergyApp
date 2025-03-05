const express = require('express');
require ("./DB.js");
const cors = require('cors');

const app = express();

const PORT = 7777;
app.use(cors());
app.use(express.json());


app.get ('/', (req, res) =>{
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`сервер працює за адресом: http://localhost:${PORT}`);
});