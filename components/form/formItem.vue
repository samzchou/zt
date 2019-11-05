<template>
    <el-form-item v-if="item" :label="item.label" :prop="item.key" :rules="Rules">
        <!-- 文本-->
        <el-input v-if="item.component==='sam-input'||item.component==='sam-richtext'" v-bind="$attrs" v-on="$listeners" :type="item.cptype||'text'" :placeholder="item.placeholder||''" :prop="item.value||''" :readonly="item.readonly" :disabled="item.disabled" />
        <!-- 日期 -->
        <el-date-picker v-else-if="item.component==='sam-date'" v-bind="$attrs" v-on="$listeners" :type="item.cptype" value-format="timestamp" editable range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :placeholder="item.placeholder" :disabled="item.disabled" />
        <!-- 数字 -->
        <input-number v-else-if="item.component==='sam-number'" v-bind="$attrs" v-on="$listeners" :prepend="item.prepend" :append="item.append" :min="item.min" :max="item.max" :decimal1="item.decimal1" :disabled="item.disabled" />
        <!-- 单选 有BUG-->
        <el-radio-group v-else-if="item.component==='sam-radio'" v-bind="$attrs" v-on="$listeners" :disabled="item.disabled">
            <component :is="item.button?'el-radio-button':'el-radio'" v-for="o in ajaxOptions" :key='o.id' :label="o.value" :border="item.border">
                {{o.label}}
            </component>
        </el-radio-group>
        <!-- 下拉 -->
        <el-select v-else-if="item.component==='sam-select'" v-bind="$attrs" v-on="$listeners" :multiple="item.multiple" :multiple-limit="item.multipleLimit" :disabled="item.disabled" clearable>
            <el-option v-for="o in ajaxOptions" :key="o.value" :label="o.label" :value="o.value" />
        </el-select>
        <!--级联-->
        <el-cascader v-else-if="item.component==='sam-cascader'" :options="ajaxOptions" :props="defaultPtops" v-bind="$attrs" v-on="$listeners" :disabled="item.disabled" clearable />
    </el-form-item>
</template>

<script>
import {
    mapState, mapMutations
} from 'vuex';
import inputNumber from './plugin/input-number';
import opts from '~/config/options';
import $bus from '~/util/bus';
export default {
    name: "form-item",
    components: { inputNumber },
    props: {
        item: {
            type: Object,
            required: true
        },
        size: {
            type: String,
            default: "mini"
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        item: {
            handler(obj) {
                //console.log('watch form-item', obj);
                this.setOpts();
                this.setListener();
            },
            immediate: true
        }
    },
    computed: {
        ...mapState('forms', ['currForms']),
        Rules() {
            if (this.isEdit || !this.item.required || this.item.isFilter) {
                return null;
            }
            const rules = this.item.rules;
            if (rules === undefined) return undefined;
            const R = [];
            rules.forEach(rule => {
                if (rule.sql) {
                    const validator = (rule2, value, callback) => {
                        this.$alert('需要接入后台API:' + rule.sql, '后台API验证', {
                            confirmButtonText: '确定'
                        });
                    }
                    R.push({ validator, message: rule.message, trigger: 'blur' });
                } else {
                    R.push(rule);
                }
            });
            return R;
        },
    },

    data: () => ({
        optsProp: {
            vaule: 'value',
            label: 'label'
        },
        ajaxOptions: [],
        defaultPtops: {
            value: "value",
            label: "label",
            children: "children"
        },
        listenerOn: [],
    }),
    methods: {
        async setOpts(flag) {
            this.ajaxOptions = [];
            if (this.item.options && this.item.options.length) {
                this.ajaxOptions = _.clone(this.item.options);
            } else if (this.item.optionsUrl && !this.item.level) {
                //debugger
                let conditon = {
                    type: 'listData',
                    collectionName: this.item.optionsUrl.table,
                    data: this.item.optionsUrl.params || {}
                }
                let res = await this.$axios.$post('mock/db', { data: conditon });
                if (res && res.list.length) {
                    this.ajaxOptions = res.list.map(item => {
                        return {
                            value: item[this.item.optionsUrl.value],
                            label: item[this.item.optionsUrl.label]
                        }
                    });
                }
            } else if (this.item.optionsConst) {
                if (opts[this.item.optionsConst]) {
                    this.ajaxOptions = opts[this.item.optionsConst];
                }
            }
            //console.log('this.ajaxOptions', this.ajaxOptions);
        },
        setListener() {
            if (this.item.on) {
                this.listenerOn = this.item.on;
                for (let i = 0; i < this.listenerOn.length; i++) {
                    $bus.$on(this.listenerOn[i], (value) => {
                        console.log('listenerOn', this.listenerOn[i], value);
                        let keys = Object.keys(this.item.optionsUrl.params);
                        keys.forEach(key => {
                            this.item.optionsUrl.params[key] = value;
                        });
                        this.item.level = 0;
                        this.setOpts();
                    })
                }
            }
        },
    }
}
</script>
