/* eslint-disable */
module.exports = {
    dbConect: { "dataUrl": "127.0.0.1", "dataPort": "27017", "dataName": "zt", "username": "", "password": "" }, //47.91.231.119
    collections: {
        /*--------------全局数据设定--------------*/
        setting: {
            name: {
                type: String,
                default: 'opts',
            },
            content: {
                type: Object,
                default: ''
            }
        },
        /*--------------ID自增计数器--------------*/
        counters: {
            model: {
                type: String,
                default: '',
            },
            count: {
                type: Number,
                default: 0
            }
        },
        /*----------权限数据-----------*/
        role: {
            id: {
                type: Number,
                default: 0
            },
            name: {
                type: String,
                default: '',
                label: '名称命名'
            },
            tag: {
                type: String,
                default: '',
                label: '标签识别'
            },
            content: {
                type: String,
                default: '',
                label: '描述'
            }
        },
		/*----------权限数据-----------*/
        timeBlock: {
            id: {
                type: Number,
                default: 0
            },
            userId: {
                type: Number,
                default: 0,
                label: '用户ID'
            },
            date: {
                type: Number,
                default: 0,
                label: '当前周一时间'
            },
            content: {
                type: Object,
                default: '',
                label: '数据内容JSON'
            }
        },

        /*----------用户数据-----------*/
        user: {
            id: {
                type: Number,
                default: 0
            },
            roles: {
                type: Array,
                default: [],
                label: '权限组ID'
            },
            username: {
                type: String,
                default: '',
                label: '用户名'
            },
            password: {
                type: String,
                default: 'juehe123456',
                label: '密码'
            },
            name: {
                type: String,
                default: '',
                label: '姓名'
            },
            token: {
                type: String,
                default: '',
                label: '后台验证码'
            },
            content: {
                type: String,
                default: '',
                label: '描述'
            }
        },

    }

};
