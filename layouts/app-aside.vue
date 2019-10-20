<template>
    <section class="aside-container">
        <div class="title">
            <div class="logo" />
        </div>
        <div class="content">
            <ul>
                <li v-for="(item,index) in menuList" :key="index" :class="{'active':item.name==activeName}">
                    <div>
                        <i :class="item.icon" />
                        <span>{{item.label}}</span>
                        <i class="arrow" />
                    </div>
                    <!-- <ul>
                        <li v-for="(child,idx) in item.children" :key="idx">
                            <div class="">
                                <span>{{child.label}}</span>
                            </div>
                        </li>
                    </ul> -->
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    data: () => ({
        menuList: [
            { label: "个人信息管理", name: "userinfo", icon: "el-icon-user", children: [{ label: "个人时钟管理", name: "times" }, { label: "个人信息", name: "info" }] },
            { label: "工作管理", name: "work", icon: "el-icon-document-copy" },
            { label: "行政中心", name: "executive", icon: "el-icon-suitcase" },
            { label: "信息中心", name: "infomation", icon: "el-icon-paperclip" },
            { label: "交互中心", name: "interactive", icon: "el-icon-magic-stick" },
            { label: "知识中心", name: "knowledge", icon: "el-icon-connection" },
            { label: "系统管理", name: "system", icon: "el-icon-set-up" }
        ],
        activeName: 'userinfo'
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
			li {
				> div {
					position: relative;
					display: flex;
					align-items: center;
					height: 35px;
					cursor: pointer;
					> i {
						margin-right: 10px;
						&.arrow {
							font-family: element-icons !important;
							position: absolute;
							right: 0;
							color: #ccc;
							color: #969696;
							font-style: normal;
							&:before {
								content: '\e6df';
							}
						}
					}
				}
				> ul {
					margin: 0 0 10px 25px;
					display: none;
				}
				&:hover,
				&.active {
					> div {
						color: $c-main;
						.arrow::before {
							content: '\e6e1';
						}
					}
					> ul {
						display: block;
					}
				}
			}
		}
	}
}
</style>
