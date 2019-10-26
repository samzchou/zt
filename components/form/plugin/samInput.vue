<template>
    <el-input size="mini" :type="data.type" v-model="data.value" placeholder="" @change="changeValue" />
</template>
<script>
export default {
    name: "sam-input",
    props: {
        data: Object
    },
    methods: {
        changeValue() {
            this.$emit('change', this.data.value);
        }
    },
}
</script>
