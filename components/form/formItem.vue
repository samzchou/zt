<template>
    <component :is="data.component" :data="data" />
</template>

<script>
export default {
    name :"form-item",
    components:{
        "sam-input": resolve => require(["./plugin/samInput.vue"], resolve),
        "sam-select": resolve => require(["./plugin/samSelect.vue"], resolve),
    },
    props:{
        data:Object
    },
    data:()=>({

    }),
    methods:{
        /* setItemData(){
            this.itemData = _.cloneDeep(this.data);
        } */
    }
}
</script>
