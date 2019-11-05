/* const sysCollections = require('../config/collections');
const sysPatterns = require('../config/parttens'); */
const _ = require('lodash');
const sourcePage = {
    title: "我的页面",
    content: {}
};
const guid = (val = "") => {
    return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-' + val).replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        const d = new Date().getTime().toString(16);
        return v.toString(16);
    })
};
export const state = () => ({
    currForm: null,
    pageForm: {
        title: "我的页面",
        content: {}
    },
    formList: [] // 表单列表
})

export const mutations = {
    CLEAR_PAGES(state, flag) {
        if (!flag) {
            let pageForm = { ...state.pageForm };
            pageForm.content = {};
            state.pageForm = pageForm;
        } else {
            state.pageForm = {
                ...sourcePage
            };
        }
        if (!process.server) {
            this.app.$storage.session.remove('adminPages');
        }
    },
    UPDATE_PAGES(state, data) {
        state.pageForm = data;
        if (!process.server) {
            this.app.$storage.session.set('adminPages', state.pageForm);
        }
    },

    INIT_PAGES(state) {
        if (!process.server) {
            let pageForm = this.app.$storage.session.get('adminPages');
            if (pageForm) {
                state.pageForm = pageForm;
            }
        }
    },
    UPDATE_ITEM(state, data) {
        /* let currForms = {
            ...state.currForms
        };
        let index = _.findIndex(currForms.itemList, {
            "name": data.name,
            "table": data.table
        });
        currForms.itemList[index] = data;
        state.currComponent = data;
        this.app.store.commit('forms/UPDATE_FORMS', currForms); */
    },
    REMOVE_ITEM(state, data) {
        /* let currForms = {
            ...state.currForms
        };
        let index = _.findIndex(currForms.itemList, {
            "name": data.name,
            "table": data.table
        });
        if (!!~index) {
            currForms.itemList.splice(index, 1);
        }
        state.currComponent = null;
        this.app.store.commit('forms/UPDATE_FORMS', currForms); */
    },
    UPDATE_FORMLIST(state, list) {
        state.formList = list;
    }
}

export const actions = {
    // 获取表单数据
    async ASYNC_GETFORMS({ commit }, lang) {
        let condition = {
            type: 'listData',
            collectionName: 'formList'
        }
        let res = await this.$axios.$post('mock/db', { data: condition });
        let list = res.list.map(item => {
            item.active = false;
            return item;
        })
        //console.log(res);
        commit('UPDATE_FORMLIST', list);
    },
}