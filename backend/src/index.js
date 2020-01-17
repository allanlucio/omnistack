const express = require('express');
const mogoose = require('mongoose');
const routes = require('./routes');
const http = require('http');
const {setupWebsocket} = require('./websocket');

const cors = require('cors');

require('dotenv').config();

const app = express();
const server = http.Server(app);
setupWebsocket(server);



mogoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

app.use(cors({}));
app.use(express.json());
app.use(routes);



server.listen(8080);

