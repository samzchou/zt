<template>
    <section class="grid-container">
        <div class="cols">
            <div v-for="k in 96" :key="k" :class="{'bh':(k-1)%4==0}">
                <div class="show-time">
                    <span @click="createBlock(k-1, $event)">
                        {{getMyTime(k-1)}}
                        <i class="el-icon-plus" title="编辑工作时间" />
                    </span>
                </div>
            </div>
        </div>
        <div class="time-block" v-for="(block,idx) in blockList" :key="idx" :class="{'active':activeIndex==idx}" v-clickoutside="handleClickOutside"
            @click="editMyBlock(idx)" :style="{'top':block.rect.top+'px','height':block.rect.height+'px'}">
            <div class="title">
                <span>上班</span>
                <span class="all-times">all times:{{block.allTimes}}</span>
                <i class="el-icon-close" @click="remove(idx)" />
            </div>
            <div class="desc">
                <div>工作分类：{{getWorkStr('workType', block.type)}}</div>
                <div>项目：{{getWorkStr('workProject', block.project)}}</div>
                <div>备注描述：<br/>{{ block.desc}}</div>
                <div>完成情况：已完成</div>
            </div>
            <div class="resize" @mousedown="handlerMouserDown(idx, $event)" />
        </div>
    </section>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    directives: { Clickoutside },
    props: {
        colIndex: Number,
        dataList: Array
    },
    computed: {
        ...mapState(['workType', 'workProject', 'timeutilHeight', 'locakMinutes', 'editIndex', 'editBlock']),
    },
    watch: {
        editBlock: {
            handler(obj) {
                if (obj && !_.isEmpty(obj) && this.blockList.length) {
                    if (obj.colIndex == this.colIndex) {
                        this.activeIndex = _.findIndex(this.blockList, { 'index': obj.index });
                        this.currBlock = this.blockList[this.activeIndex];
                        // 如果数据有所改变则更新
                        debugger
                        if (!_.isEmpty(this.$global.difference(obj, this.currBlock))) {
                            //
                            this.currBlock = _.cloneDeep(obj);
                            let conditions = this.updatePosition(this.currBlock);
                            this.currBlock = _.merge(this.currBlock, conditions);
                            this.$set(this.blockList, this.activeIndex, this.currBlock);
                            this.$emit('updateList', this.blockList, this.colIndex);
                            //console.log('watch timeCol editBlock', this.currBlock);
                        }
                    }
                }
            },
            immediate: true
        },
        dataList: {
            handler(data) {
                //this.blockList = [];
                if(data && _.isArray(data)){
                    this.blockList = data.map(item => {
                        return item;
                    });
                }
            },
            immediate: true
        }
    },
    data: () => ({
        blockList: [],
        currBlock: {},
        activeIndex: -1,
        dragging: false,
    }),
    methods: {
        ...mapMutations(['UPDATE_EDITINDEX', 'UPDATE_EDITBLOCK', 'UPDATE_EDITINGTIME']),
        getWorkStr(ca, val) {
            //debugger
            if (val) {
                let cat = _.find(this[ca], { "id": val });
                return cat.label;
            }
            return "";
        },
        remove(index) {
            this.$confirm('确定移除该工作时间?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.blockList.splice(index, 1);
                this.UPDATE_EDITBLOCK(null);
            }).catch(() => { });
        },
        updatePosition(obj) {
            let startMin = this.$global.changeMyTimeToMin(obj.startTime); //obj.startTime.split(':')[0];
            let endMin = this.$global.changeMyTimeToMin(obj.endTime);
            let height = (endMin - startMin);
            return {
                "rowIndex": startMin / this.locakMinutes,
                "allTimes": this.getMyTime(height, true),
                "rect": {
                    "height": (height / this.locakMinutes) * this.timeutilHeight,
                    "top": (startMin / this.locakMinutes) * this.timeutilHeight
                }
            }

            console.log(startMin, endMin);
        },
        handleClickOutside() {
            this.activeIndex = -1;
            this.UPDATE_EDITINDEX('');
        },
        getMyTime(str, auto) {
            if (!auto) str = str * this.locakMinutes;
            return ((Math.floor(str / 60)).toString().length < 2 ? "0" + (Math.floor(str / 60)).toString() : (Math.floor(str / 60)).toString()) + ":" + ((str % 60).toString().length < 2 ? "0" + (str % 60).toString() : (str % 60).toString());
        },

        editMyBlock(index) {
            this.activeIndex = index;
            this.currBlock = this.blockList[index];

            this.UPDATE_EDITINDEX(this.colIndex + '-' + this.activeIndex);
            this.UPDATE_EDITBLOCK(_.cloneDeep(this.currBlock));
        },
        createBlock(index, evt) {
            this.activeIndex = this.blockList.length; //this.blockList.length ? this.blockList.length - 1 : 0;
            let target = evt.target.parentElement.parentElement; // 单元格目标
            let obj = {
                index: this.activeIndex,
                colIndex: this.colIndex,
                rowIndex: index,
                rect: {
                    top: index * this.timeutilHeight,
                    height: this.timeutilHeight
                },
                startTime: this.changeHourMinutestr(this.locakMinutes * index),
                endTime: this.changeHourMinutestr(this.locakMinutes * (index + 1)),
                allTimes: this.changeHourMinutestr(this.locakMinutes)
            };
            this.blockList.push(obj);
            this.currBlock = obj;
            //console.log('this.blockList', this.blockList);
            this.$emit('addBlock', this.colIndex, obj);

            this.UPDATE_EDITINDEX(this.colIndex + '-' + this.activeIndex);
            this.UPDATE_EDITBLOCK(_.cloneDeep(this.currBlock));
        },
        changeHourMinutestr(minutes, ext) {
            if (minutes !== "0" && minutes !== "" && minutes !== null) {
                return ((Math.floor(minutes / 60)).toString().length < 2 ? "0" + (Math.floor(minutes / 60)).toString() :
                    (Math.floor(minutes / 60)).toString()) + ":" + ((minutes % 60).toString().length < 2 ? "0" + (minutes % 60).toString() : (minutes % 60).toString());
            }
            else {
                return "";
            }
        },
        // 时间块resize后重新设定时长
        resetTimes(hh) {
            let minutes = (this.currBlock.rect.height / this.timeutilHeight) * this.locakMinutes;
            this.currBlock.endTime = this.changeHourMinutestr((hh + this.currBlock.rowIndex) * this.locakMinutes);
            this.currBlock.allTimes = this.changeHourMinutestr(minutes);
            console.log('this.currBlock', this.currBlock);
            this.UPDATE_EDITBLOCK(_.cloneDeep(this.currBlock));
        },
        handlerMouserDown(index, evt) {
            //debugger
            this.dragging = true;
            this.currBlock = this.blockList[index];
            const blockEle = evt.target.parentElement;
            const blockRect = blockEle.getBoundingClientRect();
            let dragState = {
                startMouseTop: evt.clientY,
                startHeight: this.currBlock.rect.height
            }
            const handleMouseMove = (event) => {
                const deltaTop = event.clientY - dragState.startMouseTop;
                this.currBlock.rect.height = dragState.startHeight + deltaTop;
            }
            const handleMouseUp = () => {
                if (this.dragging) {
                    this.dragging = false;
                }
                // 锁定为常量this.timeutilHeight 的倍数
                let hh = this.currBlock.rect.height / this.timeutilHeight;
                if (!Number.isInteger(hh)) {
                    // 判断是否过半
                    let hg = Math.ceil(hh);
                    if ((hg - hh) < 0.5) {
                        hh = Math.ceil(hh);
                    } else {
                        hh = Math.floor(hh);
                    }
                    this.currBlock.rect.height = hh * this.timeutilHeight;
                }
                this.resetTimes(hh);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.onselectstart = null;
                document.ondragstart = null;
            }
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    }
}
</script>

<style lang="scss" scoped>
//$timeutil-height: 20px; see ~/assets/scss/var
.grid-container {
	position: relative;
	.cols {
		> div {
			height: $timeutil-height;
			box-sizing: border-box;
			border-top: 1px solid #eceef1;
			position: relative;
			&.bh {
				border-color: #d6e3e8;
			}
			&:hover {
				.show-time {
					display: block;
				}
			}
			.show-time {
				pointer-events: none;
				display: none;
				cursor: default;
				user-select: none;
				width: 100%;
				height: $timeutil-height;
				position: absolute;
				top: -11px;
				background: -webkit-linear-gradient(
						top,
						transparent 10px,
						#0a3fff 11px
					),
					-webkit-linear-gradient(left, transparent 10px, transparent
								11px);
				background-size: 11px 11px;
				text-align: center;
				font-size: 9px;
				line-height: $timeutil-height;
				> span {
					pointer-events: auto;
					display: inline-block;
					padding: 0 10px;
					background-color: #fff;
					transform: scale(0.8);
				}
			}
		}
	}
	.time-block {
		//display: none;
		position: absolute;
		left: 10px;
		right: 10px;
		box-sizing: border-box;
		background-color: rgba(245, 245, 245, 0.85);
		border: 1px solid #ddd;
		box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
		transition: all 0.25s;
		user-select: none;
		&.active {
			background-color: #f5faff;
			border-color: #b1ccff;
		}
		.title {
			font-size: 12px;
			line-height: 20px;
			padding: 0 5px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #d4e1ef;
			background-color: #ddeaf7;
			> span {
				transform: scale(0.9);
				&.all-times {
					font-size: 9px;
					color: #658cff;
					bottom: 0;
					right: 0;
					font-family: inherit;
					transform: scale(0.8);
				}
			}
		}
		.desc {
			padding: 5px 0;
			font-size: 12px;
			box-sizing: border-box;
			height: calc(100% - 25px);
			overflow: hidden;
			> div {
				transform: scale(0.9);
				line-height: 22px;
				word-break: break-all;
			}
		}
		.resize {
			position: absolute;
			bottom: -4px;
			width: 30px;
			left: calc(50% - 15px);
			border: 1px solid #d82b07;
			border-width: 1px 0;
			height: 1px;
			cursor: ns-resize;
		}
		.work-desc {
			font-size: 12px;
			padding: 10px;
			box-sizing: border-box;
			overflow: hidden;
			height: 100%;
			.opts {
				font-weight: bold;
				color: #b30a00;
				padding-bottom: 10px;
			}
		}
	}
}
</style>
