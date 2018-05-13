'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		signedIn: false,
		accountId: null,
	},
	actions: {
		signIn({ commit }, { name, password }) {
			return axios.post('/api/account/session', {
				name, password
			}).then(({data}) => {
				const {token} = data;

				commit('updateAccount', token);
			});
		},
		signOut({ commit }) {
			return axios.delete('/api/account/session').then(() => {
				commit('updateAccount');
			});
		}
	},
	mutations: {
		updateAccount(state, token = null) {
			state.token = token;
			state.signedIn = Boolean(token);
		}
	}
});

export default store;