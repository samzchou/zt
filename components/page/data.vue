<template>
    <section class="sam-page">
        <div class="header">
            <div class="title"><i class="el-icon-price-tag" />{{formData.title}}</div>
            <div v-if="!isAdd">
                <el-button class="icon-link" icon="el-icon-plus" @click="addNewList">新增</el-button>
                <el-button class="icon-link" icon="el-icon-finished" @click="filterVisible=!filterVisible" v-if="formData.filter">筛选</el-button>
            </div>
            <div v-else>
                <el-button class="icon-link" icon="el-icon-back" @click="backList">返回列表</el-button>
            </div>
        </div>
        <!--表单-->
        <div class="forms" v-if="isAdd">
            <sam-form ref="samform" :data="formData.content" :isEdit="false" v-model="formValue" />
            <div class="btns">
                <el-button size="small" type="primary" @click="submitForms(true)" :disabled="submitLoading" :icon="submitLoading?'el-loading':''">提交保存</el-button>
                <el-button size="small" @click="submitForms(false)">重置表单</el-button>
            </div>
        </div>
        <div v-else class="table-container">
            <!--筛选-->
            <div class="filter" v-if="filterVisible">
                <sam-form ref="filterform" :data="filterForm" :isEdit="false" v-model="filterValue" :isFilter="true" />
                <div class="btns">
                    <el-button size="mini" type="primary" @click="searchSubmit">搜索</el-button>
                    <el-button size="mini" @click="searchReset">重置</el-button>
                </div>
                <!--  <div v-else class="empty">请选择过滤项目</div> -->
            </div>
            <div class="tables" v-if="tableData.length && formData.content && formData.content.itemList">
                <el-table size="mini" :data="tableData" border max-height="500" :row-key="isTree?'id':''" :tree-props="treeProps" style="width:100%">
                    <el-table-column type="index" label="序号" fixed="left" align="center" width="50">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(query.page - 1) * query.size + 1}}</span>
                        </template>
                    </el-table-column>
                    <template v-for="field in formData.content.itemList.filter(o=>{return !o.tableHide})">
                        <el-table-column :label="field.label" :key="field.name" v-if="!field.hideTable">
                            <template slot-scope="scope">
                                <span>{{getStr(scope.row, field.name)}}</span>
                            </template>
                        </el-table-column>
                    </template>
                    <el-table-column v-if="isTree" label="下属单元合计">
                        <template slot-scope="scope">
                            <span>{{scope.row.children && scope.row.children.length}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" width="140">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" icon="el-icon-edit" @click="addNewList(scope.row)">编辑</el-button>
                            <el-button type="text" size="mini" icon="el-icon-delete" @click="removeItem(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pages">
                    <el-pagination size="mini" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.query.page" :page-sizes="[20, 50, 100, 200]" :page-size="this.query.size" layout="total, sizes, prev, pager, next, jumper" :total="this.query.total" />
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import { mapState } from 'vuex';
import samForm from '~/components/form';
import dataUtil from '~/util/data_util';
import dataOptions from '~/config/options';
export default {
    components: {
        samForm
    },
    computed: {
        ...mapState(['checkArr']),
    },
    props: {
        data: {
            type: Object,
            required: true
        },
        listParam: {
            type: Object,
            default: {}
        },
        hasPassword: {
            type: String,
            default: undefined
        },
        isTree: {
            type: Object,
            default: null
        },
    },
    watch: {
        data: {
            handler(obj) {
                this.formData = _.cloneDeep(obj);
                this.setData();
            },
            immediate: true
        }
    },
    data: () => ({
        collectionName: "",
        isAdd: false,
        filterVisible: false,
        filterValue: {},
        filterForm: {
            "position": "top",
            "gutter": 20,
            "colspan": 4,
            "size": "small",
            "itemList": []
        },
        formValue: {},
        formData: {},
        submitLoading: false,
        loading: false,
        tableData: [],
        treeProps: { children: 'children', hasChildren: 'hasChildren' },
        query: {
            page: 1,
            size: 50,
            total: 0
        },
        editRow: {},
        passwordValue: '',
    }),
    methods: {
        addNewList(row = {}) {
            this.isAdd = true;
            this.filterVisible = false;
            this.formValue = {};
            this.editRow = _.cloneDeep(row);
            if (!_.isEmpty(row)) {
                this.passwordValue = (this.hasPassword && row[this.hasPassword]) ? row[this.hasPassword] : '';
                if (this.formData.content.itemList && this.formData.content.itemList.length) {
                    this.formData.content.itemList.forEach(item => {
                        let key = item.key;
                        this.formValue[key] = row[item.name] || '';
                    });
                }
            }
        },
        backList(flag) {
            this.isAdd = false;
            this.editRow = null;
            if (flag) {
                this.query.page = 1;
                this.searchSubmit();
            }
        },
        submitForms(flag) {
            let isValidate = true;
            let refForm = this.$refs['samform'];
            if (flag) {
                isValidate = refForm.checkFormValidate();
                if (!isValidate) {
                    this.$message.error('表单数据的验证有误，请核查！');
                    return;
                }
            } else {
                refForm.resetForm();
                return;
            }
            this.submitData();
        },

        submitData() {
            let data = {}, submitType = 'addData';
            this.formData.content.itemList.forEach(item => {
                let key = item.name;
                let value = dataUtil.checkValue(item.type, this.formValue[item.key]);
                data[key] = value;
            });
            let dff = this.$global.difference(data, this.editRow);

            if (!_.isEmpty(this.editRow)) {
                submitType = "updateData";
                dff.id = this.editRow.id;
            }
            let condition = {
                "collectionName": this.collectionName,
                "type": submitType,
                "data": dff
            };
            //console.log('condition', condition);
            this.$axios.$post('mock/db', { data: condition }).then(result => {
                console.log('result', result);
                this.$message("数据已提交保存");
                if (submitType == 'updateData') {
                    this.backList(true);
                } else {
                    this.$refs['samform'].resetForm();
                }
            });
        },
        setData() {
            let valueObj = {}, filterObj = {}, itemList = [];
            if (this.formData.content.itemList && this.formData.content.itemList.length) {
                this.formData.content.itemList.map(item => {
                    if (!this.collectionName) {
                        this.collectionName = item.table;
                    }
                    valueObj[item.key] = item.value || "";
                    // 如果有筛选条件
                    if (this.formData.filterFields && this.formData.filterFields.length && this.formData.filterFields.includes(item.name)) {
                        item.isFilter = true;
                        filterObj[item.key] = item.value;
                        itemList.push(item);
                    }
                });
                this.formValue = { ...valueObj };
                // 如果有筛选条件则创建form表单
                this.filterForm.itemList = [...itemList];
                this.filterValue = { ...filterObj };
                console.log('this.filterForm', this.filterForm);
                this.getList();
            }
        },

        searchSubmit() {
            this.filterParams = {};
            this.filterForm.itemList.forEach(item => {
                let key = item.name;
                let value = dataUtil.checkValue(item.type, this.filterValue[item.key]);
                if (value) {
                    value = dataUtil.getSearchParams(item, value);
                    if (value) {
                        this.filterParams[key] = value;
                    }
                }
            });
            this.getList();
        },
        searchReset() {
            this.$refs.filterform.resetForm();
        },
        handleSizeChange(size) {
            this.query.size = size;
            this.query.page = 1;
        },
        handleCurrentChange(page) {
            this.query.page = page;
            this.searchSubmit();
        },
        async getItemData(item){
            let collData = [];
            let conditon = {
                type: 'listData',
                collectionName: item.optionsUrl.table,
                data: item.optionsUrl.params || {}
            }
            let res = await this.$axios.$post('mock/db', { data: conditon });
            
            if(item.component == 'sam-cascader'){
                let lists =  res.list.map(obj => {
                    return {
                        id: item.id,
                        pid: item.optionsUrl.pid?obj[item.optionsUrl.pid]:obj.pid,
                        value: obj[item.optionsUrl.value],
                        label: obj[item.optionsUrl.label]
                    }
                });
                collData = this.$global.toTree(lists);
            }
            return collData;
        },
        // 设置显示值
        getStr(row, field) {
            if (!this.tableData.length) {
                return "";
            }
            let str = row[field];
            let collectionData = this.$store.state.collectionData;
            let item = _.find(this.formData.content.itemList, { "name": field });
            if (item.options || item.optionsUrl) {
                if (item.optionsUrl) {
                    let collData = collectionData[item.optionsUrl.table];
                    // 如果是级联
                    if (item.component == 'sam-cascader') {
                        if(!collData){
                            cader = this.getItemData(item);
                        }
						
                        let nodeStr = dataUtil.getStrByArray(collData, !_.isArray(str)?[str]:str, '/', { 'label': item.optionsUrl.label });
                        if (nodeStr) {
                            str = nodeStr;
                        }
                    } else {
                        if (collData && collData.length) {
                            if (_.isNumber(str)) {
                                let data = _.find(collData, { "id": Number(str) });
                                let key = item.optionsUrl.label;
                                str = data ? data[key] : '';
                            } else if (_.isArray(str)) {
                                let dd = [];
                                str = dd.join(",");
                            }
                        }
                    }
                } else {
                    let op = _.find(item.options, { "value": str });
                    str = op.label;
                }
            } else if (item.component == 'sam-date') {
                str = moment(str).format(item.format || 'YYYY-MM-DD');
            } else if (item.component == 'sam-cascader' && item.optionsConst) {
                let nodeStr = dataUtil.getTreeNode(dataOptions[item.optionsConst], [...str], '/');
                if (nodeStr) {
                    str = nodeStr;
                }
            }
            return str;
        },
        removeItem(row) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let condition = {
                    type: 'removeData',
                    collectionName: this.collectionName,
                    data: { id: row.id }
                };
                this.$axios.$post('mock/db', { data: condition }).then(res => {
                    this.$message.info('删除成功!');
                    this.getList();
                });
            }).catch(() => { });
        },
        async getList(match = {}) {
            this.loading = true;
            match = Object.assign({}, this.filterParams, match, this.listParam);
            if (this.collectionName == 'employee') {
                //match = Object.assign({}, match, { 'username': { '$ne': 'admin' } });
            }
            // 通用列表查询
            let condition = {
                type: 'listData',
                collectionName: this.collectionName,
                data: match,
                page: this.query.page,
                pagesize: this.query.size
            };
            let result = await this.$axios.$post('mock/db', { data: condition });
            //console.log('getList', result);
            this.query.total = result.total;
            this.tableData = result.list.map(item => {
                delete item.employee, delete item.__v, delete item._id;
                return item;
            });
            if (this.isTree) {
                this.tableData = this.$global.toTree([...this.tableData], { parentKey: this.isTree.parentKey });
            }

            setTimeout(() => {
                this.loading = false;
            }, 500)
        }
    },

    mounted() {
        //this.setData();
    },
    layout: 'admin'
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/admin-form';
</style>