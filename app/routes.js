'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Create from './component/writer/create.vue';
import Update from './component/writer/update.vue';

import SignIn from './component/writer/sign-in.vue';

const routes = [
	{
		path: '/article',
		component: Create,
		meta: {
			requireAccount: true
		}
	},
	{
		path: '/article/:id',
		component: Update,
		meta: {
			requireAccount: true
		}
	},
	{
		path: '/writer/signin',
		component: SignIn,
		meta: {
			requireAccount: false
		}
	}
];

const router =  new VueRouter({
	routes
});

export default router;