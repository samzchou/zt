<template>
    <section class="page-enginer">
        <div class="title">
            <div>{{formData && formData.title}}</div>
            <div v-if="formData.showType && !isAdd">
                <el-button class="icon-link" icon="el-icon-plus" @click="addNewList">新增</el-button>
                <el-button class="icon-link" icon="el-icon-finished" @click="filterVisible=!filterVisible" v-if="formData.filter">筛选</el-button>
            </div>
            <div v-else>
                <el-button class="icon-link" icon="el-icon-back" @click="backList">返回列表</el-button>
            </div>
        </div>
        <div v-if="formData.content.itemList&&formData.content.itemList.length">
            <!--表单-->
            <div class="form-container" v-if="!formData.showType || isAdd">
                <sam-form ref="samform" :data="formData.content" :isEdit="false" v-model="formValue" />
                <div class="btns">
                    <el-button size="small" type="primary" @click="submitForms(true)">{{!isRelease?'提交表单测试':'提交保存'}}</el-button>
                    <el-button size="small" @click="submitForms(false)">重置表单</el-button>
                </div>
            </div>
            <!--列表-->
            <div v-else class="table-container">
                <div v-if="filterVisible && formData.filter" class="filter">
                    <sam-form ref="filterform" :data="filterForm" :isEdit="false" v-model="filterValue" />
                    <div class="btns">
                        <el-button size="mini" type="primary" @click="searchSubmit">搜索</el-button>
                        <el-button size="mini" @click="searchReset">重置</el-button>
                    </div>
                </div>
                <div class="tables">
                    <el-table size="mini" :data="tableData" border max-height="500" style="width:100%">
                        <el-table-column type="index" label="序号" fixed align="center" width="50">
                            <template slot-scope="scope">
                                <span>{{scope.$index+(query.page - 1) * query.size + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="field in formData.content.itemList" :key="field.name" :label="field.label">
                            <template slot-scope="scope">
                                <span>{{scope.row[field.name]}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages">
                        <el-pagination size="mini" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.query.page" :page-sizes="[20, 50, 100, 200]" :page-size="this.query.size" layout="total, sizes, prev, pager, next, jumper" :total="this.query.total" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import samForm from '~/components/form';
export default {
    name: "sam-page",
    components: {
        samForm
    },
    props: {
        data: {
            type: Object,
            default: {}
        },
        isRelease: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        data: {
            handler(obj) {
                this.formData = Object.assign({}, { ...obj });
                this.resetConst();
            },
            immediate: true
        }
    },
    data: () => ({
        formData: null,
        formValue: {},
        filterVisible: false,
        filterForm: {
            "position": "top",
            "gutter": 20,
            "colspan": 4,
            "size": "mini",
            "itemList": []
        },
        collectionName: undefined,
        filterValue: {},
        filterParams: {},
        tableData: [],
        isAdd: false,
        query: {
            page: 1,
            size: 20,
            total: 0
        }
    }),
    methods: {
        resetConst() {
            this.collectionName = undefined;
            this.tableData = [];
            this.query = {
                page: 1,
                size: 20,
                total: 0
            };
            this.setData();
        },
        addNewList() {
            this.isAdd = true;
        },
        // 返回列表后重新查询数据
        backList() {
            this.isAdd = false;
            this.query = {
                page: 1,
                size: 20,
                total: 0
            }
            this.getLists();
        },
        // 
        getStr(row, field) {
            console.log('field', field)
            let str = row[field];
            let item = _.find(this.formData.content.itemList, { "name": field });
            console.log('getStr', item, row)

            return str;
        },
        handleSizeChange(size) {
            this.query.size = size;
            this.query.page = 1;
        },
        handleCurrentChange(page) {
            this.query.page = page;
            this.searchSubmit();
        },
        // 提交筛选查询（涉及到时间范围、模糊查询等，，，需优化）
        searchSubmit() {
            this.filterParams = {};
            this.filterForm.itemList.forEach(item => {
                let key = item.name;
                let value = this.checkValue(item.type, this.filterValue[item.key]);
                if (value) {
                    this.filterParams[key] = value;
                }
            });
            console.log('searchSubmit', this.filterParams);
            this.getLists();
        },
        searchReset() {
            this.$refs.filterform.resetForm();
        },
        async getLists(params = {}) {
            //debugger
            params = Object.assign({}, this.filterParams, params);
            let condition = {
                type: 'aggregate',
                collectionName: this.collectionName,
                data: params,
                aggregate: [
                    { "$match": params },
                    { "$sort": { id: 1 } },
                    { "$skip": (this.query.page - 1) * this.query.size },
                    { "$limit": this.query.size }
                ]
            };
            //console.log('condition', condition)
            let result = await this.$axios.$post('mock/db', { data: condition });
            //console.log('getList', result);
            this.query.total = result.total;
            this.tableData = result.list;
        },
        setData() {
            let valueObj = {}, filterObj = {}, itemList = [];
            if (this.formData && this.formData.content && this.formData.content.itemList) {
                this.formData.content.itemList.map(item => {
                    if (!this.collectionName) {
                        this.collectionName = item.table;
                    }
                    valueObj[item.key] = item.value;
                    // 如果有筛选条件
                    if (this.formData.filter && this.formData.filterFields.length && this.formData.filterFields.includes(item.name)) {
                        item.isFilter = true;
                        filterObj[item.key] = item.value;
                        itemList.push(item);
                    }
                });
            }
            this.formValue = { ...valueObj };
            // 如果有筛选条件则创建form表单
            this.filterForm.itemList = [...itemList];
            this.filterValue = { ...filterObj };

            // 如果是报表形式
            if (this.formData.showType) {
                this.getLists();
            }
        },

        // 表单提交
        submitForms(flag) {
            let isValidate = true;
            let refForm = this.$refs['samform'];
            if (flag) {
                isValidate = refForm.checkFormValidate();
                if (!isValidate) {
                    this.$message.error(!this.isRelease ? '表单测试不通过！' : '表单数据的验证有误，请核查！');
                }
            } else {
                refForm.resetForm();
                return;
            }
            // 如果通过验证
            if (isValidate && this.isRelease) {
                this.submitData();
            }
        },
        submitData() {
            let data = {};
            this.formData.content.itemList.forEach(item => {
                let key = item.name;
                let value = this.checkValue(item.type, this.formValue[item.key]);
                data[key] = value;
            });
            let condition = {
                type: 'addData',
                collectionName: this.collectionName,
                data: data
            };
            this.$axios.$post('mock/db', { data: condition }).then(result => {
                console.log('result', result);
                this.$message.success("数据已提交保存");
                this.$refs['samform'].resetForm();
            });

        },
        checkValue(type, value) {
            switch (type) {
                case "Number":
                    return Number(value);
                default:
                    return value;
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.page-enginer {
    margin: 20px;
    border: 1px solid #eee;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.1);

    .title {
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
            &:first {
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
    .form-container {
        .btns {
            padding: 0 20px 40px;
        }
    }
    .table-container {
        .filter {
            padding: 10px 0;
            background-color: #f1f5ff;
            border-bottom: 1px solid #dde6f3;
            .btns {
                padding: 0 0 10px 20px;
            }
        }
        .tables {
            .pages {
                padding: 10px;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>