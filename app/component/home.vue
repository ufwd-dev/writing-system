<template>
<<<<<<< HEAD
<div>hello world</div>
=======
<el-container>
	<el-header>
		<el-menu mode="horizontal" class="clearfix">
			<li class="el-menu-item" style="color: #303133;">统战APP内容管理平台</li>
			<router-link index="1"
				tag="li"
				class="el-menu-item"
				:to="{
					name: 'list',
					params: { name: 'article'}
				}">我的文章</router-link>
			<router-link index="2"
				tag="li"
				class="el-menu-item"
				:to="{
					name: 'list',
					params: { name: 'draft'}
				}">我的草稿</router-link>
			<el-submenu index="3">
				<template slot="title">分类列表</template>
				<router-link index="3-1"
					tag="li"
					class="el-menu-item"
					v-for="(category, index) in categoryList"
					:key="index"
					:to="{
						name: 'list',
						params: { name: category.name}
					}">分类1</router-link>
			</el-submenu>
			<el-submenu index="4"
				style="float: right;">
				<template slot="title">
					<i class="fa fa-user"
						style="vertical-align: baseline;"></i> 我的账户</template>
					<el-menu-item index="4-1">账户名：</el-menu-item>
					<el-menu-item index="4-2">频道：</el-menu-item>
					<el-menu-item index="4-3" @click="signOut()" divided>退出登录</el-menu-item>
				</el-submenu>
			<router-link index="5"
				tag="li"
				class="el-menu-item"
				style="float: right;"
				to="/create"><i class="fa fa-pencil-square-o"
					style="vertical-align: baseline;"></i> 写文章</router-link>
			
		</el-menu>
	</el-header>

	<el-main>
		<router-view></router-view>
	</el-main>

</el-container>
<!-- <el-row type="flex" justify="center">
	<el-col :span="12">
		<div>hello world</div>
		<router-link :to="{
			name: 'list',
			params: { name: hah}}">list</router-link>
	</el-col>
</el-row> -->
>>>>>>> 7187e66... [ADDED] components
</template>

<script>
import axios from 'axios';

export default {
<<<<<<< HEAD
	name: 'home'
=======
	name: 'home',
	data() {
		return {
			categoryList: []
		}
	},
	methods: {
		getCategoryList() {
			return axios.get('/api/category').then(res => {
				this.categoryList = res.data.data;
			})
		},
		signOut() {
			this.$store.dispatch('writer/signOut').then(() => {
				this.$router.push('/writer/signin');
			})
		}
	},
	mounted() {
		this.getCategoryList();
	}
>>>>>>> 7187e66... [ADDED] components
}
</script>

<style>

</style>
