/* eslint-disable */
var dbServer = require('./index');
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
// 连接数据库
var myUri = 'mongodb://' + dbServer.dbConect.dataUrl + ':' + dbServer.dbConect.dataPort + '/' + dbServer.dbConect.dataName;
if (dbServer.dbConect.username && dbServer.dbConect.password) {
    myUri = myUri = 'mongodb://' + dbServer.dbConect.username + ':' + dbServer.dbConect.password + '@' + dbServer.dbConect.dataUrl + ':' + dbServer.dbConect.dataPort + '/' + dbServer.dbConect.dataName;
}
//useFindAndModify: false
const optionsMongoose = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

mongoose.Promise = Promise;
mongoose.connect(myUri, optionsMongoose);

// 为这次连接绑定事件
const connect = mongoose.connection;
connect.once('error', (err) => console.log('Mongo connection error', myUri, err));
connect.once('open', () => console.log('Mongo connection successed', myUri));

/**cnpm install mongoose@5.2.8 --save 需要此版本 否则会有警告*/
//const autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize(connect);
var Schema = mongoose.Schema;

/*---------计数器-----------*/
var counterScheme = new Schema(dbServer.collections.counters, { collection: 'counters' });
exports.counters = connect.model('counters', counterScheme);

/*---------用户-----------*/
var userScheme = new Schema(dbServer.collections.user, { collection: 'user' });
exports.user = connect.model('user', userScheme);

/*---------时钟管理-----------*/
var timeBlockScheme = new Schema(dbServer.collections.timeBlock, { collection: 'timeBlock' });
exports.timeBlock = connect.model('timeBlock', timeBlockScheme);


exports.connect = connect;
