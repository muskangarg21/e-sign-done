const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

const app = express();

app.use(cors())
app.use(fileUpload());

 //app.set('view engine','ejs');

app.use('/',require('./routes/index'));

const PORT =3012;

app.listen(PORT,()=>{console.log(`Listening to PORT ${PORT}`)});