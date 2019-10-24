<template>
    <div>
        <component :is="data.component" :data="data" @change="changeValue" />
    </div>
</template>

<script>
/* import {
    samInput
} from './element'; */
export default {
    name: "sam-element",
    components: {
        //samInput
        "sam-input": resolve => require(["./samInput.vue"], resolve),
    },
    props: {
        data: Object
    },
    data: () => ({

    }),
    methods: {
        changeValue(val) {
            console.log('changeValue', val);
        }
    }
}
</script>
