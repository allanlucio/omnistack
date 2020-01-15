const express = require('express');
const mogoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const app = express();
require('dotenv').config();

mogoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

app.use(cors({}));
app.use(express.json());
app.use(routes);



app.listen(8080);

