'use strict';

import Vue from 'vue';

import App from './component/app.vue';

import router from './routes';
import store from './store/index';
import i18n from './i18n/index';

const $app = new Vue(Object.assign({ router, store, i18n }, App));

window.addEventListener('load', () => {
	$app.$mount('#app');

});

export default { router, store, i18n };
