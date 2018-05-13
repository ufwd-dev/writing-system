'use strict';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'font-awesome/css/font-awesome.min.css';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

import App from './component/app.vue';

import router from './routes';
import store from './store/index';
import i18n from './i18n/index';

const $app = new Vue(Object.assign({ router, store, i18n }, App));

window.addEventListener('load', () => {
	
	$app.updateSession().then((id) => {
		if (!id) {
			router.push('/writer/signin');
		}

		$app.$mount('#app');
	}, $app.catchConnectionError);

});

export default { router, store, i18n };
