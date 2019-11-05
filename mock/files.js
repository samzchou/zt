/* eslint-disable */
/**
 * mongoDB数据处理后台接口
 */
const fs = require('fs');
const path = require('path');

const dbFun = {
    getFullPath(fielpath) {
        return path.resolve(__dirname, fielpath);
    },

    writeFile(params) {
        let res = '';
        let fileFullName = this.getFullPath("../config/db/collections.js");
        try {
            fs.writeFileSync('c:\\demo\a.txt', new Date());
        } catch (error) {
            // 文件夹不存在，或者权限错误
            console.log(error);
        }
        return {
            success: true,
            response: 111
        }
    },
    openFile(params) {
        let fileFullName = this.getFullPath("../config/db/collections.js");
        let filedata = fs.readFileSync(fileFullName, 'utf-8');
        console.log('openFile', filedata);
        return {
            success: true,
            response: filedata
        }
    }
}

module.exports = ({ data }) => {
    return new Promise((resolve, reject) => {
        dbFun[data.type](data).then(result => {
            resolve(result);
        });
    });
}
