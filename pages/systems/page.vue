<template>
    <section>
        <div v-loading="!isInit">
            <template v-if="isInit">
                <page-data v-if="!notFound" :data="pageForm" :listParam="listParam" />
                <div v-else class="page-error">对不起，系统无法定位要具体页面，请核查参数！</div>
            </template>
            <!-- <sam-page :data="pageForm" :listParam="listParam" :isRelease="true" /> -->
        </div>
    </section>
</template>

<script>
//import samPage from '~/components/page';
import pageData from '~/components/page/data';
export default {
    name: "sys-page",
    components: {
        pageData
    },
    data: () => ({
        isInit: false,
        pageForm: null,
        notFound: false,
        listParam: {}
    }),
    methods: {
        async getPage() {
            let condition = {
                type: 'getData',
                collectionName: 'pageList',
                data: {
                    "id": this.$route.query.id
                }
            };
            let result = await this.$axios.$post('mock/db', { data: condition });
            //console.log('getPage', result)
            if (!result) {
                //this.$alert("无法定位到具体页面！请核查问题");
                this.notFound = true;
            } else {
                this.pageForm = Object.assign({}, result.content);
                let cn = {
                    type: 'getData',
                    collectionName: 'formList',
                    data: {
                        "id": result.content.formid
                    }
                };
                let form_content = await this.$axios.$post('mock/db', { data: cn });
                this.pageForm.content = form_content.content;
            }
            this.isInit = true;
        }
    },
    mounted() {
        this.getPage();
    }

}
</script>