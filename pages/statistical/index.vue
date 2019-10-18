<template>
	<section class="statistical-container">
		<div class="header">
			<div class="dates">
				<el-button size="mini" icon="el-icon-d-arrow-left" title="上月" />
				<el-date-picker size="mini" v-model="value1" type="daterange" range-separator="至"
					start-placeholder="开始日期" end-placeholder="结束日期" />
				<el-button size="mini" icon="el-icon-d-arrow-right" title="下月" />
			</div>
			<div class="btns">btns</div>
		</div>
		<div class="tables">
			<table>
				<thead>
					<tr>
						<th class="title">工作主题</th>
						<th>sd</th>
						<th>sd</th>
						<th>sd</th>
						<th>sd</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>ssd</td>
						<td>ssd</td>
						<td>ssd</td>
						<td>ssd</td>
						<td>ssd</td>
					</tr>
				</tbody>
			</table>
		</div>
        <div class="total"></div>
	</section>
</template>

<script>
export default {
	data: () => ({
		value1: "",
	}),
	mounted() {

	}
}
</script>

<style lang="scss" scoped>
.statistical-container {
	.header {
		height: 40px;
		border-bottom: 1px solid #e8eaec;
		display: flex;
		padding: 0 20px;
		box-sizing: border-box;
		background-color: #f2f6ff;
		.dates {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.btns {
			flex: 0 0 150px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
	.tables {
        padding: 15px;
		table {
			width: 100%;
			table-layout: fixed;
            border-collapse: separate;
            th,td{
                font-size:12px;
                font-weight: normal;
                display: table-cell;
                padding: 5px 0;
                min-width: 0;
                box-sizing: border-box;
                text-overflow: ellipsis;
                vertical-align: middle;
                position: relative;
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                user-select: none;
                background-color: #fff;
                border-bottom: 1px solid #ebeef5;
            }
		}
	}
}
</style>
