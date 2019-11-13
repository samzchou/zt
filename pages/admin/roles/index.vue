<template>
    <section class="sam-page">
        <div class="header">
            <div class="title"><i class="el-icon-price-tag" />权限设置</div>
            <div v-if="!isAdd">
                <el-button class="icon-link" icon="el-icon-plus" @click="addNewList">新增</el-button>
                <!-- <el-button class="icon-link" icon="el-icon-finished" @click="filterVisible=!filterVisible" v-if="formData.filter">筛选</el-button> -->
            </div>
            <div v-else>
                <el-button class="icon-link" icon="el-icon-back" @click="backList">返回列表</el-button>
            </div>
        </div>
        <!--表单-->
        <!-- <div class="forms" v-if="isAdd">
            <sam-form ref="samform" :data="formData.content" :isEdit="false" v-model="formValue" />
            <div class="btns">
                <el-button size="small" type="primary" @click="submitForms(true)" :disabled="submitLoading" :icon="submitLoading?'el-loading':''">提交保存</el-button>
                <el-button size="small" @click="submitForms(false)">重置表单</el-button>
            </div>
        </div> -->
        <div class="table-container">
            <div class="collapse">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item v-for="(item,idx) in tableData" :key="item.id" :title="item.title" :name="String(idx+1)">
                        <template slot="title">
                            <i class="el-icon-paperclip" />
                            <span style="margin-left:10px">{{item.title}}</span>
                        </template>
                        <div class="list" v-for="child in sourceData.filter(o=>{return o.pid==item.id})" :key="child.id">
                            <div>{{child.title}}</div>
                            <div>
                                <el-checkbox v-for="c in checkArr" :key="c.value" :label="c.value" @change="setCheck($event, c, item.id, child.id)" :checked="checkRoles(c.value, item.id, child.id)">{{c.label}}</el-checkbox>
                            </div>
                            <!-- <el-checkbox-group v-model="checkList[idx][child.id]">
                                <el-checkbox v-for="item in checkArr" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
                            </el-checkbox-group> -->
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </section>
</template>

<script>
import samForm from '~/components/form';
import dataUtil from '~/util/data_util';
import dataOptions from '~/config/options';

export default {
    components: {
        samForm
    },
    data: () => ({
        collectionName: "roles",
        isAdd: false,
        activeNames: ['1', '2'],
        tableData: [],
        sourceData: [],
        editRow: null,
        checkArr: [
            { label: '查看', value: 1 }, { label: '新增', value: 2 }, { label: '修改', value: 3 }, { label: '删除', value: 4 }, { label: '批量处理', value: 5 }
        ],
        checkList: []
    }),
    methods: {
        handleChange() {

        },
        checkRoles(value, pid, id) {
            console.log('checkRoles', value, pid, id);
        },
        setCheck(checked, item, pid, id) {
            let obj = {
                "pid": pid,
                "id": id,
                "value": item.value
            }
            if (checked) {
                this.checkList.push(obj);
            } else {
                let index = _.findIndex(this.checkList, obj);
                this.checkList.splice(index, 1);
            }

            console.log('this.checkList', this.checkList);
        },

        addNewList(row) {
            this.isAdd = true;
            this.filterVisible = false;
            this.editRow = row ? _.cloneDeep(row) : null;
            console.log('addNewList', this.editRow);
            this.formValue = {};
            this.formData.content.itemList.forEach(item => {
                let key = item.key;
                this.formValue[key] = row[item.name] || '';
            });
        },
        backList(flag) {
            this.isAdd = false;
            this.editRow = null;
            if (flag) {
                this.query.page = 1;
                this.searchSubmit();
            }
        },

        removeItem(row) {

        },
        async getList(match = {}) {
            this.loading = true;
            match = Object.assign({}, this.filterParams, match);
            let condition = {
                type: 'aggregate',
                collectionName: 'service',
                data: match,
                aggregate: [
                    {
                        $lookup: {
                            from: "roles",
                            localField: "id",
                            foreignField: "pageid",
                            as: "roles"
                        }
                    },

                ]
            };
            let result = await this.$axios.$post('mock/db', { data: condition });
            this.sourceData = [...result.list];

            this.activeNames = [];
            //this.tableData = result.list;
            this.tableData = result.list.filter((item, i) => {
                this.activeNames.push(String(i + 1));
                return item.pid == 0;
            });
            console.log('this.tableData', this.tableData);
            setTimeout(() => {
                this.loading = false;
            }, 500)
        }
    },
    beforeMount() {
        //this.setData();
    },
    mounted() {
        this.getList();
    },
    layout: 'admin'
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/admin-form';

/deep/ .el-collapse {
    .el-collapse-item__header {
        font-size: 14px;
        padding: 0 20px;
        font-weight: bold;
        color: #21754a;
    }
    .el-collapse-item__wrap {
        border-top: 1px solid #eee;
        .el-collapse-item__content {
            padding: 0;
            background-color: #f0fbff;
            .list {
                display: flex;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                height: 40px;
                align-items: center;
                box-sizing: border-box;
                padding: 0 20px;
                > div {
                    flex: 1;
                    &:first-child {
                        flex: 0 0 120px;
                    }
                }
                &:last-child {
                    border: 0;
                }
            }
        }
    }
}
</style>