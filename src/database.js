'use strict';

const Sequelize = require('sequelize');

module.exports = new Sequelize('ufwd', 'root', '123456', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		min: 0,
		max: 5,
		idle: 1000,
		port: 3306
	}
});