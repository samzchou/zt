<template>
    <section>
        <div>
            <el-input v-model="msg" />
            <el-button type="primary" @click="sendMsg">发送socket消息</el-button>
        </div>
        <div></div>
    </section>
</template>

<script>
import Draggable from 'vuedraggable';
import {
    mapState, mapMutations, mapActions
} from 'vuex';
import opts from '~/config/options';

import WebSocket from '~/util/webSocket';

export default {
    components: {
        Draggable,
        "sam-input": resolve => require(["../components/form/plugin/samInput.vue"], resolve),
        "sam-select": resolve => require(["../components/form/plugin/samSelect.vue"], resolve),
        "sam-date": resolve => require(["../components/form/plugin/samDate.vue"], resolve),
    },
    computed: {
        ...mapState('forms', ['currItem', 'currForms']),
    },
    data() {
        return {
            socketIO: null,
            msg: ""
        };
    },
    methods: {
        sendMsg() {
            this.socketIO.send({ event: 'todo', rp: this.msg })
        },
        initWebSocket() {
            var array = [1, 2, 3, 4, 6];
            array.splice(0, 1);
            console.log('array', array);
            this.socketIO = new WebSocket();
            this.socketIO.onmessage((data) => {
                console.log('%c%s', 'color:green;', '客户端接收到消息：' + JSON.stringify(data));
                if (typeof (this[data.topic]) != "function" || !data) {
                    return;
                }
                this[data.topic](data);
            });
        },
    },

    mounted() {
        //this.setFormData();
        this.$nextTick(() => {
            //this.options = opts['citys'];
        });
        this.initWebSocket();
    },
    beforeDestroy() {
        this.socketIO = null;
    },

}
</script>