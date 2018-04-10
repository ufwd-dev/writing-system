'use strict';

const sequelize = require('../../database');

module.exports = function* createArtical(req, res, next) {
	const Artical = sequelize.model('ufwdArtical');
	const writerId = req.session.accountId;

	const construction = Object.assign({}, req.body, {author: writerId});

	const artical = yield Artical.create(construction);

	res.send(artical);

	next();
};