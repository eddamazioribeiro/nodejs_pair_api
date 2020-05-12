const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


var app = express();
const PORT = '8000';

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
app.get('/api/test', (req, res) => {
    res.json({
        message: 'Return successful'
    });
});

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});