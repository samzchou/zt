<template>
	<section class="userlist-container">
		<div class="forms">
			<div class="left">
				<div class="title">员工列表（根据用户所辖组织机构列出数据；如是超级管理员可列出全部）</div>
			</div>
			<div class="right">
				<search-input :visible.sync="searchShow" :value="searchKey" placeholder="关键字查询" size="mini"
					width="150px" @change="changeKey" />
				<el-button type="text" icon="el-icon-user" @click="addNew" style="margin-left:10px;">新增员工</el-button>
			</div>
		</div>
		<div class="tables">
			<el-table size="mini" v-loading="listLoading" :data="listData.slice((query.page-1)*query.pagesize, query.page*query.size)" stripe border highlight-current-row fit
				max-height="500" style="width: 100%">
				<el-table-column type="index" label="序号" align="center" width="80" />
				<el-table-column prop="username" label="用户账号" width="120" />
				<el-table-column prop="name" label="姓名" width="100" />
				<el-table-column prop="sex" label="性别" width="80">
                    <template slot-scope="scope">
						{{getSexName(scope.row.sex)}}
					</template>
                </el-table-column>
				<el-table-column prop="mobile" label="联系电话" width="150" />
				<el-table-column prop="mail" label="邮箱地址" width="150" />
				<el-table-column prop="org" label="部门">
					<template slot-scope="scope">
						{{getOrgName(scope.row.org)}}
					</template>
				</el-table-column>
				<el-table-column prop="content" label="备注说明" />
				<el-table-column label="操作" fixed="right" align="center" width="130">
					<template slot-scope="scope">
						<el-button type="text" size="mini" icon="el-icon-edit" @click="editItem(scope.row)">编辑
						</el-button>
						<el-button type="text" size="mini" icon="el-icon-remove" @click="removeItem(scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pages">
			<el-pagination size="mini" :total="total" :current-page="query.page" :page-sizes="[20, 30, 50, 100]"
				@size-change="handleSizeChange" @current-change="currentChange"
				layout="total, sizes, prev, pager, next, jumper" />
		</div>

		<el-drawer size="mini" :title="editUser?'编辑员工':'新增员工'" :visible.sync="drawerShow" direction="rtl"
			:before-close="handleClose" append-to-body :wrapperClosable="false">
			<div class="form-content">
				<el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
					<el-form-item label="登录账号" prop="username">
						<el-input v-model="ruleForm.username" clearable autocomplete="off" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="ruleForm.password" type="password" :disabled="!setPasswrod" clearable show-password autocomplete="off" style="width: 145px;" />
                        <el-button v-if="editUser" type="text" icon="el-icon-lock" @click="resetPasswrod">{{setPasswrod?'取消重置':'重置密码'}}</el-button>
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input v-model="ruleForm.name" clearable  style="width: 145px;" />
					</el-form-item>
					<el-form-item label="性别" prop="sex">
						<el-radio v-model="ruleForm.sex" v-for="sex in sexList" :key="sex.id" :label="sex.id">
							{{sex.label}} </el-radio>
					</el-form-item>
					<el-form-item label="出生年月" prop="brithday">
						<el-date-picker v-model="ruleForm.brithday" type="date" placeholder="选择日期" clearable />
					</el-form-item>
					<el-form-item label="联系电话" prop="mobile">
						<el-input v-model="ruleForm.mobile" clearable autocomplete="off" />
					</el-form-item>
					<el-form-item label="邮箱地址" prop="mail">
						<el-input v-model="ruleForm.mail" clearable autocomplete="off" />
					</el-form-item>
					<el-form-item label="所属部门" prop="org">
						<el-select v-model="ruleForm.org" placeholder="请选择部门" clearable>
							<el-option v-for="org in orgList" :key="org.id" :label="org.label" :value="org.id" />
						</el-select>
					</el-form-item>
                    <el-form-item label="备注说明" prop="content">
						<el-input v-model="ruleForm.content" type="textarea" clearable autocomplete="off" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm" :icon="loading?'el-icon-loading':''"
							:disabled="loading">{{editUser?'编辑保存':'立即创建'}}</el-button>
						<el-button @click="resetForm">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-drawer>
	</section>
</template>

<script>
import {
	mapState,
	mapMutations
} from 'vuex';
import searchInput from '~/components/searchInput';
export default {
	computed: {
		...mapState(['orgList', 'sexList']),
	},
	components: {
		searchInput
    },
    watch:{
        /* searchKey(val){
            this.listData = this.sourceData.map(item=>{
                if(item.username.includes(val) || item.name.includes(val) || item.mobile.includes(val) || item.mail.includes(val)){
                    return item;
                }
            })
        } */
    },
	data(){
        /* var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.password !== '') {
                    this.$refs.ruleForm.validateField('password');
                }
                callback();
            }
        }; */
        return {
            searchShow: false,
            searchKey: '',
            listLoading: false,
            sourceData:[],
            listData: [],
            total: 0,
            query: {
                page: 1,
                size: 30
            },
            drawerShow: false,
            editUser: null,
            loading: false,
            setPasswrod:false,
            ruleForm: {
                username: '',
                password: '',
                name: '',
                sex: 1,
                brithday: '',
                mobile: '',
                mail: '',
                org: '',
                content:''
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, message: '长度至少在5个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                brithday: [
                    { required: true, message: '请选择出生年月', trigger: 'change' }
                ],
                org: [
                    { required: true, message: '请选择机构部门', trigger: 'change' }
                ],
            }
        }
    },
	methods: {
        changeKey(val){
            debugger
            this.searchKey = val;
        },
        getOrgName(id){
            let str = "";
            if(id){
                let obj = _.find(this.orgList, {"id":id});
                str = obj.label;
            }
            return str;
        },
        getSexName(id){
            let str = "";
            if(id){
                let obj = _.find(this.sexList, {"id":id});
                str = obj.label;
            }
            return str;
        },
        resetPasswrod(){
            this.setPasswrod = !this.setPasswrod;
            if(this.setPasswrod){
                this.ruleForm.password = "";
            }else{
                this.ruleForm.password = this.editUser.password;
            }

        },
		submitForm() {
			this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					this.loading = true;
					let condition = {
						type: 'addData',
						collectionName: 'user',
						data: { ...this.ruleForm }
					};
					if (this.editUser) {
						condition.type = 'updateData';
						condition.updateDate = true;
						condition.data.id = this.editUser.id;
						if (this.ruleForm.password === this.editUser.password) {
							delete condition.data.password;
						}
					} else {
						condition.data.createDate = new Date().getTime();
					}

					this.$axios.$post('mock/db', { data: condition }).then(result => {
						this.$message.success(this.editUser ? "编辑成功" : "新增成功");
						this.drawerShow = false;
                        this.loading = false;
						this.query.page = 1;
                        this.getList();
					});
				}
			});
		},
		resetForm() {
			this.$refs['ruleForm'].resetFields();
		},
		// 关闭侧滑框
		handleClose() {
            this.editUser = null;
            this.setPasswrod = false;
			this.drawerShow = false;
		},
		addNew() {
            this.setPasswrod = true;
            this.drawerShow = true;
            this.$nextTick(()=>{
                this.$refs['ruleForm'].resetFields();
                this.$refs['ruleForm'].clearValidate();
            })
		},
		editItem(row) {
            this.ruleForm = { ...row };
			this.editUser = row;
            this.setPasswrod = false;
            this.drawerShow = true;
            this.$nextTick(()=>{
                //
                this.$refs['ruleForm'].clearValidate();
            })
		},
		removeItem(row) {
			this.$confirm('确定删除该用户?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let condition = {
					type: 'removeData',
					collectionName: 'user',
					data: { id: row.id }
				};
				this.$axios.$post('mock/db', { data: condition }).then(result => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.getList();
				});
			}).catch(() => { });
		},
		currentChange(page) {
			this.query.page = page;
		},
		handleSizeChange(size) {
			this.query.page = 1;
			this.query.size = size;
		},
		async getList(match = {}) {
			this.listLoading = true;
			let condition = {
				type: 'listData',
				collectionName: 'user',
				data: match
			};

			let result = await this.$axios.$post('mock/db', { data: condition });
			console.log('getList', result);
            this.total = result.total;
            this.sourceData = result.list;
			this.listData = [...result.list];
            this.listLoading = false;
            this.editUser = null;
		},
	},
	mounted() {
		this.getList();
	}
}
</script>

<style lang="scss" scoped>
.userlist-container {
	background-color: #fff;
	border: 1px solid #ddd;
	margin: 15px;
	padding: 25px;
	.forms {
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* padding-bottom: 5px;
		border-bottom: 1px solid #eee;
		margin-bottom: 10px; */
		> div {
			display: flex;
			align-items: center;
		}
	}
	.pages {
		padding: 10px 0;
		display: flex;
		justify-content: flex-end;
	}
}
/deep/ .el-drawer {
	.el-drawer__header {
		margin-bottom: 0;
		padding: 10px 15px;
		border-bottom: 1px solid #ddd;
		> :first-child {
			font-size: 16px;
		}
	}
	.el-drawer__body {
		padding: 20px;
		.form-content {
		}
	}
}
</style>
