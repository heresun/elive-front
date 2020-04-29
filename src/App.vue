<template>
    <div id="container">

        <router-view></router-view>

    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {

        },
        data() {
            return {

            }
        },
        mounted() {
            // 防止页面刷新导致数据前端丢失
            this.$axios.get("/util/isLogin.do").then(res=>{
                console.log(res)
                if (res.data==false){
                    console.log("您还未登录!")
                }else{
                    console.log(res.data);
                    this.$store.state.globalIsLogin = true;
                    this.$store.state.globalUserId = res.data.id;
                    this.$store.state.globalAccount = res.data.account;
                    this.$store.state.globalHeaderNotState="none";
                    this.$store.state.globalHeaderYesState=""
                    // 获取当前用户的收藏列表
                    this.$axios.get("/collection/all.do?account="+ res.data.account).then(res => {
                        for (let i=0; i < res.data.length; i++){
                            this.$store.state.globalCollections.push(res.data[i].id);
                        }
                    });
                }
            }).catch(err=>{
               console.log(err)
            });
        }
    }
</script>

<style scoped>
    #container {
    }


</style>
