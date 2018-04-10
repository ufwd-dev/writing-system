'use strict';

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./database');

require('express-handler-loader')('ufwd_writer', {
	pathname: path.resolve(__dirname, './middleware')
});

const router = require('./router');
const app = module.exports = require('express')();

app.use(cookieParser());

app.use(bodyParser.urlencoded({
	extended: false,
	type: 'application/json',
	limit: '32mb'
}));

app.use('/api', cors({
	credentials: true
}));

app.use('api', session({
	saveUninitialized: false,
	secret: 'writer',
	resave: true,
	store: new SequelizeStore({
		db: sequelize,
		checkExpirationInterval: 6 * 60 * 60 * 1000,
		expiration: 24 * 60 * 60 * 1000
	}),
	cookie: {
		httpOnly: true
	}
}));

app.use(router);