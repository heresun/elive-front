
<template>
    <div>


    <el-button type="primary" @click="getImages">
        getImages
    </el-button>

    <el-tabs :tab-position="top">
        <el-tab-pane label="用户管理">
            会尽快离开就和
        </el-tab-pane>
        <el-tab-pane label="配置管理">
            啊打发打发
        </el-tab-pane>
        <el-tab-pane label="角色管理">
            去微软
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿">
            健康路与
        </el-tab-pane>
    </el-tabs>
    </div>
</template>
<script>
    export default {
        name: 'Test',
        components:{
        },
        data() {
            return {
                tabPosition: 'left',
                url:""
            };
        },
        methods:{
            upload(){
                let file = this.$refs.sundehui.$refs.input.files[0];
                console.log(file)
            },

            getImages(){
                this.$axios.get("/image/url/ZF23036049610999/api.do").then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    };
</script>

<style scoped>

</style>