<template>
	<div style="margin-top: 7rem;">
		<b-row class="justify-content-md-center" style="margin: 0">
			<b-col  col lg="3" >
				<b-card
					header="Primary"
					class="text-center">
					<div slot="header">
						<span>登录</span>
					</div>
					<b-form ref="options"
						class="text-left"
						@submit="signIn">
						 <b-form-group
							label="用户名:"
							label-for="username">
							<b-form-input
								type="text"
								v-model="options.name"
								required
								placeholder="请输入用户名">
							</b-form-input>
						</b-form-group>
						<b-link href="#" style="float: right;" >忘记密码？</b-link>
						<b-form-group
							label="密码:"
							label-for="password">
							<b-form-input
								type="text"
								v-model="options.password"
								required
								placeholder="输入密码">
							</b-form-input>
						</b-form-group>
						<div style="float: right;">
							<b-button  type="submit" pressed.sync=false variant="outline-primary">
								提交
							</b-button>
						</div>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	name: 'sign-in',
	data() {
		return {
			options: {
				name: '',
				password: ''
			}
		}
	},
	methods: {
		signIn (evt) {
			evt.preventDefault();
			  
      		this.$store.dispatch('signIn', this.options).then(() => {
				this.$router.push({ path: '/' });
			});
		}
	}
}
</script>

<style>

</style>
