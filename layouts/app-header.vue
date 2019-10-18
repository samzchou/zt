<template>
	<section class="header-container">
		<div class="left">
			<i :class="sidebar.opened?'el-icon-s-fold':'el-icon-s-unfold'" :title="sidebar.opened?'收起导航':'展开导航'"
				@click="TOGGLE_SIDEBAR" />
			<span>个人时钟管理</span>

		</div>
		<div class="right">
			<i class="avatar" style="background-image:url('/images/head_male.jpg')" />
			<span>张三，您好！</span>
			<el-button type="text" icon="el-icon-switch-button" @click="logout">注销退出</el-button>
		</div>
	</section>
</template>

<script>
import {
	mapState, mapMutations
} from 'vuex';
export default {
	computed: {
		...mapState(['sidebar']),
	},
	methods: {
		...mapMutations(['TOGGLE_SIDEBAR','UPDATE_USER']),
		logout() {
			this.$confirm('确定注销退出?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
                debugger
				this.UPDATE_USER(null);
                this.$cookies.set('token','');
                this.$router.push('/login');
			}).catch(() => {});

		}
	}
}
</script>

<style lang="scss" scoped>
.header-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	.left {
		display: flex;
		align-items: center;
		> i {
			font-size: 24px;
			color: #51627f;
			cursor: pointer;
			margin-right: 15px;
		}
		> span {
			font-size: 16px;
		}
	}
	.right {
		display: flex;
		align-items: center;
		.avatar {
			width: 30px;
			height: 30px;
			background-repeat: no-repeat;
			background-position: center;
			border-radius: 50%;
			background-size: cover;
			margin-right: 10px;
		}
	}
}
</style>
