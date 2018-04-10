'use strict';

const {
	writerSignin,
	writerSignout,
	isWriterSignedIn,
	createArtical,
	getOwnArticalList,
	getOwnArtical,
	updateOwnArtical,
	deleteOwnArtical,
	isPublished,
	createClassification,
	deletelassification,
	$testBody,
	$testQuery
} = require('express-handler-loader')('ufwd_writer');

const router = module.exports = require('express').Router();

router.post('/api/ufwd/writer/account/session', writerSignin);

router.delete('/api/ufwd/writer/account/session', writerSignout);

router.post('/api/ufwd/writer/artical', $testBody({
	properties: {
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
			type: 'string',
			pattern: '^(true|false)$'
		}
	},
	required: ['content', 'published'],
	additionalProperties: false
}), isWriterSignedIn, createArtical);

router.get('/api/ufwd/writer/artical', $testQuery({
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
}), isWriterSignedIn, getOwnArticalList);

router.get('/api/ufwd/writer/artical/:articalId', isWriterSignedIn, getOwnArtical);

router.put('/api/ufwd/writer/artical/:articalId', $testBody({
	properties: {
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
			type: 'string',
			pattern: '^(true|false)$'
		}
	},
	additionalProperties: false
}), isWriterSignedIn, isPublished, updateOwnArtical);

router.delete('/api/ufwd/writer/artical/:articalId', isWriterSignedIn, isPublished, deleteOwnArtical);

router.post('/api/ufwd/writer/artical/:articalId/category/:categoryId', isWriterSignedIn, createClassification);

router.delete('/api/ufwd/writer/artical/:articalId/category/:categoryId', isWriterSignedIn, deletelassification);