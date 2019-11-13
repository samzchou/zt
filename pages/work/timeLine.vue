<template>
    <section class="home-container">
        <!--顶部工具条-->
        <div class="tools">
            <div>
                <el-button-group>
                    <el-button size="mini" icon="el-icon-back" :type="isCurrWeek===-1?'primary':''" title="上周" @click="setWeek(-7)"></el-button>
                    <el-button size="mini" icon="el-icon-right" :type="isCurrWeek===1?'primary':''" title="下周" @click="setWeek(7)"></el-button>
                </el-button-group>
                <el-button size="mini" :type="isCurrWeek===0?'primary':''" icon="el-icon-news" title="本周" @click="setWeek(0, true)" style="margin-left:10px">本周</el-button>
                <div class="canlan">
                    <el-date-picker size="mini" v-model="weekToDay" type="week" :picker-options="{'firstDayOfWeek': 1}" format="yyyy年 第 WW 周" placeholder="选择周" @change="setDay" />
                </div>
                <div class="text" v-if="weekList.length">{{setWeekTitle}}</div>
                <div class="all-times">allTimes</div>
            </div>
            <div>
                <el-button size="mini" icon="el-icon-time" type="primary" @click="saveData" style="margin-right:20px;">
                    保存</el-button>
                <el-button-group>
                    <el-button size="mini" icon="el-icon-time" :type="viewType===0?'primary':''" title="时钟模式" @click="setType(1)"></el-button>
                    <el-button size="mini" icon="el-icon-date" :type="viewType==1?'primary':''" title="列表模式" @click="setType(0)"></el-button>
                    <el-button size="mini" icon="el-icon-box" title="数据统计" @click="showStatistical"></el-button>
                </el-button-group>
            </div>
        </div>
        <!--内容区-->
        <div class="list-content">
            <div class="times" id="times-list">
                <ul>
                    <li v-for="n in 24" :key="n">
                        <div>{{(n-1) < 10? '0'+(n-1):n-1}}:00</div>
                    </li>
                </ul>
            </div>
            <div class="lists" v-if="weekList.length">
                <!--表格grid头部-->
                <div class="header">
                    <ul class="week-list">
                        <li v-for="(week,idx) in weekList" :key="idx">
                            <div class="day" :class="{'active':checkAtive(idx)}">
                                <div>{{week.wday}} {{getToday(week.date)}}</div>
                                <div class="total-times">
                                    <el-link type="danger">补卡</el-link>
                                    <span>{{changeHourMinutestr(week.allTimes)}}</span>
                                </div>
                            </div>
                            <div class="pos" :class="{'active':checkAtive(idx)}" />
                        </li>
                    </ul>
                </div>
                <!--表格内容区-->
                <div class="tables" id="table-lists">
                    <el-scrollbar ref="myScrollbar" class="scrollbar">
                        <ul class="week-list" id="week-list">
                            <li v-for="n in 7" :key="n" :class="{'active':checkAtive(n-1)}">
                                <time-col :colIndex="n-1" :ref="`cols-${n-1}`" :time="weekList[n-1]" :dataList="timeBlockList[n-1]?timeBlockList[n-1]['list']:[]" @addBlock="addBlock" @updateList="updateList" />
                            </li>
                        </ul>
                        <div class="data-window" :class="{'show':showWindow}" :style="setWindowPos">
                            <div class="title">
                                <span>个人时钟管理数据录入</span>
                                <i class="el-icon-close" @click="closeEdit" />
                            </div>
                            <!--数据浮动窗编辑-->
                            <time-work @close="closeEdit" />
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import timeCol from '~/components/userinfo/timeCol';
import timeWork from '~/components/userinfo/timeWork';

export default {
    components: {
        timeCol, timeWork
    },
    data: () => ({
        isInit: false,
        loading: true,
        weekList: [],
        isCurrWeek: 0,
        viewType: 0,
        firstDay: 0,
        weekToDay: undefined, // 本周第一天
        startDate: '',
        timeData: null,
        timeBlockList: [],
        currBlock: {},
        showWindow: false,
        startRect: {},
        windowPostion: {
            left: 300,
            top: 200
        }
    }),
    computed: {
        ...mapState('timeWork', ['weekArray', 'timeutilHeight', 'locakMinutes', 'editIndex', 'editBlock', 'isEditTime', 'rangeTime']),
        setWindowPos() {
            return {
                "left": this.windowPostion.left + 'px',
                "top": this.windowPostion.top + 'px',
            }
        },
        setWeekTitle() {
            return moment(this.weekList[0]['date']).format('YYYY-MM-DD') + '至' + moment(this.weekList[6]['date']).format('YYYY-MM-DD');
        },
    },
    watch: {
        editBlock: {
            handler(obj) {
                if (obj && !_.isEmpty(obj) && this.isEditTime) {
                    this.editBlockInfo();
                } else {
                    this.showWindow = false;
                }
            },
            immediate: true
        },
        rangeTime: {
            handler(obj) {
                if (!_.isEmpty(obj)) {
                    this.weekToDay = obj.startTime;
                    this.setWeekList();
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapMutations('timeWork', ['UPDATE_EDITINGTIME']),
        ...mapActions('timeWork', ['ASYNC_GTETIME_RANGE']),
        updateList(list, colIndex) {
            this.$set(this.timeBlockList, colIndex, list);
        },
		/**
		 * 设置一周（从周一开始）
		 * @params val:number 加减值; thisWeek:boolean 是否本周
		 */
        setWeek(val, thisWeek) {
            this.isCurrWeek = val;
            let date = new Date(this.weekToDay);
            if (!thisWeek) {
                let dp = date.setDate(date.getDate() + val);
                this.weekToDay = new Date(dp).getTime();
            } else {
                this.weekToDay = this.rangeTime.startTime;
            }
            this.setWeekList();
        },
        // 判断是否是今天
        checkAtive(index) {
            if (this.rangeTime) {
                return this.weekList[index]['date'] == this.rangeTime.startTime;
            }
        },
        // 将毫秒数转换成小时分
        changeHourMinutestr(milliseconds) {
            milliseconds = !milliseconds ? 0 : milliseconds;
            return this.$global.ChangeHourMinutestr(milliseconds);
        },
        showStatistical() {
            this.$storage.session.set('weekList', this.weekList);
            this.$router.push('/work/time');
        },
        // 新增时间钟数据
        addBlock(colIndex, blockObj) {
            if (!this.timeBlockList[colIndex]) {
                this.timeBlockList[colIndex] = {
                    list: []
                };
            }
            this.timeBlockList[colIndex]['list'].push(blockObj);
        },
        // 编辑时间块信息
        editBlockInfo() {
            this.showWindow = true;
            const colIndex = this.editBlock.colIndex;
            const colLi = document.getElementById("week-list").childNodes[colIndex];
            if (colLi) {
                this.windowPostion.left = colLi.offsetLeft + colLi.offsetWidth;
                this.windowPostion.top = this.editBlock.rowIndex * this.timeutilHeight;
                const containerWidth = document.getElementById("table-lists").offsetWidth;
                if (this.windowPostion.left + 350 > containerWidth) {
                    this.windowPostion.left = colLi.offsetLeft - 350;
                }
                this.calcAllTimes();
            }
        },
        // 取消关闭
        closeEdit() {
            console.log('this.editBlock')
            this.UPDATE_EDITINGTIME(false);
            this.showWindow = false;
        },
        // 计算每天的总工时
        calcAllTimes(list) {
            list = !list ? this.getAlltimeBlockList() : list;
            list.forEach((block, i) => {
                this.weekList[i]['allTimes'] = this.$global.getAllTimes(block.list);
            })
            console.log('calcAllTimes', this.weekList);
        },
        getAlltimeBlockList() {
            let dataArr = [];
            for (let i = 0; i < 7; i++) {
                let blockList = this.$refs['cols-' + i][0].blockList;
                dataArr.push({
                    date: this.weekList[i]['date'],
                    list: blockList
                });
            }
            return dataArr;
        },
        // 保存数据
        saveData() {
            debugger
            let dataArr = this.getAlltimeBlockList();
            let data = {
                userId: this.$store.state.user.id,
                startdate: this.weekList[0]['date'],
                enddate: this.weekList[6]['date'] + 24 * 60 * 60 * 1000 - 1,
                content: dataArr
            }
            let condition = {
                type: 'addData',
                collectionName: 'timeBlock'
            };
            if (this.timeData) {
                condition.type = 'updateData';
                data.id = this.timeData.id;
            }
            condition.data = data;

            this.$axios.$post('mock/db', { data: condition }).then(result => {
                console.log('result', result);
                this.timeData = result;
                this.$message.success("保存成功！");
                this.showWindow = false;
            });
        },
        getToday(date) {
            return moment(date).format('MM-DD');
        },

        setType(val) {
            this.viewType = val;
        },
        // 从日期选择器中设置
        setDay(date) {
            this.weekToDay = date.getTime();
            this.setWeekList();
        },
        handleScroll() {
            this.$nextTick(() => {
                //this.handleScroll();
                if (!this.isInit) {
                    this.isInit = true;
                    window.onresize = () => {
                        this.$refs.myScrollbar.update();
                    }
                    setTimeout(() => {
                        this.startRect = this.$refs.myScrollbar.wrap.getBoundingClientRect();
                        let hours = new Date().getHours();
                        this.$refs.myScrollbar.wrap.scrollTop = hours * this.timeutilHeight * 4;
                        this.loading = false;
                    }, 1000);
                }

                let scrollbarEl = this.$refs.myScrollbar.wrap;
                let timesList = document.getElementById("times-list");
                scrollbarEl.onscroll = () => {
                    timesList.scrollTop = scrollbarEl.scrollTop;
                }
            })


        },
        getNowDay(val) {
            let date = this.$global.calcData(this.weekToDay);
            date.setDate(date.getDate() + val);
            return date;
        },
        // 设置一周的其实和终止时间
        setWeekList() {
            this.timeBlockList = [];
            this.weekList = [];
            let currenDay = new Date(this.weekToDay).getDay();
            this.weekArray.forEach((w, i) => {
                let day = this.weekToDay + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7);
                let st = new Date(day).getTime();
                let obj = {
                    'wday': w,
                    'date': st,
                    'allTimes': 0
                }
                this.weekList.push(obj);
            });
            console.log('setWeekList', this.weekList)
            // 获取数据
            this.getList();
        },
        // 获取已有的数据
        async getList() {
            this.timeData = null;
            let condition = {
                type: "getData",
                collectionName: "timeBlock",
                data: {
                    startdate: this.weekList[0]['date'],
                    userId: this.$store.state.user.id
                },
                nothold: true
            }
            let result = await this.$axios.$post('mock/db', { data: condition }, { "nothold": true });

            if (result) {
                this.timeData = result;
                this.timeBlockList = result.content;
                this.calcAllTimes(this.timeBlockList);

                this.handleScroll();
            }
        }
    },
    beforeMount() {
        // 获取服务器的时间
        this.ASYNC_GTETIME_RANGE();
    },
    mounted() {
        /* this.$nextTick(() => {
            this.handleScroll();
            window.onresize = () => {
                this.$refs.myScrollbar.update();
            }
            setTimeout(() => {
                this.startRect = this.$refs.myScrollbar.wrap.getBoundingClientRect();
                let hours = new Date().getHours();
                this.$refs.myScrollbar.wrap.scrollTop = hours * this.timeutilHeight * 4;
                this.loading = false;
            }, 1000);
        }) */
    },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/mytimes';
</style>
