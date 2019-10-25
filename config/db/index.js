/* eslint-disable */
const optionSet = require('./options');
module.exports = {
    dbConect: { "dataUrl": "127.0.0.1", "dataPort": "27017", "dataName": "zt", "username": "", "password": "" },
    collections: {
        /*--------------ID自增计数器--------------*/
        counters: {
            model: {
                type: "String",
                default: '',
            },
            count: {
                type: "Number",
                default: 0
            }
        },
        /*----------权限数据-----------*/
        role: {
            id: {
                type: "Number",
                default: 0
            },
            name: {
                type: "String",
                default: '',
                label: '名称命名'
            },
            tag: {
                type: "String",
                default: '',
                label: '标签识别'
            },
            content: {
                type: "String",
                default: '',
                label: '描述'
            }
        },
        /*----------权限数据-----------*/
        timeBlock: {
            id: {
                type: "Number",
                default: 0
            },
            userId: {
                type: "Number",
                default: 0,
                label: '用户ID'
            },
            startdate: {
                type: "Number",
                default: 0,
                label: '当前周一时间'
            },
            enddate: {
                type: "Number",
                default: 0,
                label: '当前周日时间'
            },
            content: {
                type: "Object",
                default: '',
                label: '数据内容JSON'
            }
        },

        /*----------用户数据-----------*/
        user: {
            id: {
                "type": "Number",
                "default": 0
            },
            org: {
                "type": "Array",
                "component": "sam-cascader",
                "default": [],
                "label": '所属部门'
            },
            username: {
                "type": "String",
                "component": "sam-input",
                "cptype": "text",
                "required": true,
                "default": '',
                "label": '用户名'
            },
            password: {
                "type": "String",
                "component": "sam-input",
                "cptype": "password",
                "required": true,
                "default": '123456',
                "label": '密码'
            },
            name: {
                "type": "String",
                "component": "sam-input",
                "cptype": "text",
                "required": true,
                "default": '',
                "label": '姓名'
            },
            sex: {
                "type": "Number",
                "component": "sam-radio",
                "options": [{ "label": "男", "id": 1 }, { "label": "女", "id": 2 }],
                "default": 1,
                "label": '性别'
            },
            brithday: {
                "type": "Number",
                "component": "sam-date-picker",
                "cptype": "date",
                "required": true,
                "default": new Date().getTime(),
                "label": '出生日期'
            },
            native: {
                "type": "Array",
                "component": "sam-city-picker",
                "options": optionSet.citys,
                "required": true,
                "default": [],
                "label": '籍贯'
            },
            residenceAdress: {
                "type": "String",
                "component": "sam-input",
                "cptype": "text",
                "required": true,
                "default": "",
                "label": '户籍地址'
            },
            residenceNature: {
                "type": "Number",
                "component": "sam-radio",
                "options": [{ "label": "非农", "id": 1 }, { "label": "农业", "id": 2 }],
                "required": true,
                "default": 1,
                "label": '户口性质'
            },
            nation: {
                "type": "Number",
                "component": "sam-select",
                "options": optionSet.nation,
                "required": true,
                "default": 0,
                "label": '民族'
            },
            highEducation: {
                "type": "Number",
                "component": "sam-select",
                "options": [
                    { "label": "小学", "id": 1 },
                    { "label": "初中", "id": 2 },
                    { "label": "高中职", "id": 3 },
                    { "label": "大专", "id": 4 },
                    { "label": "本科", "id": 4 },
                    { "label": "研究生/硕士", "id": 5 },
                    { "label": "博士", "id": 6 }
                ],
                "required": true,
                "default": 0,
                "label": '最高学历'
            },
            highDegree: {
                "type": "Number",
                "component": "sam-select",
                "options": [
                    { "label": "学士", "id": 1 },
                    { "label": "硕士", "id": 2 },
                    { "label": "博士", "id": 3 }
                ],
                "default": 0,
                "label": '最高学位'
            },
            techPost: {
                "type": "String",
                "component": "sam-input",
                "cptype": "text",
                "default": '',
                "label": '专业技术职务'
            },
            techQua: {
                "type": "String",
                "component": "sam-input",
                "cptype": "text",
                "default": '',
                "label": '专业技术资格'
            },
            health: {
                "type": "Number",
                "component": "sam-select",
                "options": [
                    { "label": "较差", "id": 1 },
                    { "label": "一般", "id": 2 },
                    { "label": "良好", "id": 3 }
                ],
                "required": true,
                "default": 0,
                "label": '健康状况'
            },
            mobile: {
                "type": "String",
                "component": "sam-input",
                "cptype": "text",
                "required": true,
                "default": '',
                "label": '联系电话'
            },
            mail: {
                "type": "String",
                "component": "sam-input",
                "cptype": "mail",
                "required": true,
                "default": '',
                "label": '邮箱'
            },
            phone: {
                "type": "String",
                "component": "sam-input",
                "cptype": "text",
                "required": true,
                "default": '',
                "label": '办公电话'
            },
            address: {
                "type": "String",
                "component": "sam-input",
                "cptype": "text",
                "required": true,
                "default": '',
                "label": '家庭住址'
            },
            archivesAdress: {
                "type": "Array",
                "component": "vue-city-picker",
                "options": optionSet.citys,
                "required": true,
                "default": [],
                "label": '档案所在地'
            },
            marriage: {
                "type": "Number",
                "component": "sam-select",
                "options": [
                    { "label": "未婚", "id": 1 },
                    { "label": "已婚", "id": 2 },
                    { "label": "离异", "id": 3 }
                ],
                "required": true,
                "default": 0,
                "label": '婚姻状况'
            },
            politics: {
                "type": "Number",
                "component": "sam-select",
                "options": [
                    { "label": "群众", "id": 1 },
                    { "label": "中共团员", "id": 2 },
                    { "label": "中共党员", "id": 3 },
                    { "label": "其他党派成员", "id": 4 }
                ],
                "eventName": ['politicsDate', 'politicsAdress', 'politicsChange'],
                "required": true,
                "default": 0,
                "label": '政治面貌'
            },
            politicsDate: {
                "type": "Number",
                "component": "sam-date-picker",
                "cptype": "date",
                "required": true,
                "event": true,
                "default": 0,
                "label": '入党（团）日期'
            },
            politicsAdress: {
                "type": "Array",
                "component": "vue-city-picker",
                "options": optionSet.citys,
                "required": true,
                "event": true,
                "default": [],
                "label": '党组织关系所在地'
            },
            politicsChange: {
                "type": "Number",
                "component": "sam-radio",
                "options": [{ "label": "是", "id": 1 }, { "label": "否", "id": 2 }],
                "default": 1,
                "label": '是否打算将党组织关系转到公司'
            },
            token: {
                "type": "String",
                "default": '',
                "hide": true,
                "label": '后台验证码'
            },
            content: {
                "type": "String",
                "component": "sam-input",
                "cptype": "text-area",
                "default": '',
                "label": '备注说明'
            },
            createDate: {
                "type": "Number",
                "default": new Date().getTime(),
                "label": '创建时间'
            },
            updateDate: {
                "type": "Number",
                "default": new Date().getTime(),
                "label": '最后更新时间'
            }
        },
    }

};
