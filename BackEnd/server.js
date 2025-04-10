const express = require('express');
require ("./DB.js");
const cors = require('cors');
const UserRouter = require('./routes/UserRouter');
const CommunityRouter = require('./routes/CommunityRouter.js');
const CityRouter = require('./routes/CityRouter.js');
const AddressRouter = require ('./routes/AddressRouter.js')

const app = express();

const PORT = 7777;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api', UserRouter);
app.use('/api', CommunityRouter);
app.use('/api', CityRouter);
app.use('/api', AddressRouter);

app.get ('/', (req, res) =>{
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`сервер працює за адресом: http://localhost:${PORT}`);
});