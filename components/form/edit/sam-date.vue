<template>
    <section>
        <el-form size="mini" :model="formItem" label-position="top" status-icon ref="optForm" v-on="$listeners" v-bind="$attrs" @keyup.native.enter="submitForm">
            <el-form-item label="标签名">
                <el-input v-model="formItem.label" clearable @blur="submitForm" />
            </el-form-item>
            <el-form-item label="占位文本">
                <el-input v-model="formItem.placeholder" clearable @blur="submitForm" />
            </el-form-item>
            <el-form-item label="格式">
                <el-input v-model="formItem.valueFormat" />
            </el-form-item>
            <el-form-item label="键名(不可修改)">
                <el-input v-model="formItem.name" readonly />
            </el-form-item>
            <el-form-item label="默认值">
                <el-date-picker style="width:200px" :type="formItem.subtype" :value-format="formItem.valueFormat" :format="formItem.viewFormat||formItem.valueFormat" placeholder="选择默认值" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" v-model="formItem.value" @change="submitForm" />
            </el-form-item>
            <el-form-item>
                <div>
                    <el-checkbox v-model="hasColspan" @change="setCol">占位单元(列数)</el-checkbox>
                </div>
                <el-slider v-if="hasColspan" v-model="formItem.colspan" :min="1" :max="6" @change="submitForm" />
            </el-form-item>
            <el-form-item label="文本框可输入">
                <el-switch v-model="formItem.editable" @change="submitForm" />
            </el-form-item>
            <el-form-item label="是否禁用">
                <el-switch v-model="formItem.disabled" @change="submitForm" />
            </el-form-item>
            <el-form-item label="是否只读">
                <el-switch v-model="formItem.readonly" @change="submitForm" />
            </el-form-item>
        </el-form>
        <form-rules :formRules="formItem.rules" @update="updateRule" :itemType="formItem.component" types="required" />
    </section>
</template>

<script>
import {
    mapState, mapMutations, mapActions
} from 'vuex';
import formRules from './formRules';
export default {
    name: "sam-input",
    components: { formRules },
    computed: {
        ...mapState('forms', ['currComponent', 'currForms']),
    },
    watch: {
        currComponent: {
            handler(list) {
                this.setItemData();
            },
            immediate: true
        }
    },
    data: () => ({
        formItem: {},
        hasColspan: false
    }),
    methods: {
        ...mapMutations('forms', ['UPDATE_ITEM', 'UPDATE_FORMS', 'UPDATE_RULES']),
        setCol(val) {
            if (val) {
                this.formItem.colspan = this.currForms.colspan || 1;
            } else {
                delete this.formItem.colspan;
            }
            this.submitForm();
        },
        setItemData() {
            if (this.currComponent) {
                this.formItem = _.cloneDeep(this.currComponent);
            }
        },
        submitForm() {
            //console.log(this.formItem);
            this.UPDATE_ITEM({ ...this.formItem });
        },
        updateRule(rules) {
            this.UPDATE_RULES([...rules]);
        },
    }
}
</script>