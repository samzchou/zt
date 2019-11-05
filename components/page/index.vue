<template>
    <section class="page-enginer">
        <div class="title">
            <div>{{formData && formData.title}}</div>
            <div v-if="formData.showType">
                <el-button class="icon-link" icon="el-icon-plus">新增</el-button>
                <el-button class="icon-link" icon="el-icon-finished" @click="filterVisible=true" v-if="formData.filter">筛选</el-button>
            </div>
        </div>
        <div v-if="formData.content.itemList&&formData.content.itemList.length">
            <div class="form-container" v-if="!formData.showType">
                <!-- <sam-form v-for="(form,index) in formData.list" :ref="'samform-'+index" :key="index" :data="form.content" :isEdit="false" v-model="formValueList[index]" /> -->
                <sam-form ref="samform" :data="formData.content" :isEdit="false" v-model="formValue" />
                <div class="btns">
                    <el-button size="small" type="primary" @click="submitForms(true)">{{!isRelease?'提交表单测试':'提交保存'}}</el-button>
                    <el-button size="small" @click="submitForms(false)">重置表单</el-button>
                </div>
            </div>
            <div v-else class="table-container">
                <div v-if="filterVisible && formData.filter" class="filter">
                    <sam-form ref="filterform" :data="filterForm" :isEdit="false" v-model="filterValue" />
                    <div class="btns">
                        <el-button size="mini" type="primary">搜索</el-button>
                        <el-button size="mini">重置</el-button>
                    </div>
                </div>
                <div>sadasd</div>
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
                this.formData = _.cloneDeep(obj);
                this.setData();
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
            "colspan": 6,
            "size": "mini",
            "itemList": []
        },
        filterValue: {},
    }),
    methods: {
        setData() {
            let valueObj = {}, filterObj = {}, itemList = [];
            if (this.formData && this.formData.content && this.formData.content.itemList) {
                this.formData.content.itemList.map(item => {
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
                this.$message.success("OK")
            }
        },
        submitData() {
            let data = {}, table = '';
            this.formData.content.itemList.forEach(item => {
                if (!table) {
                    table = item.table;
                }
                let key = item.name;
                let value = this.checkValue(item.type, this.formValue[item.key]);
                data[key] = value;
            });
            let condition = {
                type: 'addData',
                collectionName: table,
                data: data
            };
            this.$axios.$post('mock/db', { data: condition }).then(result => {
                console.log('result', result);
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
                padding-left: 20px;
            }
        }
    }
}
</style>