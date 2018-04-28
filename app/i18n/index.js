'use strict';

import Vue from 'vue';
import vueI18n from 'vue-i18n';

Vue.use(vueI18n);

import en from './en.yaml';
import zh from './zh.yaml';

const messages = { en, zh };

export default new vueI18n({
	local: 'en',
	messages
});