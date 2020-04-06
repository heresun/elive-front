<template>
    <div>

        <!--搜过框与导航栏-->
        <!--        <div id="bgImg"></div>-->
        <div id="row_head">
            <!-- 顶端导航-->
            <div class="wrapper">

                <el-row>
                    <el-col :span="20" :offset="2">
                        <div>
                            <Header></Header>
                        </div>
                    </el-col>
                </el-row>
                <!--搜索框-->
                <el-row style="margin-top: 50px">
                    <div class="searchImg">
                        <img src="../assets/searchImg.png" style="width: 28%">
                    </div>

                    <div class="searchBox">
                        <span>
                            <input type="text" v-model="input" placeholder="请输入地址开始找房" class="searchInput"/>
                        </span>
                        <span>
                            <el-button type="primary" icon="el-icon-search" class="searchButton">开始找房</el-button>
                        </span>
                    </div>
                </el-row>
            </div>
        </div>

        <div style="height: 20px"></div>

        <el-row>
            <el-button type="primary" @click="$router.replace('/user/profile')">个人主页</el-button>
            <el-button type="primary" @click="$router.replace('/house/info')">房屋详情页</el-button>
            <el-button type="primary" @click="$router.replace('/test')">测试</el-button>
        </el-row>

        <el-row>
            <Footer></Footer>
        </el-row>
    </div>

</template>

<script>
    import Header from "@/components/Header";
    import Footer from "@/components/Footer";

    export default {
        name: 'App',
        components: {
            Header,
            Footer

        },
        data() {
            return {
                state: this.$store.state,
                input: ''
            }
        },
        methods: {}
    }
</script>

<style scoped>

    #container {
        width: 1519px;
    }

    #bgImg {
        background: black url("../assets/background.jpg") no-repeat;
        height: 540px;
        width: 100%;
        z-index: -1;
        /*position: absolute;*/
        background-attachment: fixed;
        background-position: center 0;
        display: block;
        position: relative;
    }

    #row_head {

        background: black url("../assets/background.jpg") no-repeat;
        height: 610px;
        width: 1519.2px;
        padding-top: 30px;
        /*position: absolute;*/
        background-attachment: fixed;
        background-position: center 0;
        display: block;
        position: relative;
    }


    .searchImg {
        display: flex;
        justify-content: center;
        margin-bottom: 80px;
    }

    .searchInput {
        height: 44.4px;
        width: 500px;
        padding-left: 20px;
    }

    .searchBox {
        display: flex;
        justify-content: center;
        /*border-radius: 10px;*/
    }

    .searchButton {
        border-radius: 0px;
        height: 50.5px;
        width: 150px;
    }

</style>
