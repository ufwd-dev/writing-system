'use strict';

const { throwError } = require('error-standardize');
const { createHash } = require('crypto');
const sequelize = require('../database');

module.exports = function* writerSignin(req, res, next) {
	const Account = sequelize.model('account');
	const Writer = sequelize.model('ufwdWriter');
	const { name,password } = req.body;

	if (req.session.accountId) {
		throwError('A account has been signed in. Sign out first, please', 403);
	}

	const account = yield Account.findOne({
		where: { name }
	});

	if (!account) {
		throwError('Account is NOT existed', 404);
	}

	const sha256 = createHash('sha256');
	sha256.update(`${account.salt}:${password}`);

	const ciphertext = sha256.digest('hex');

	if (ciphertext !== account.password) {
		throwError('Wrong password.', 401);
	}

	const writer = yield Writer.findOne({
		where: {
			accountId: account.id
		}
	});

	if (!writer) {
		throwError('No Authority', 404);
	}

	req.session.accountId = account.id;
	req.session.writer = writer.id;

	res.send(account);

	next();
};