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
				const {id} = data;

				commit('updateAccount', id);
			});
		},
		signOut({ commit }) {
			return axios.delete('/api/account/session').then(() => {
				commit('updateAccount');
			}).catch((err) => {
				console.log(err.message);
			});
		}
	},
	mutations: {
		updateAccount(state, id = null) {
			state.id = id;
			state.signedIn = Boolean(id);
		}
	}
});

export default store;