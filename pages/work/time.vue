<template>
    <section class="work-container">
        <div class="header">
            <div>
                <div>时间钟（工时）列表；根据所属部门员工列出；（非管理者仅列出自己的数据）</div>
                <div>
                    选取年月做查询
                    <!-- <mycalendar :currValue="weekDay" isDropDown /> -->
                </div>
            </div>
            <div>
                <el-button size="mini" type="text">管理我的时间钟</el-button>
            </div>
        </div>
    </section>
</template>

<script>
import mycalendar from '~/components/calendar';
export default {
    components: { mycalendar },
    data:()=>({
        weekDay:new Date()
    }),
    methods:{

    },
    mounted(){
        let wks = this.$global.getWeeks(2019, 10);
        console.log('getWeeks', wks)
        let mm = this.$global.getMondayTime(2019, 10, 0);
        console.log('getMondayTime', mm);
        let ld = this.$global.getLastDay(2019, 10);
        console.log('getLastDay', ld);
    }
}
</script>

<style lang="scss" scoped>
.work-container{
    margin:15px;
    border:1px solid #DDD;
    background-color: #FFF;
    min-height: 300px;
    padding:20px;
    .header{
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #EEE;
        >div{
            display: flex;
            align-items: center;
        }
    }
}
</style>
