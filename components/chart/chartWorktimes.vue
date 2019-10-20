<template>
    <section class="chart-container">
        <no-ssr>
            <echart :options="chartItem" ref="myEchart" :autoresize="true" />
        </no-ssr>
    </section>
</template>

<script>
const chartSample = require('~/config/chartSample');
export default {
    name: "chart-worktimes",
    data: () => ({
        chartItem: chartSample['line-standard']
    })
}
</script>

<style lang="scss" scoped>
.chart-container {
	width: 100%;
	/deep/ .echarts {
		width: 100%;
	}
}
</style>
