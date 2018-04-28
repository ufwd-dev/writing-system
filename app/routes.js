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
	},
	{
		path: '/writer/signin',
		component: SignIn
	}
];

const router =  new VueRouter({
	routes
});

export default router;