'use strict';

const path = require('path');
const application = require('./webpack.base');

application.mode = 'development';

application.devServer = {
	port: 8000,
	host: '0.0.0.0',
	hot: true,
	contentBase: path.resolve(__dirname, '../dist'),
	proxy: {
		'/api': 'http://localhost:8200'
	}
};

module.exports = application;