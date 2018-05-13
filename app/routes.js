'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './component/home.vue';

import SignIn from './component/writer/sign-in.vue';

const routes = [
	{
		path: '/',
		component: Home,
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