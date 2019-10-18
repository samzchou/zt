<template>
	<section class="aside-container">
		<div class="title">
			<!-- <div class="logo" /> -->
		</div>
		<div class="content">
			<ul>
				<!-- <li v-for="item in menuList" :key="item.name" :class="{'active':item.name==activeName}">
					<i :class="item.icon" />
					<span>{{item.label}}</span>
				</li> -->
			</ul>
		</div>
	</section>
</template>

<script>
export default {
	data: () => ({
		menuList: [
			{ label: "个人信息管理", name: "userinfo", icon: "el-icon-user" },
			{ label: "工作管理", name: "work", icon: "el-icon-document-copy" },
			{ label: "行政中心", name: "executive", icon: "el-icon-suitcase" },
			{ label: "信息中心", name: "infomation", icon: "el-icon-paperclip" },
			{ label: "交互中心", name: "interactive", icon: "el-icon-magic-stick" },
			{ label: "知识中心", name: "knowledge", icon: "el-icon-connection" },
			{ label: "系统管理", name: "system", icon: "el-icon-set-up" }
        ],
        activeName:'userinfo'
	})
}
</script>

<style lang="scss" scoped>
.aside-container {
	width: calc(100% - 5px);
	height: 100%;
	background-color: #e5ebf5;

	.title {
		height: 50px;
		box-shadow: 0 1px 4px rgba(18, 72, 90, 0.12);
		border-bottom: 1px solid #d4dee1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #51627f;
		.logo {
			width: 150px;
			height: 35px;
			background-image: url(/images/logo.png);
			background-repeat: no-repeat;
			background-position: 10px 0px;
			background-size: contain;
		}
	}
	.content {
		height: calc(100% - 50px);
		box-sizing: border-box;
		padding: 15px;
		> ul {
			padding: 0;
			margin: 0;
			> li {
				display: flex;
                align-items: center;
                height: 35px;
                cursor: pointer;
				&:hover,
				&.active {
					color: $c-main;
                }
                >i{
                    margin-right:10px;
                }
			}
		}
	}
}
</style>
