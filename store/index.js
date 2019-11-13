/* eslint-disable */
//import VueCookies from 'vue-cookies';
const VueCookies = require('vue-cookies');
//const navMenu = require('../config/navMenu');
import dataUtil from '../util/data_util';

export const state = () => ({
    user: null,
    sidebar: {
        opened: process.server ? true : !+VueCookies.get('sidebarStatus'),
        withoutAnimation: false
    },
    menuAcitve: "",
    //navMenu: navMenu.menuList,
    pageTitle: '主页',
	serviceList:[],
	collectionData:{}
})

export const mutations = {
    UPDATE_MENUACTIVE(state, index) {
        state.menuAcitve = index;
    },
    UPDATE_USER(state, data) {
        state.user = data;
        if (!process.server) {
            this.app.$storage.set('user', state.user);
        }
    },
    TOGGLE_SIDEBAR: state => {
        VueCookies.set('sidebarStatus', state.sidebar.opened ? 1 : 0);
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
    },
	UPDATE_SERVICE(state, list){
		//state.serviceList = list;
		state.serviceList = dataUtil.toTree(list);
	},
	UPDATE_COLLECTIONS_DATA(state, obj){
		state.collectionData = obj;
	}
}

export const actions = {
    async nuxtServerInit({ commit }, { req, app }) {
        let { host = '' } = req.headers || {};
        let user = null;
        if (req.cookies.token) {
            user = await this.$axios.$post('mock/db', {
                data: {
                    type: 'getData',
                    collectionName: 'employee',
                    data: {
                        token: req.cookies.token
                    }
                }
            });
            //console.log('nuxtServerInit', user);
        }
        commit('UPDATE_USER', user);
		// 系统常用值集
		let obj = {}, names = ['department', 'user', 'roles','service'];
		for(let i=0; i<names.length; i++){
			let condition = {
				type: 'listData',
				collectionName: names[i]
			}
			let res = await this.$axios.$post('mock/db', { data: condition });
			obj[names[i]] = res.list;
		}
		//console.log('obj', obj);
		commit('UPDATE_COLLECTIONS_DATA', obj);
    },
    async ASYNC_GET_SERVICE({ commit }, lang) {
        let res = await this.$axios.$post('mock/db', {
            data: {
                type: 'listData',
				collectionName: 'service',
            }
        });
        commit('UPDATE_SERVICE', res.list);
    },
}