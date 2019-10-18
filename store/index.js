/* eslint-disable */
const sysConfig = require('../config');
import VueCookies from 'vue-cookies';
export const state = () => ({
    user: null,
    sidebar: {
        opened: process.server ? true : !+VueCookies.get('sidebarStatus'),
        withoutAnimation: false
    },
	workType:[{label:"工作分类一",id:1},{label:"工作分类二",id:2}],
	workProject:[{label:"项目一",id:1},{label:"项目二",id:2}],
	timeutilHeight:20,
	locakMinutes:15,
	editBlock:null,
	editIndex:'',
})

export const mutations = {
    UPDATE_USER(state, data) {
        state.user = data;
        if (!process.server) {
            this.app.$storage.set('user', state.user);
        }
    },
	UPDATE_EDITBLOCK(state, obj) {
        state.editBlock = obj;
		//console.log('state.editBlock', state.editBlock);
    },
	UPDATE_EDITINDEX(state, indexStr) {
        state.editIndex = indexStr;
		//console.log('state.editIndex', state.editIndex);
    },
    TOGGLE_SIDEBAR: state => {
        VueCookies.set('sidebarStatus', state.sidebar.opened?1:0);
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
    },
}

export const actions = {
    async nuxtServerInit({ commit }, { req, app }) {
        let { host = '' } = req.headers || {};
        let user = null;
        if (req.cookies.token) {
            user = await this.$axios.$post('mock/db', {
                data: {
                    type: 'getData',
                    collectionName: 'user',
                    data: {
                        token: req.cookies.token
                    }
                }
            });
        }
        commit('UPDATE_USER', user);
    },
    async ASYNC_UPDATE_LOCALE({ commit }, lang) {
        /* let flag = await this.$axios.$post('/api/user/changLocale', {
            data: {
                newLocale: lang
            }
        });
        if (flag !== undefined) {
            this.$router.go(0);
        } */
    },
}
