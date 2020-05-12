const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mainRoutes  = require('./routes/main');

var app = express();
const PORT = '8000';

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
app.use('/api', mainRoutes);

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});