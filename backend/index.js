const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// database
const database = require('./config/database');

database();

// route
const studentRoute = require('./routes/studenRoute');
const accountRoute = require('./routes/accountRoute');
const authRoute = require('./routes/authRoute');

app.use(accountRoute);
app.use('/murid', studentRoute);
app.use(authRoute);

app.listen(port, () => {
  console.log(`server runing on http://localhost:${port}`);
});
