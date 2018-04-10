'use strict';

const {throwError} = require('error-standardize');
const sequelize = require('../../database');

module.exports = function* createClassification(req, res, next) {
	const Classification = sequelize.model('ufwdCategoryHasArtical');
	const Artical = sequelize.model('ufwdArtical');
	const Category = sequelize.model('ufwdCategory');
	const { articalId, categoryId } = req.params;

	const artical = yield Artical.findOne({
		where: {
			id: articalId,
			published: 0
		}
	});

	const category = yield Category.findOne({
		where: {
			id: categoryId
		}
	});

	if (!artical) {
		throwError('The artical is not existed.', 404);
	}

	if (!category) {
		throwError('The category is not existed.', 404);
	}

	const classification = yield Classification.findOrCreate({
		where: {
			articalId, categoryId
		}
	});

	res.send(classification);

	next();
};