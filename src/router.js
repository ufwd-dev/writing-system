'use strict';

const {
	createAxios,
	writerSignin,
	writerSignout,
	createArticle,
	getOwnArticleList,
	getOwnArticle,
	updateOwnArticle,
	deleteOwnArticle,
	createClassification,
	deletelassification,
	getArticleListOfCategory,
	$testBody,
	$testQuery,
	getCategoryList,
	getClassificationList
} = require('express-handler-loader')('ufwd_writer');

const router = module.exports = require('express').Router();

router.use('/api', createAxios);

router.post('/api/account/session', $testBody({
	properties: {
		name: {
			type: 'string'
		},
		password: {
			type: 'string'
		}
	},
	required: ['name', 'password'],
	additionalProperties: false
}), writerSignin);

router.delete('/api/account/session', writerSignout);

router.post('/api/article', $testBody({
	properties: {
		title: {
			type: 'string'
		},
		content: {
			type: 'string'
		},
		abstract: {
			type: 'string'
		},
		thumb: {
			type: 'string'
		},
		published: {
			type: 'boolean'
		}
	},
	required: ['title', 'content', 'published'],
	additionalProperties: false
}), createArticle);

router.get('/api/article', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		published: {
			type: 'string',
			pattern: '^(true|false)$'
		},
		examine: {
			type: 'string',
			pattern: '^(true|false)$'
		}
	},
	additionalProperties: false
}), getOwnArticleList);

router.get('/api/category', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getCategoryList);

router.get('/api/article/:articleId', getOwnArticle);

router.get('/api/article/:articleId/category', getClassificationList);

router.put('/api/article/:articleId', $testBody({
	properties: {
		title: {
			type: 'string'
		},
		content: {
			type: 'string'
		},
		abstract: {
			type: 'string'
		},
		thumb: {
			type: 'string'
		},
		published: {
			type: 'boolean'
		}
	},
	additionalProperties: false
}), updateOwnArticle);

router.delete('/api/article/:articleId', deleteOwnArticle);

router.post('/api/article/:articleId/category/:categoryId', createClassification);

router.get('/api/category/:categoryId/article', getArticleListOfCategory);

router.delete('/api/article/:articleId/category/:categoryId', deletelassification);