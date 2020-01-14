const express = require('express');
const mogoose = require('mongoose');
const routes = require('./routes');
const app = express();

mogoose.connect("mongodb+srv://allan:N2k6Bo3g74W7MdHF@cluster0-5uqtd.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology: true
});
app.use(express.json());
app.use(routes);



app.listen(8080);

