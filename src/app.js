'use strict';

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const config = require('../config.json');

require('express-handler-loader')('ufwd_writer', {
	pathname: path.resolve(__dirname, './middleware')
});

const {
	createAxios
} = require('express-handler-loader')('ufwd_writer');

const router = require('./router');
const app = module.exports = require('express')();

app.use(cookieParser());

app.use(bodyParser.json({
	type: 'application/json',
	limit: '32mb'
}));

app.use('/api', cors({
	credentials: true
}));

app.use('/api', session({
	saveUninitialized: config.saveUninitialized,
	secret: 'writer',
	resave: config.resave,
	cookie: {
		httpOnly: config.httpOnly
	}
}));

app.use('/api', createAxios);

app.use(router);