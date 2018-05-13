<template>
<router-view></router-view>
</template>

<script>
import axios from 'axios';

const signInPath = '/writer/signin';
const CHECK_INTERVAL = 5 * 60 * 1000;

export default {
	name: 'app',
	methods: {
		updateSession() {
			return axios.get('/api/noop', {
				timeout: 10000
			}).then(res => {
				const {id} = res.data;

				this.$store.commit('updateAccount', id);
				
				return id;
			});
		},
		catchConnectionError(err) {
			//TODO 处理连接错误
			// console.log('连接错误');
			console.log(err);
		}
	},
	mounted() {
		this.watcher = setInterval(() => {
			this.updateSession().catch(this.catchConnectionError);
		}, CHECK_INTERVAL);
		

		this.$router.beforeEach((to, from, next) => {

			this.updateSession().then((id) => {
				const requireAccount =
					to.matched.some(record => record.meta.requireAccount);

				if (id) {
					if (!requireAccount) {
						return next('/');
					}
				} else {
					if (requireAccount) {
						
						return next(signInPath);
					}
				}

				next();
			}, this.catchConnectionError);
		});
	},
	destroyed() {
		clearInterval(this.watcher);
	}
}
</script>

<style lang="less">

</style>
