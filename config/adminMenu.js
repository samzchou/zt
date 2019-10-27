/* eslint-disable */
export default {
    "menuList": [
        {
            "label": "数据管理",
            "icon": "el-icon-coin",
			"name":"data",
            "children": [
                { "label": "数据表", "icon": "el-icon-document-copy", "path": "/admin/data/collections", "name":"collections" },
                { "label": "元数据", "icon": "el-icon-document-copy", "path": "/admin/data/meta", "name":"meta" }
            ]
        },
        {
            "label": "工作管理",
            "icon": "el-icon-time",
			"name":"work",
            "children": [
				{ "label": "时间钟管理", "icon": "el-icon-document-copy", "path": "/work/time", "name":"time" },
                { "label": "待办事项", "icon": "el-icon-document-copy", "path": "/work/todo" },
                { "label": "工作统计", "icon": "el-icon-document-copy", "path": "/work/calc" }
            ]
        },
        {
            "label": "行政中心",
            "icon": "el-icon-suitcase",
            "children": [
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/administration" },
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/administration" }
            ]
        },
        {
            "label": "信息中心",
            "icon": "el-icon-paperclip",
            "children": [
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/infomation" },
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/infomation" }
            ]
        },
        {
            "label": "交互中心",
            "icon": "el-icon-magic-stick",
            "children": [
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/methods" },
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/methods" }
            ]
        },
        {
            "label": "知识中心",
            "icon": "el-icon-connection",
            "children": [
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/learns" },
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/learns" }
            ]
        },
        {
            "label": "系统管理",
            "icon": "el-icon-set-up",
            "children": [
                { "label": "机构部门", "icon": "el-icon-document-copy", "path": "/systems/org" },
                { "label": "职位职级", "icon": "el-icon-document-copy", "path": "/systems/dept" },
                { "label": "操作权限", "icon": "el-icon-document-copy", "path": "/systems/role" }
            ]
        }
    ]
}
