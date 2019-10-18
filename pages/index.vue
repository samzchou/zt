<template>
	<section class="home-container">
        <!--顶部工具条-->
		<div class="tools">
			<div>
				<el-button-group>
					<el-button size="mini" icon="el-icon-back" :type="isCurrWeek===-1?'primary':''" title="上周"
						@click="setWeek(-7)"></el-button>
					<el-button size="mini" icon="el-icon-right" :type="isCurrWeek===1?'primary':''" title="下周"
						@click="setWeek(7)"></el-button>
				</el-button-group>
				<el-button size="mini" :type="isCurrWeek===0?'primary':''" icon="el-icon-news" title="本周"
					@click="setWeek(0, true)" style="margin-left:10px">本周</el-button>
				<div class="canlan">
					<el-date-picker size="mini" v-model="weekDay" type="week" :picker-options="{'firstDayOfWeek': 1}"
						format="yyyy年 第 WW 周" placeholder="选择周" @change="setDay" />
				</div>
				<div class="text" v-if="weekList.length">{{setWeekTitle}},
					{{weekDay && weekDay.getFullYear()}}</div>
			</div>
			<div>
				<el-button-group>
					<el-button size="mini" icon="el-icon-time" :type="viewType===0?'primary':''" title="时钟模式"
						@click="setType(1)"></el-button>
					<el-button size="mini" icon="el-icon-date" :type="viewType==1?'primary':''" title="列表模式"
						@click="setType(0)"></el-button>
                    <el-button size="mini" icon="el-icon-box" title="数据统计" @click="$router.push('/statistical')"></el-button>
				</el-button-group>
			</div>
		</div>
        <!--内容区-->
		<div class="list-content" v-loading="loading">
			<div class="times" id="times-list">
				<ul>
					<li v-for="n in 24" :key="n">
						<div>{{(n-1)<10?'0'+(n-1):n-1}}:00</div>
					</li>
				</ul>
			</div>
			<div class="lists">
                <!--表格grid头部-->
				<div class="header">
					<ul class="week-list">
						<li v-for="(week,idx) in weekList" :key="idx">
							<div class="day">
								<div>{{week.wday}} {{getToday(week.date)}}</div>
								<div>0h of 8h</div>
							</div>
							<div class="pos" />
						</li>
					</ul>
				</div>
                <!--表格内容区-->
				<div class="tables" id="table-lists">
					<el-scrollbar ref="myScrollbar" class="scrollbar">
						<ul class="week-list" id="week-list">
							<li v-for="n in 7" :key="n" :class="{'active':n==2}">
                                <time-col :colIndex="n-1" :ref="`cols-${n-1}`" :dataList="blockList[n-1]||[]" />
							</li>
						</ul>
						<div class="data-window" :class="{'show':showWindow}" :style="setWindowPos">
							<div class="title">
								<span>个人时钟管理数据录入</span>
								<i class="el-icon-close" @click="closeEdit"/>
							</div>
                            <!--数据浮动窗编辑-->
							<time-work :data="currBlock" @close="closeEdit" @saveData="saveData" />
						</div>
					</el-scrollbar>
				</div>
			</div>
		</div>

	</section>
</template>

<script>
import {
	mapState,
	mapMutations
} from 'vuex'

import timeCol from '~/components/userinfo/timeCol';
import timeBlock from '~/components/userinfo/timeBlock';
import timeWork from '~/components/userinfo/timeWork';

export default {
	components: {
		timeCol, timeBlock, timeWork
	},
	data: () => ({
        loading:true,
		weekArray: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
		weekList: [],
		isCurrWeek: 0,
        viewType: 0,
        firstDay:0,
		weekDay: new Date(),
        startDate: '',
        timeData:null,
		blockList: [],
		currBlock: {},
		showWindow: false,
		startRect: {},
		windowPostion: {
			left: 300,
			top: 200
		}
	}),
	computed: {
        ...mapState(['timeutilHeight','locakMinutes','editIndex','editBlock']),
		setWindowPos() {
			return {
				"left": this.windowPostion.left + 'px',
				"top": this.windowPostion.top + 'px',
			}
		},
		setWeekTitle() {
			return moment(this.weekList[0]['date']).format('MM-DD') + '至' + moment(this.weekList[6]['date']).format('MM-DD');
        },
    },
    watch:{
        editBlock:{
            handler(obj){
                if(obj && !_.isEmpty(obj)){
                    //console.log('watch editBlock', obj);
                    this.editBlockInfo();
                }else{
                    this.showWindow = false;
                }
            },
            immediate:true
        }
    },
	methods: {
        // 编辑时间块信息
        editBlockInfo(){
            this.showWindow = true;
            //debugger
            const colIndex = this.editBlock.colIndex;
            const colLi = document.getElementById("week-list").childNodes[colIndex];
            if(colLi){
                this.windowPostion.left = colLi.offsetLeft + colLi.offsetWidth;
                this.windowPostion.top = this.editBlock.rowIndex * this.timeutilHeight;
                const containerWidth = document.getElementById("table-lists").offsetWidth;
                if(this.windowPostion.left + 350 > containerWidth){
                    this.windowPostion.left = colLi.offsetLeft - 350;
                }
            }
        },
		closeEdit() {
			//this.saveData({});
			this.showWindow = false;
        },
        // 保存数据
		saveData() {
            this.blockList = [];
            for(let i=0; i<7; i++){
                let blockList = this.$refs['cols-'+i][0].blockList;
                if(blockList && blockList.length){
                    this.blockList.push(blockList);
                }
            }
            let data = {
                userId:this.$store.state.user.id,
                date:this.calcData(this.weekDay).getTime(),
                content : this.blockList
            }

            console.log('saveData',data);
            //debugger
            let condition = {
                type: 'addData',
                collectionName: 'timeBlock'
            };

            if(this.timeData){
                condition.type = 'updateData';
                data.id = this.timeData.id;
            }
            condition.data = data;

            this.$axios.$post('mock/db', { data: condition }).then(result => {
                //console.log('result', result);
                this.$message.success("保存成功！");
                this.showWindow = false;
            });
		},
		getToday(date) {
			return moment(date).format('MM-DD');
		},
		setWeek(val, thisWeek) {
            this.isCurrWeek = val;
            if(!thisWeek){
                let dp = this.weekDay.setDate(this.weekDay.getDate() + val);
                this.weekDay = new Date(dp);
            }else{
                this.weekDay = new Date();
            }
            this.setWeekList();
		},
		setType(val) {
			this.viewType = val;
		},
		setDay(val) {
			//console.log('setDay', val);
			this.weekDay = val;
			this.setWeekList();
		},
		handleScroll() {
			let scrollbarEl = this.$refs.myScrollbar.wrap;
			let timesList = document.getElementById("times-list");
			scrollbarEl.onscroll = () => {
				timesList.scrollTop = scrollbarEl.scrollTop;
			}
		},
		getNowDay(val) {
			let date = this.calcData(this.weekDay);
			date.setDate(date.getDate() + val);
			return date;
		},
		setWeekList() {
            this.weekList = [];
			var timesStamp = this.weekDay.getTime();
            var currenDay = this.weekDay.getDay();
            this.weekArray.forEach((w, i) => {
                let day = timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7);
				let obj = {
					'wday': w,
					'date': new Date(day)
                }
				this.weekList.push(obj);
            });
            // 获取数据
            this.getList();
            //console.log('dates', this.weekList);
		},
		timeFormat(date, ext) {
			ext = !ext ? '-' : ext;
			var y = date.getFullYear();     // 年
			var m = date.getMonth() + 1;    // 月
			var d = date.getDate();         //日
			return m + ext + d;
		},
		// 获取本周第一天日期
		calcData(date) {
			let weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
			date.setDate(date.getDate() - weekday + 1);
			date.setHours(0, 0, 0, 0);
			return date;
        },
        // 获取已有的数据
        async getList() {
            this.timeData = null;
            this.blockList = [];
			let condition = {
				type: "getData",
				collectionName: "timeBlock",
				data: {
                    date:this.calcData(this.weekDay).getTime(),
                    userId:this.$store.state.user.id
                }
			}
			let result = await this.$axios.$post('mock/db', { data: condition });
			if (result) {
                this.timeData = result;
                this.blockList = result.content;
                console.log('getList', this.blockList);
			}
		}
	},
	mounted() {
		this.setWeekList();
		this.$nextTick(() => {
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
		})
	},
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/home';
</style>
