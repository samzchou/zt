<template>
    <section class="collection-container">
        <div class="left">
            <el-scrollbar class="scrollbar">
                <div class="title">
                    <div>数据表</div>
                    <div>
                        <el-button type="text" icon="el-icon-plus" @click="addNew">新增</el-button>
                    </div>
                </div>
                <el-table size="mini" :data="listData" fit stripe style="width:100%">
                    <el-table-column prop="name" label="表名" />
                    <el-table-column prop="label" label="标签名称" />
                    <el-table-column prop="count" label="数据记录" />
                    <el-table-column label="操作" width="70" align="center">
                        <template slot-scope="scope">
                            <el-button class="icon-link" icon="el-icon-edit" @click="edit(scope.row)" title="编辑" />
                            <el-button class="icon-link" icon="el-icon-delete" @click="remove(scope.row)" title="删除" />
                        </template>
                    </el-table-column>
                </el-table>
            </el-scrollbar>
        </div>
        <div class="right">
            <el-scrollbar class="scrollbar">
                <div class="title">{{editRow?'编辑':'新增'}}数据表</div>
                <div class="forms">

                    <el-form size="mini" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-form-item label="表名称" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="表名称" prop="name">
                                    <el-input v-model="ruleForm.label"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="是否系统表" prop="standard">
                                    <el-switch v-model="ruleForm.standard" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <client-only>
                                    <codemirror ref="code" :value="ruleForm.content" :options="codeOptions" />
                                </client-only>
                            </el-col>
                        </el-row>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-scrollbar>
        </div>
    </section>
</template>
<script>

export default {
    data: () => ({
        listData: [],
        listCount: [],
        ruleForm: {
            name: '',
            label: '',
            standard: false,
            content: ''
        },
        editRow: null,
        rules: {
            name: [
                { required: true, message: '请输入表名称', trigger: 'blur' }
            ],
            label: [
                { required: true, message: '请输入标签名称', trigger: 'blur' }
            ]
        },
        codeOptions: {
            mode: { name: "javascript", json: true },
            tabSize: 4,
            indentUnit: 4,
            lineNumbers: true,
            line: true,
            //readonly:true,
            lineWrapping: true
        },
    }),
    methods: {
        addNew() {

        },
        edit(row) {
            this.editRow = row;
            this.ruleForm = { ...row };
        },
        remove(row) {

        },
        async getlistCount(name, index) {
            let condition = {
                type: 'countData',
                collectionName: name
            };
            let res = await this.$axios.$post('mock/db', { data: condition });
            let item = { ...this.listData[index] };
            item.count = res;
            this.$set(this.listData, index, item);

        },
        async listCollection() {
            let condition = {
                type: 'listData',
                collectionName: 'colls'
            };

            let res = await this.$axios.$post('mock/db', { data: condition });
            this.listData = res.list;
            res.list.forEach((item, i) => {
                this.getlistCount(item.name, i);
            });
            console.log('this.listData', this.listData);
        },
        async createCollection() {
            /* var schema = {
                group: { type: String },
                location: { type: String },
                depotid: { type: String },
                prince: { type: Number },
                volume: { type: Number },
                img: { type: String },
                isvacant: { type: Boolean }
            }; */
            let condition = {
                type: 'createCollection',
                name: 'test33'
            };
            let res = await this.$axios.$post('mock/db', { data: condition });
            console.log(res)
        }
    },
    mounted() {
        this.listCollection();
    },
    layout: 'admin'
}
</script>

<style lang="scss" scoped>
.collection-container {
	display: flex;
	height: 100%;
	> div {
		width: 40%;
		box-sizing: border-box;
		padding: 10px;
		&.right {
			width: 60%;
			padding: 10px 20px;
			border-left: 1px solid #ddd;
			.title {
				line-height: 40px;
			}
			.forms {
				background-color: #fff;
				padding: 20px;
				border: 1px solid #ddd;

				/deep/ .vue-codemirror {
					width: 100%;
					height: 200px;
					box-sizing: border-box;
					overflow: auto;
					.CodeMirror {
						height: auto;
						border: 1px solid #eee;
					}
				}
			}
		}
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.scrollbar {
			height: 100%;
			/deep/ .el-scrollbar__wrap {
				overflow-x: hidden;
				//margin-right:0 !important;
				.el-menu--collapse {
					width: auto;
				}
			}
		}
	}
}
</style>
