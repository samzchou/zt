/* eslint-disable */
export default {
    // 获取本周第一天日期
    calcData(date = newDate()) {
        let weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
        date.setDate(date.getDate() - weekday + 1);
        date.setHours(0, 0, 0, 0);
        return date;
    },
    // 分钟转小时分
    ChangeHourMinutestr(str) {
        if (str !== "0" && str !== "" && str !== null) {
            return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() :
                (Math.floor(str / 60)).toString()) + ":" + ((str % 60).toString().length < 2 ? "0" + (str % 60).toString() : (str % 60).toString());
        } else {
            return "";
        }
    },
    // 分钟转换为
    exChange(mss, ext) {
        let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        if (ext) {
            return hours + ext + minutes;
        }
        return hours + "小时 " + minutes + "分钟";
    },
    // 小时分转分钟
    changeMyTimeToMin(str) {
        let hours = str.split(':')[0];
        let min = str.split(':')[1];
        return Number(hours) * 60 + Number(min);
    },
    setEndTime(satrtDate, minutes) {
        let min = satrtDate.getMinutes();
        satrtDate.setMinutes(min + minutes);
        return satrtDate;
    },
    // 检测两个DOM碰撞情况，created By sam
    hit(source, targets) {
        const sourceRect = source.getBoundingClientRect();
        let arr = [];
        targets.forEach((element, i) => {
            let eleRect = element.childNodes[0].getBoundingClientRect();
            if (Math.round(eleRect.left) >= Math.round(sourceRect.left) && Math.round(eleRect.left) <= Math.round(sourceRect.right) && Math.round(eleRect.top) >= Math.round(sourceRect.top) && Math.round(eleRect.top) < Math.round(sourceRect.bottom)) {
                arr.push(element);
            }
        });
        return arr;
    },
    // 比较两个Object差异,返回一个新的对象，created By sam
    difference(obj1, obj2) {
        const changes = (obj1, obj2) => {
            return _.transform(obj1, (result, value, key) => {
                if (!_.isEqual(value, obj2[key])) {
                    result[key] = (_.isObject(value) && _.isObject(obj2[key])) ? changes(value, obj2[key]) : value;
                }
            });
        }
        return changes(obj1, obj2);
    },
    // 随机产生字符串 xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx，created By sam
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            const d = new Date().getTime().toString(16);
            return v.toString(16);
        })
    },

    getObjXy(obj) {
        let xy = obj.getBoundingClientRect();
        let top = xy.top - document.documentElement.clientTop + document.documentElement.scrollTop,
            bottom = xy.bottom,
            left = xy.left - document.documentElement.clientLeft + document.documentElement.scrollLeft,
            right = xy.right,
            width = xy.width || right - left,
            height = xy.height || bottom - top;
        return {
            top: top,
            right: right,
            bottom: bottom,
            left: left,
            width: width,
            height: height
        }
    },

    // 获取元素绝对坐标值
    getElCoordinate(dom, center) {
        var t = dom.offsetTop;
        var l = dom.offsetLeft;
        var w = dom.offsetWidth;
        var h = dom.offsetHeight;
        dom = dom.offsetParent;
        while (dom) {
            t += dom.offsetTop;
            l += dom.offsetLeft;
            dom = dom.offsetParent;
        };
        return {
            top: center ? (t + h / 2) : t,
            left: center ? (l + w / 2) : l,
        };
    },

    hasClass(ele, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0 || !ele.className) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
    },
    addClass(ele, cls) {
        if (!this.hasClass(ele, cls)) {
            ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
        }
    },
    removeClass(ele, cls) {
        if (this.hasClass(ele, cls)) {
            let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            ele.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },
    toggleClass(ele, cls) {
        if (!this.hasClass(ele, cls)) {
            ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
        } else {
            this.removeClass(ele, cls);
        }
    },
    //获取对应Key的值
    getValueByKey(arr, valueKey, value, key) {
        if (!arr || arr.length < 1) return ''
        var i = 0,
            len = arr.length;
        for (; i < len; i++) {
            if (arr[i][valueKey] === value) {
                return arr[i][key];
            }
        }
        return '';
    },
    formatFileSize(fileSize) {
        if (fileSize < 1024) {
            return fileSize + 'B';
        } else if (fileSize < (1024 * 1024)) {
            var temp = fileSize / 1024;
            temp = temp.toFixed(2);
            return temp + 'KB';
        } else if (fileSize < (1024 * 1024 * 1024)) {
            var temp = fileSize / (1024 * 1024);
            temp = temp.toFixed(2);
            return temp + 'MB';
        } else {
            var temp = fileSize / (1024 * 1024 * 1024);
            temp = temp.toFixed(2);
            return temp + 'GB';
        }
    },

}
