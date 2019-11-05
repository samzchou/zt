<template>
    <section class="collection-container">
        <div class="title">
            <div>系统数据表（待完善，缺失：创建表后复写数据库的集合实例）</div>
        </div>
        <div class="content" :class="{'editing':editing}">
            <div class="left">
                <div class="title" style="border:0">
                    <div>数据表</div>
                    <div>
                        <el-button v-if="!editing" type="text" icon="el-icon-plus" @click="addNew">新增</el-button>
                    </div>
                </div>
                <el-table size="mini" :data="listData" fit stripe border style="width:100%" max-height="500">
                    <el-table-column prop="name" label="表名" />
                    <el-table-column prop="label" label="标签名称" />
                    <el-table-column prop="standard" label="系统标准表" align="center" width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.standard?'是':'否'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="count" label="数据记录" />
                    <el-table-column label="操作" width="80" align="center">
                        <template slot-scope="scope">
                            <el-button class="icon-link" icon="el-icon-edit" @click="edit(scope.row)" title="编辑" />
                            <el-button class="icon-link" icon="el-icon-delete" @click="remove(scope.row)" title="删除" />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="right">
                <div class="title">{{editRow?'编辑':'新增'}}数据表</div>
                <div class="forms">
                    <el-form size="mini" label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item label="表名称" prop="name">
                                    <el-input v-model="ruleForm.name" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="标签名称" prop="label">
                                    <el-input v-model="ruleForm.label" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="系统标准表" prop="standard">
                                    <el-switch v-model="ruleForm.standard" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">立即创建</el-button>
                            <el-button @click="editing=false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
const checkName = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入表名称'));
    } else if (!new RegExp("^[a-zA-Z0-9]+$").test(value)) {
        callback(new Error('表名称必须为英文或拼音字母与数字'))
    } else {
        callback();
    }
};
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
        editing: false,
        editRow: null,

        rules: {
            name: [
                { required: true, validator: checkName, trigger: 'blur' }
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
            lineWrapping: true
        },
    }),
    methods: {
        addNew() {
            this.edit();
        },
        edit(row) {
            this.editing = true;
            this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields();
                this.$refs['ruleForm'].clearValidate();
                if (row) {
                    this.editRow = row;
                    this.ruleForm = { ...row };
                }
            })

        },
        remove(row) {
            this.$confirm('确定删除该数据表?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => { });
        },
        submitForm() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let condition = {
                        type: 'addData',
                        collectionName: "colls",
                        data: { ...this.ruleForm }
                    };
                    if (this.ruleForm.id) {
                        condition.type = "updateData";
                    }
                    console.log('condition', condition);
                    this.$axios.$post('mock/db', { data: condition }).then(res => {
                        console.log('submitForm', res);
                        if (condition.type == "updateData") { // 更新数据
                            let index = _.findIndex(this.listData, { "id": this.ruleForm.id });
                            let item = _.merge(this.listData[index], this.ruleForm);
                            this.$set(this.listData, index, item);
                        } else {
                            this.listData.push(res);
                        }
                        this.editing = false;
                        this.editRow = null;
                    });
                }
            });
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
                collectionName: 'colls',
                sortby: 'id'
            };
            let res = await this.$axios.$post('mock/db', { data: condition });
            this.listData = res.list;
            res.list.forEach((item, i) => {
                this.getlistCount(item.name, i);
            });
            console.log('this.listData', this.listData);
        },
        async createCollection() {
            let condition = {
                type: 'createCollection',
                name: 'test33'
            };
            let res = await this.$axios.$post('mock/db', { data: condition });
            console.log(res)
        },

        async testCollection() {
            let condition = {
                type: 'openFile',
                name: 'test33'
            };
            let res = await this.$axios.$post('mock/files', { data: condition });
            console.log(res)
        },

    },
    mounted() {
        this.listCollection();

        this.testCollection();
    },
    layout: 'admin'
}
</script>

<style lang="scss" scoped>
.collection-container {
    height: 100%;
    > div.title {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 20px;
        border-bottom: 1px solid #ddd;
    }
    > div.content {
        display: flex;
        height: calc(100% - 40px);
        box-sizing: border-box;
        padding: 20px;
        &.editing {
            .left {
                width: 65%;
            }
            .right {
                width: 35%;
                display: block;
            }
        }
        > div {
            box-sizing: border-box;
            padding: 10px;
            transition: all 0.3s;
            &.left {
                width: 100%;
                border: 1px solid #ddd;
                background-color: #fff;
                box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.15);
            }
            &.right {
                width: 0;
                display: none;
                padding: 0 20px;
                border-left: 1px solid #ddd;
                .title {
                    line-height: 40px;
                }
                .forms {
                    //background-color: #fff;
                    padding: 20px;
                    //border: 1px solid #ddd;
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
                line-height: 30px;
                border-bottom: 1px solid #ddd;
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
}
</style>
