/* eslint-disable func-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-params */

const express = require('express');
const { PORT } = require('./config/conf.js');
const { userRouter, pestRouter } = require('./router');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/inoxoft');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/pest', pestRouter);
// eslint-disable-next-line no-use-before-define
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log(`Port ${PORT} working...`)
});

// eslint-disable-next-line func-style
// eslint-disable-next-line space-before-function-paren
function _mainErrorHandler(err, req, res, next) {
    // eslint-disable-next-line no-magic-numbers
    res.status(err.status || 500).json({
        message: err.message || 'Unknown Error'
    })
}


