<template>
<<<<<<< HEAD
<div>sign in</div>
=======
<div style="margin-top: 7rem;">
	<el-row justify="center" type="flex">
		<el-col :xs="18" :sm="16" :md="12" :lg="8" :xl="6">
			<el-card class="box-card">
				<div slot="header">
					<span>登录</span>
				</div>
				<el-form ref="options"
					@submit.native.prevent="signIn()"
					@validate="commitForm()"
					label-position="top"
					:model="options"
					:rules="optionsRule">
					<el-form-item label="用户名"
						prop="name">
						<el-input v-model="options.name"
							type="text"></el-input>
					</el-form-item>
					<div class="clearfix">
						<el-button style="float: right;"
							type="text">忘记密码？</el-button>
						<el-form-item label="密码"
							prop="password">
							<el-input v-model="options.password"
								type="password"></el-input>
						</el-form-item>
					</div>
					<el-form-item>
						<el-button type="primary"
							native-type="submit">确认</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</el-col>
	</el-row>
</div>
>>>>>>> 7187e66... [ADDED] components
</template>

<script>
export default {
<<<<<<< HEAD
	name: 'sign-in'
=======
	name: 'sign-in',
	data() {
		return {
			options: {
				name: '',
				password: ''
			},
			optionsRule: {
				name: [
					{
						required: true,
						message: '请输入您的用户名',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 16,
						message: '用户名长度需在3到16个字符之间',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码'
					}
				]
			}
		}
	},
	methods: {
		signIn() {
			this.$refs.options.validate((valid) => {
				if (valid) {
					this.$store.dispatch('writer/signIn', this.options).then(() => {
						this.$router.push({ path: '/home' });
					});
				} else {
					return false;
				}
			});
		},
		commitForm() {
			return this.passed = true;
		}
	}
>>>>>>> 7187e66... [ADDED] components
}
</script>

<style>

</style>
