const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
require('dotenv').config();

var app = express();
const PORT = process.env.PORT;
const CONNECTION = process.env.DATABASE_URI;

// db connection
mongoose.connect(CONNECTION,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }
    ).then(() => {
            console.log('Database connected');
        }
    ).catch((err) => {
            console.log(`Error connecting to the database: ${err}`);
        }
    );

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});