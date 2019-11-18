/* eslint-disable */
'use strict';
export default {
    /*----------数据表计数器-----------*/
    counters: {
        "model": {
            "name": "model",
            "type": "String",
            "default": "",
        },
        "count": {
            "name": "count",
            "type": "Number",
            "default": 0
        }
    },
	/*----------权限角色数据-----------*/
    roles: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "roles",
            "label": "角色配置",
			"hide": true,
            "default": ""
        },
        "name": {
            "name": "name",
            "type": "String",
            "component": "sam-select",
            "required": true,
            "default": "",
            "label": "角色名称"
        },
        "content": {
            "name": "content",
            "type": "Object",
			"hide": true,
            "default": "",
            "label": "数据内容JSON"
        }
    },
    /*----------表单配置数据-----------*/
    formList: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "formList",
            "label": "表单配置",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "form_name": {
            "name": "form_name",
            "type": "String",
            "required": true,
            "default": "",
            "label": "表单名称"
        },
        "content": {
            "name": "content",
            "type": "Object",
            "default": "",
            "label": "数据内容JSON"
        },
        "create_eid": {
            "name": "create_eid",
            "type": "Number",
            "default": 0,
            "label": "创建者用户ID"
        },
        "create_date": {
            "name": "create_date",
            "type": "Number",
            "default": new Date().getTime(),
            "label": "创建时间"
        }
    },
    /*----------页面配置数据-----------*/
    pageList: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "pageList",
            "label": "页面配置",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "page_name": {
            "name": "page_name",
            "type": "String",
            "required": true,
            "default": "",
            "label": "页面名称"
        },
        "content": {
            "name": "content",
            "type": "Object",
            "default": "",
            "label": "数据内容JSON"
        },
        "create_eid": {
            "name": "create_eid",
            "type": "Number",
            "default": 0,
            "label": "创建者用户ID"
        },
        "create_date": {
            "name": "create_date",
            "type": "Number",
            "default": new Date().getTime(),
            "label": "创建时间"
        }
    },
    
    /*----------员工信息表-----------*/
    employee: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "employee",
            "label": "员工信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "username": {
            "name": "username",
            "label": "系统账号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "rules": [{
                    "required": true,
                    "message": "请填写账号",
                    "trigger": "blur"
                },
                {
                    "sql": "same"
                }
            ]
        },
        "password": {
            "name": "password",
            "label": "登陆密码",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "tableHide": true,
            "default": ""
        },
        "roles": {
            "name": "roles",
            "label": "角色权限",
            "component": "sam-select",
            "optionsUrl": {
                "table": "roles",
                "label": "name",
                "value": "id"
            },
            "default": 0
        },
        "e_name": {
            "name": "e_name",
            "label": "员工姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_sex": {
            "name": "e_sex",
            "label": "性别",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                "label": "男",
                "value": 1
            }, {
                "label": "女",
                "value": 2
            }],
            "default": 1
        },
        "e_birth": {
            "name": "e_birth",
            "label": "出生日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "e_political_status": {
            "name": "e_political_status",
            "label": "政治面貌",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "群众",
                    "value": 1
                },
                {
                    "label": "中共团员",
                    "value": 2
                },
                {
                    "label": "中共党员",
                    "value": 3
                },
                {
                    "label": "其他党派成员",
                    "value": 4
                }
            ],
            "default": 0
        },
        "e_marital_status": {
            "name": "e_marital_status",
            "label": "婚姻状况",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "未婚",
                    "value": 1
                },
                {
                    "label": "已婚",
                    "value": 2
                },
                {
                    "label": "离异",
                    "value": 3
                }
            ],
            "default": 1
        },
        "e_domicile": {
            "name": "e_domicile",
            "label": "户籍所在地",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "optionsConst": "citys",
            "default": []
        },
        "e_domicile_type": {
            "name": "e_domicile_type",
            "label": "户籍类别",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                "label": "非农",
                "value": 1
            }, {
                "label": "农业",
                "value": 2
            }],
            "default": 1
        },
        "e_education": {
            "name": "e_education",
            "label": "学历",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "小学",
                    "value": 1
                },
                {
                    "label": "初中",
                    "value": 2
                },
                {
                    "label": "高中职",
                    "value": 3
                },
                {
                    "label": "大专",
                    "value": 4
                },
                {
                    "label": "本科",
                    "value": 5
                },
                {
                    "label": "研究生/硕士",
                    "value": 6
                },
                {
                    "label": "博士",
                    "value": 7
                }
            ],
            "default": 5
        },
        "e_profession": {
            "name": "e_profession",
            "label": "专业",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_graduate_institution": {
            "name": "e_graduate_institution",
            "label": "毕业院校",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_idcard_number": {
            "name": "e_idcard_number",
            "label": "身份证/护照号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_cellphone_number": {
            "name": "e_cellphone_number",
            "label": "手机",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "rules": [{
                    "required": true,
                    "message": "请填写账号",
                    "trigger": "blur"
                },
                {
                    "sql": "same"
                }
            ]
        },
        "e_phone_number": {
            "name": "e_phone_number",
            "label": "电话",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_house_address": {
            "name": "e_house_address",
            "label": "家庭住址",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_current_address": {
            "name": "e_current_address",
            "label": "现在住址",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_employee_number": {
            "name": "e_employee_number",
            "label": "工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_department": {
            "name": "e_department",
            "label": "所属部门",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "optionsUrl": {
				"level":1,
				"table":"department",
				"pid":"dept_parentid",
				"value":"id",
				"label":"dept_name",
				"params":{
					"disabled":false
				}
			},
            "default": []
        },
		"is_leader": {
            "name": "is_leader",
            "label": "是否主管领导",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "否",
                    "value": 0
                },
                {
                    "label": "是",
                    "value": 1
                }
            ],
            "default": 0
        },
        "e_position": {
            "name": "e_position",
            "label": "岗位",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "default": ""
        },
        "e_title": {
            "name": "e_title",
            "label": "职称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_employment_date": {
            "name": "e_employment_date",
            "label": "入职日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
        "e_regular_date": {
            "name": "e_regular_date",
            "label": "转正日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
        "e_work_age": {
            "name": "e_work_age",
            "label": "实际工龄",
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "default": 0
        },
        "e_work_age_revise": {
            "name": "e_work_age_revise",
            "label": "工龄修正",
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "default": 0
        },
        "e_ annual_leave_service_age": {
            "name": "e_ annual_leave_service_age",
            "label": "年假工龄",
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "default": 0
        },
        "e_employee_type": {
            "name": "e_employee_type",
            "label": "员工类别",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "临时工",
                    "value": 1
                },
                {
                    "label": "试用期",
                    "value": 2
                },
                {
                    "label": "合同工",
                    "value": 3
                },
                {
                    "label": "已退休",
                    "value": 4
                },
                {
                    "label": "外援",
                    "value": 5
                }
            ],
            "default": 2
        },
        "e_salary_type": {
            "name": "e_salary_type",
            "label": "工资类别",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "P2级",
                    "value": 1
                },
                {
                    "label": "P4级",
                    "value": 2
                },
                {
                    "label": "P6级",
                    "value": 3
                },
                {
                    "label": "P7级",
                    "value": 4
                },
                {
                    "label": "P8级",
                    "value": 5
                }
            ],
            "default": 2
        },
        "e_social_security_office": {
            "name": "e_social_security_office",
            "label": "社保所属",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "optionsConst": "citys",
            "default": []
        },
        "e_employee_status": {
            "name": "e_employee_status",
            "label": "员工状态",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "在职",
                    "value": 1
                },
                {
                    "label": "已离职",
                    "value": 2
                },
                {
                    "label": "退休",
                    "value": 3
                }
            ],
            "default": 1
        }
    },
    
    /*----------图纸信息表-----------*/
    blueprint: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "blueprint",
            "label": "图纸信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "b_emp_id": {
            "name": "b_emp_id",
            "label": "录入员用户id",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "b_entry_date": {
            "name": "b_entry_date",
            "label": "录入日期",
            "type": "Number",
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd HH:mm:ss",
            "default": new Date().getTime(),
        },
        "b_contract_id": {
            "name": "b_contract_id",
            "label": "合同号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_production_order_code": {
            "name": "b_production_order_code",
            "label": "生产指令代码",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_project_name": {
            "name": "b_project_name",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_used_area": {
            "name": "b_used_area",
            "label": "使用场所",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_application_industry": {
            "name": "b_application_industry",
            "label": "应用行业",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_product_name": {
            "name": "b_product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_product_characteristic": {
            "name": "b_product_characteristic",
            "label": "产品特性",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_product_specification": {
            "name": "b_product_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_product_model": {
            "name": "b_product_model",
            "label": "产品型号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_is_put_into_production": {
            "name": "b_is_put_into_production",
            "label": "是否投入生产",
            "type": "String",
            "required": true,
            "component": "sam-switch",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_id": {
            "name": "b_blueprint_id",
            "label": "图纸编码",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_type": {
            "name": "b_blueprint_type",
            "label": "图纸类型",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_create_date": {
            "name": "b_blueprint_create_date",
            "label": "图纸创建日期",
            "type": "Number",
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd HH:mm:ss",
            "default": new Date().getTime()
        },
        "b_blueprint_name": {
            "name": "b_blueprint_name",
            "label": "图纸文件名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_designer_name": {
            "name": "b_blueprint_designer_name",
            "label": "图纸设计人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": "employee",
            "emit": ["b_blueprint_designer_id"],
            "default": ""
        },
        "b_blueprint_designer_id": {
            "name": "b_blueprint_designer_id",
            "label": "图纸设计人工号",
            "type": "String",
            "required": true,
            "component": "sam-select",
            "cptype": "text",
            "on": ["b_blueprint_designer_name"],
            "default": ""
        },
        "b_blueprint_countersigner_name": {
            "name": "b_blueprint_countersigner_name",
            "label": "图纸会签人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": "employee",
            "emit": ["b_blueprint_countersigner_id"],
            "default": ""
        },
        "b_blueprint_countersigner_id": {
            "name": "b_blueprint_countersigner_id",
            "label": "图纸会签人工号",
            "type": "String",
            "required": true,
            "component": "sam-select",
            "cptype": "text",
            "on": ["b_blueprint_countersigner_name"],
            "default": ""
        },
        "b_blueprint_standardized_name": {
            "name": "b_blueprint_standardized_name",
            "label": "图纸标准化人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": "employee",
            "emit": ["b_blueprint_standardized_id"],
            "default": ""
        },
        "b_blueprint_standardized_id": {
            "name": "b_blueprint_standardized_id",
            "label": "图纸标准化人工号",
            "type": "String",
            "required": true,
            "component": "sam-select",
            "cptype": "text",
            "on": ["b_blueprint_standardized_name"],
            "default": ""
        },
        "b_blueprint_auditor_name": {
            "name": "b_blueprint_auditor_name",
            "label": "图纸审核人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": "employee",
            "emit": ["b_blueprint_auditor_id"],
            "default": ""
        },
        "b_blueprint_auditor_id": {
            "name": "b_blueprint_auditor_id",
            "label": "图纸审核人工号",
            "type": "String",
            "required": true,
            "component": "sam-select",
            "cptype": "text",
            "on": ["b_blueprint_auditor_name"],
            "default": ""
        },
        "b_blueprint_department": {
            "name": "b_blueprint_department",
            "label": "图纸归属科室",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_standard_id": {
            "name": "b_blueprint_standard_id",
            "label": "图纸涉及标准编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_status": {
            "name": "b_blueprint_status",
            "label": "图纸当前状态",
            "type": "Number",
            "required": true,
            "component": "sam-radio",
            "options": [{
                "label": "设计中",
                "id": 1
            }, {
                "label": "使用中",
                "id": 2
            }, {
                "label": "已废弃",
                "id": 3
            }],
            "default": 1
        },
        "b_blueprint_version": {
            "name": "b_blueprint_version",
            "label": "图纸版本号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_safety_grade": {
            "name": "b_blueprint_safety_grade",
            "label": "图纸密级",
            "type": "Number",
            "required": true,
            "component": "sam-radio",
            "options": [{
                "label": "一级",
                "id": 1
            }, {
                "label": "二级",
                "id": 2
            }, {
                "label": "三级",
                "id": 3
            }],
            "default": 1
        }
    }
}