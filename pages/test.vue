<template>
    <el-form size="small" :model="formField" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item label="年龄" prop="age" :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]">
            <el-input type="age" v-model.number="formField.age" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-row :gutter="30">
            <draggable>
                <el-col :span="3" v-for="item in itemList" :key="item.name">
                    <el-form-item :label="item.label" :prop="item.name" :rules="item.rules">
                        <component :is="item.component" size="mini" :isEdit="false" :data="item" />
                    </el-form-item>
                </el-col>
            </draggable>
        </el-row> -->
        <el-form-item label="area" prop="area">
            <el-cascader v-model="formField.area" :options="options" expand-trigger="hover" filterable clearable @change="handleChange" :rules="[
      { type: 'array', required: true, message: '请输入邮箱地址', trigger: 'change' }
    ]" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
            <el-button @click="addDomain">新增域名</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Draggable from 'vuedraggable';
import {
    mapState, mapMutations, mapActions
} from 'vuex';
import opts from '~/config/options';
export default {
    components: {
        Draggable,
        "sam-input": resolve => require(["../components/form/plugin/samInput.vue"], resolve),
        "sam-select": resolve => require(["../components/form/plugin/samSelect.vue"], resolve),
        "sam-date": resolve => require(["../components/form/plugin/samDate.vue"], resolve),
    },
    computed: {
        ...mapState('forms', ['currItem', 'currForms']),
    },
    data() {
        return {
            itemList: [],
            formField: {
                area: "",
                age: ''
            },
            value: [],
            options: [],
            formRule: {
                area: [
                    { type: 'array', required: true, message: 'eurei', trigger: "change" }
                ]
            }
        };
    },
    methods: {
        handleChange() {
            console.log('handleChange', this.formField)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        removeDomain(item) {
            /* var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
            } */
        },
        addDomain() {
            /* this.dynamicValidateForm.domains.push({
                value: '',
                key: Date.now()
            }); */
        },
        setFormData() {
            /* let currForms = this.$storage.get('adminForms');
            console.log('this.formDatasss', currForms);
            if (currForms.itemList.length) {
                currForms.itemList.forEach(item => {
                    this.itemList = _.concat(currForms.itemList, item.children);
                    item.children.forEach(c => {
                        this.formField[c.name] = "";
                    })
                });
            }
            console.log('test.formDataEnd', this.formField); */
        },
    },
    mounted() {
        //this.setFormData();
        this.$nextTick(() => {
            this.options = opts['citys'];
        })
    }
}
</script>