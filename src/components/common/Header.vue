<template>
    <div id="nav">
        <!--登录模态框-->
        <el-dialog id="login" title="登录" :visible.sync="$store.state.globalLoginDialogVisible"
                   :close-on-click-modal="false" :center="true" :destroy-on-close="true" width="400px">
            <el-row type="flex" justify="center">
                <el-col>
                    <Login></Login>
                </el-col>

            </el-row>
        </el-dialog>
        <!--注册模态框-->
        <el-dialog id="sign" title="注册" :visible.sync="$store.state.globalSignDialogVisible"
                   :close-on-click-modal="false" :center="true" :destroy-on-close="true" width="450px">
            <el-row type="flex" justify="center">
                <el-col>
                    <Sign></Sign>
                </el-col>

            </el-row>
        </el-dialog>


        <!--如果当前还未登录，显示-->
        <el-row justify="end" type="flex" :style="`display:${$store.state.globalHeaderNotState}`">
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="0">
                <span style="color:white;font-size: 12px;cursor: pointer"
                      @click="$store.state.globalLoginDialogVisible=true">
                    <i class="el-icon-s-custom"> 登 录</i></span>
            </el-col>


            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="0">
               <span style="color:white;font-size: 12px;cursor: pointer"
                     @click="$store.state.globalSignDialogVisible=true">
                    <i style="font-style: normal"> 注册</i></span>
            </el-col>
        </el-row>


        <!--如果当前已经登录，显示-->
        <el-row type="flex" justify="end" :style="`display:${$store.state.globalHeaderYesState}`">
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="0" style="margin-right: 10px">
                <span style="color:white;font-size: 12px;cursor: pointer">
                    <router-link to="/user/profile" class="router-link-active">
                        <i class="el-icon-s-custom">{{$store.state.globalAccount}}</i>
                    </router-link>
                </span>
            </el-col>


            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="0">
               <span style="color:white;font-size: 12px;cursor: pointer" @click="logout">
                    <i style="font-style: normal">退 出</i></span>
            </el-col>

        </el-row>
        <div style="height: 10px"></div>
        <el-row type="flex" justify="end" >
            <el-col :span="10">
                <div >
                    <img src="../../assets/ee.png" width="120">
                </div>
            </el-col>

            <el-col :span="12">
                <ul>
                    <li>
                        <router-link to="/" class="router-link-active"><span class="text">主 页</span></router-link>
                    </li>
                    <li><span class="text" @click="buyNewHouse">新 房</span></li>
                    <li><span class="text" @click="buyUsedHouse">二手房</span></li>
                    <li><span class="text" @click="publishHouse">发布房源</span></li>
                    <li><span class="text" @click="layoutAnalysis">户型分析</span></li>
                    <li><span class="text" @click="priceAnalysis">房价分析</span></li>
                </ul>
            </el-col>

        </el-row>

    </div>
</template>

<script>
    import Login from "@/components/login_sign/Login";
    import Sign from "@/components/login_sign/Sign";

    export default {
        name: "Header",
        components: {
            Login,
            Sign
        },
        data() {
            return {
                state: this.$store.state
            };
        },
        methods: {
            logout() {
                this.$axios.post("/user/logout.do")
                    .then(response => {
                        if (response.data === "ok") {

                            this.state.globalIsLogin = false;
                            this.state.globalHeaderNotState = "";
                            this.state.globalHeaderYesState = "none";
                            this.state.globalAccount = "";

                            this.$message.success("退出成功！");
                            //返回主页
                            this.$router.replace("/");
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            publishHouse(){

                this.$router.push("/house/publish");
            },


            buyNewHouse(){

                this.$router.push("/house/onSaleNew");
            },
            buyUsedHouse(){

                this.$router.push("/house/onSaleUsed");
            },
            layoutAnalysis(){

                this.$router.push("/house/analysis/layout");
            },

            priceAnalysis(){

                this.$router.push("/house/analysis/price");
            }

        }


    }
</script>

<style scoped>

    .text {
        font-size: 16px;
        /*font-family: "黑体";*/
        font-weight: 700;
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: white;
    }


    ul > li {
        list-style: none;
        float: left;
        margin-left: 30px;
        color: white;
        font-size: 16px;
        font-weight: 700;
    }

</style>