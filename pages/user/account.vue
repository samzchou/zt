<template>
    <section>
        <page-data :data="formData" :listParam="listParam" hasPassword="password" />
    </section>
</template>

<script>
import samForm from '~/components/form';
import pageData from '~/components/page/data';
export default {
    components: {
        samForm, pageData
    },
    data: () => ({
        formData: {
            title: "系统用户",
            filterFields: ['username', 'uid'],
            filter: true,
            content: {
                "gutter": 20,
                "colspan": 3,
                "size": "small",
                "itemList": [
                    {
                        "name": "uid",
                        "label": "员工UID",
                        "width": 100,
                        "type": "String",
                        "required": true,
                        "component": "sam-select",
                        "optionsUrl": {
                            "table": "employee",
                            "label": "e_name",
                            "value": "id"
                        },
                        "table": "user",
                        "value": "",
                        "tableName": "user-uid",
                        "key": "uid",
                        "placeholder": "请选择员工",
                        "rules": [
                            {
                                "required": true,
                                "message": "请选择员工",
                                "trigger": "change"
                            }
                        ]
                    },
                    {
                        "name": "username",
                        "label": "用户账号",
                        "type": "String",
                        "required": true,
                        "component": "sam-input",
                        "cptype": "text",
                        "table": "user",
                        "value": "",
                        "tableName": "user-username",
                        "key": "username",
                        "placeholder": "请填写账号",
                        "rules": [
                            {
                                "required": true,
                                "message": "请填写账号",
                                "trigger": "blur"
                            },
                            {
                                "sql": "same"
                            }
                        ]
                    },
                    {
                        "name": "password",
                        "label": "登录密码",
                        "type": "String",
                        "required": true,
                        "component": "sam-input",
                        "cptype": "text",
                        "table": "user",
                        "value": "123456",
                        "tableName": "user-password",
                        "key": "password",
                        "placeholder": "请填写密码",
                        "rules": [
                            {
                                "required": true,
                                "message": "请填写密码",
                                "trigger": "blur"
                            }
                        ]
                    },
                    {
                        "name": "roles",
                        "label": "权限",
                        "type": "Array",
                        "component": "sam-select",
                        "multiple": true,
                        "optionsUrl": {
                            "table": "roles",
                            "label": "title",
                            "value": "id"
                        },
                        "table": "user",
                        "value": "",
                        "tableName": "user-roles",
                        "key": "roles",
                        "placeholder": "请选择权限(可多选)"
                    },
                ]
            }
        },
        listParam: {
            username: { "$ne": "admin" }
        }
    }),
    methods: {

    },
    mounted() {
        //this.setData();
    }
}
</script>
