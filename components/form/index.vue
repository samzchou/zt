
<!--<template>
    <div>
        <component :is="data.component" :data="data" @change="changeValue" />
    </div>
</template>-->

<template>
	<section>
		<el-form class="dynamic-form fake-form">
			<el-row :gutter="formData.gutter">
				<el-col :span="formData.colspan" v-for="item in formData.itemList" :key="item.name">
					<form-item :data="item" />
				</el-col>
			</el-row>
		</el-form>
	</section>
</template>

<script>
import {
	mapState, mapMutations, mapActions
} from 'vuex';
import $bus from '@/util/bus';
import Draggable from 'vuedraggable';
import formItem from './formItem';
export default {
	name: "sam-element",
	components: {
		Draggable, formItem
		//"sam-input": resolve => require(["./samInput.vue"], resolve),
	},
	props: {
		data: Object
	},
	watch: {
		data: {
			handler(obj) {
                this.setFormData();
			},
			immediate: true
		}
	},
	data: () => ({
		formData: {}
	}),
	methods: {
        setFormData(){
            this.formData = _.cloneDeep(this.data);
        },
		changeValue(val) {
			console.log('changeValue', val);
		},
		updateForm() {

		}
    },
    mounted(){
        this.setFormData();
    }
}
</script>
