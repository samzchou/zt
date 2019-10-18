import VueCookies from 'vue-cookies'
import { Notification } from 'element-ui';

function getCookie(cookies, key) {
    return decodeURIComponent(cookies.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function getRoutePath() {
    return location.pathname.slice(1);
}

// sam + 2019-05-31 =>设置返回错误无需重复弹出提示
var errorhandler = false;

export default function ({ $axios, redirect, store, route }) {
    $axios.onRequest(config => {
        // mock开头走本地模拟数据
        if (config.url.indexOf('mock') === 0) {
            let host = `localhost:${process.env.PORT || 5211}`;
            if (process.browser) {
                host = location.host;
            }
            config.baseURL = `http://${host}/`;
        }

        // Content-Type
        config.headers['Content-Type'] = 'text/plain; charset=UTF-8';
        // 注入token
        if (config.data && config.data.token === false) {
            delete config.data.token;
        } else {
            config.timeout = 1000 * 60 * 3; // sam + 2019-03-21
            let token = process.server ? getCookie(config.headers.common.cookie, 'token') : VueCookies.get('token');

            let requireData = { token: token };
            if (store.state.user && store.state.user.services) {
                let routePath = process.server ? route.path.slice(1) : getRoutePath();
                let { id: serviceId } = store.state.user.services.find(item => item.page === routePath) || {};
                if (serviceId) {
                    requireData.serviceId = '' + serviceId;
                }
            }

            config.data = Object.assign(requireData, config.data);
        }
    });

    $axios.onResponse(config => {
        let resp = config.data;
        // 后端响应数据处理
        if (resp.success === false && !config.config.nothold) {
            // sam + nothold:true 请求发起时附带参数, 返回原始结果
            config.data = undefined;
        } else if (resp.success === true && !config.config.nothold) {
            config.data = resp.response || '';
        } else {
            config.data = resp;
        }
        // 不清楚后台接口的规范,以下逻辑是根据现有接口推测的
        if ((resp.success === true && resp.msgDesc && config.data === '') || resp.success === false) {
            if (!errorhandler) {
                errorhandler = true;
                Notification[resp.success ? "success" : "error"]({ title: resp.msgDesc || resp.msgCode, showClose: false });
                setTimeout(() => {
                    errorhandler = false;
                }, 1000);
            }
            //Notification[resp.success ? 'success' : 'error']({ title: resp.msgDesc || resp.msgCode, showClose: false });
        }

        if (resp.success === false && resp.msgCode === 'AUTHENT_EXPIRED') {
            if (resp.url) redirect(`${process.env.server_url}${resp.url}`);
        }
    });
}