'use strict';

const path = require('path');
const webpack = require('webpack');
const application = require('./webpack.base');

application.mode = 'development';

application.devServer = {
	port: 8300,
	host: '0.0.0.0',
	hot: true,
	contentBase: path.resolve(__dirname, '../dist'),
	proxy: {
		'/api': 'http://localhost:8888'
	}
};

application.plugins.push(
	new webpack.HotModuleReplacementPlugin()
);
module.exports = application;