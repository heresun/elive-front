<template>


    <div id="container">
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
        <!--==================================================================================================================-->
        <el-row style="background-color: #39ac6a">

            <el-col :span="2" :offset="4">
                <img src="../assets/eeSmall.png"
                     style="width: 100px;vertical-align: central;margin: 3px auto 1px auto"/>
            </el-col>
            <el-col :span="12" class="navText">
                <ul>
                    <li>
                        <router-link to="/" class="router-link-active"><span class="text">主 页</span></router-link>
                    </li>
                    <li>
                        <span class="text" @click="rentHouse">租 房</span>
                    </li>
                    <li><span class="text" @click="buyHouse">买 房</span></li>
                    <li><span class="text" @click="publishHouse">发布房源</span></li>
                    <li><span class="text" @click="layoutAnalysis">户型分析</span></li>
                    <li><span class="text" @click="priceAnalysis">房价分析</span></li>
                </ul>

            </el-col>


            <!--如果当前还未登录，显示-->

            <el-col :span="2" :style="`display:${$store.state.globalHeaderNotState}`" class="navText">

                <span style="color:white;font-size: 12px;cursor: pointer;margin-right: 10px"
                      @click="$store.state.globalLoginDialogVisible=true">
                    <i class="el-icon-s-custom"> 登 录</i>
                </span>
                <span style="color:white;font-size: 12px;cursor: pointer"
                      @click="$store.state.globalSignDialogVisible=true">
                    <i style="font-style: normal">注 册</i>
                </span>
            </el-col>


            <!--如果当前已经登录，显示-->

            <el-col :span="2" :style="`display:${$store.state.globalHeaderYesState}`" class="navText">
                <span style="color:white;font-size: 12px;cursor: pointer;margin-right: 10px">
                    <router-link to="/user/profile" class="router-link-active">
                        <i class="el-icon-s-custom "> {{$store.state.globalAccount.substr(0,4)+'...'}}</i>
                    </router-link>
                </span>
                <span style="color:white;font-size: 12px;cursor: pointer" @click="logout">
                    <i style="font-style: normal">退 出</i>
               </span>
            </el-col>


        </el-row>

    </div>
</template>

<script>
    import Login from "@/pages/Login";
    import Sign from "@/pages/Sign";

    export default {
        name: "Navigator",
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
                this.$axios.post("/user/logout")
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
                if (!this.state.globalIsLogin){
                    this.state.globalLoginDialogVisible = true;
                    return;
                }
                this.$router.push("/house/publish");
            },
            rentHouse(){
                if (!this.state.globalIsLogin){
                    this.state.globalLoginDialogVisible = true;
                    return;
                }
                this.$router.push("/house/rent");
            },

            buyHouse(){
                if (!this.state.globalIsLogin){
                    this.state.globalLoginDialogVisible = true;
                    return;
                }
                this.$router.push("/house/buy");
            },
            layoutAnalysis(){
                if (!this.state.globalIsLogin){
                    this.state.globalLoginDialogVisible = true;
                    return;
                }
                this.$router.push("/house/analysis/layout");
            },

            priceAnalysis(){
                if (!this.state.globalIsLogin){
                    this.state.globalLoginDialogVisible = true;
                    return;
                }
                this.$router.push("/house/analysis/price");
            }
        }
    }
</script>

<style scoped>
    #container {
        width: 1519px;
    }

    a {
        text-decoration: none;
        color: white;
    }

    ul {
        padding: 0px;
        margin: 0px;
        align-content: center;
        margin-left: 100px
    }

    ul > li {
        list-style: none;
        float: left;
        margin-left: 40px;
        color: white;
        font-size: 16px;
        font-weight: 700;
    }

    .text {
        font-size: 16px;
        /*font-family: "黑体";*/
        font-weight: 700;
        cursor: pointer;
    }

    .navText {
        height: 37.4px;
        padding-top: 8.3px
    }


</style>