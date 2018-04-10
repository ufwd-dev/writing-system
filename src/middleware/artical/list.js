'use strict';

const {throwError} = require('error-standardize');
const Sequelize = require('sequelize');
const sequelize = require('../../database');

module.exports = function* getOwnArticalList(req, res, next) {
	const Artical = sequelize.model('ufwdArtical');
	const writerId = req.session.accountId;
	const { keyword, examine, published} = req.query;
	const query = {
		where:{
			author: writerId
		}
	};

	keyword ? (query.where.content = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;
	examine ? (query.where.examine = (examine === 'true' ? 1 : 0)) : undefined;
	published ? (query.where.published = (published === 'true' ? 1 : 0)) : undefined;

	const articalList = yield Artical.findAll(query);

	if (articalList.length === 0) {
		throwError('The artical is not existed.', 404);
	}

	res.send(articalList);

	next();
};