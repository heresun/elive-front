<template>
    <div id="container">
        <!--导航头-->
        <el-row>
            <div>
                <Navigator></Navigator>
            </div>
        </el-row>
        <!--内容-->
        <div style="height: 50px"></div>
        <el-row>
            <el-col :span="16" :offset="4">
                <el-container>
                    <el-aside class="aside" width="152px">
                        <el-row>
                            <div align="center">
                                <img src="../assets/timg.jpg" alt="" style="width: 80px; height: 80px">
                            </div>
                            <div style="text-align: center;margin: 10px auto">欢迎你,
                                {{$store.state.globalAccount.substr(0,3)+"****"+$store.state.globalAccount.substr(8)}}
                            </div>
                        </el-row>
                        <el-row>
                            <ul>
                                <li @click="$router.replace('/')">
                                    回到首页
                                </li>
                                <li :class="{active:flag==='collection'}" @click="showSelected('collection')">
                                    收藏的房源
                                </li >
                                <li :class="{active:flag==='publishedHouse'}" @click="showSelected('publishedHouse')">
                                    发布的房源
                                </li >
                                <li :class="{active:flag==='transaction'}" @click="showSelected('transaction')">
                                    交易记录
                                </li>
                                <li :class="{active:flag==='contract'}" @click="showSelected('contract')">
                                    我的合同
                                </li>
                                <li :class="{active:flag==='appointment'}" @click="showSelected('appointment')">
                                    我的预约
                                </li>
                                <li :class="{active:flag==='inspection'}" @click="showSelected('inspection')">
                                    看房记录
                                </li>
                                <li :class="{active:flag==='editInfo'}" @click="showSelected('editInfo')">
                                    编辑资料
                                </li>

                            </ul>
                        </el-row>

                    </el-aside>
                    <el-main class="main">
                        <Collection :style="`display:${profileList.collection}`"></Collection>
                        <Transaction :style="`display:${profileList.transaction}`"></Transaction>
                        <Contract :style="`display:${profileList.contract}`"></Contract>
                        <Appointment :style="`display:${profileList.appointment}`"></Appointment>
                        <Inspection :style="`display:${profileList.inspection}`"></Inspection>
                        <EditInfo :style="`display:${profileList.editInfo}`"></EditInfo>
                        <PublishedHouse :style="`display:${profileList.publishedHouse}`"></PublishedHouse>
                    </el-main>
                </el-container>
            </el-col>

        </el-row>
        <!--页脚-->
        <el-row style="margin-top: 100px">
            <Footer></Footer>
        </el-row>

    </div>
</template>

<script>
    import Navigator from "@/components/common/Navigator";
    // 收藏
    import Collection from "@/components/profile/Collection";
    //交易
    import Transaction from "@/components/profile/Transaction";
    // 合同
    import Contract from "@/components/profile/Contract";
    // 预约
    import Appointment from "@/components/profile/Appointment";
    // 看房记录
    import Inspection from "@/components/profile/Inspection";
    // 编辑资料
    import EditInfo from "@/components/profile/EditInfo";
    // 用户发布的房源
    import PublishedHouse from "@/components/profile/PublishedHouse";

    import Footer from "@/components/common/Footer";
    export default {
        name: "Profile",
        data() {
            return {
                profileList:{
                    transaction: "none",
                    collection: "none",
                    contract: "none",
                    appointment: "none",
                    editInfo: "none",
                    inspection: "none",
                    publishedHouse: "none"
                },
                flag:""
            }
        },
        components: {
            Navigator,
            Collection,
            Transaction,
            Contract,
            Appointment,
            Inspection,
            EditInfo,
            Footer,
            PublishedHouse
        },
        methods: {
            showSelected(val) {
                this.flag=val;
                switch (val) {
                    case "collection":
                        this.hiddenAllCom();
                        this.profileList.collection = "";
                        break;
                    case "transaction":
                        this.hiddenAllCom();
                        this.profileList.transaction = "";
                        break;
                    case "contract":
                        this.hiddenAllCom();
                        this.profileList.contract = "";
                        break;
                    case "appointment":
                        this.hiddenAllCom();
                        this.profileList.appointment = "";
                        break;
                    case "inspection":
                        this.hiddenAllCom();
                        this.profileList.inspection = "";
                        break;
                    case "editInfo":
                        this.hiddenAllCom();
                        this.profileList.editInfo = "";
                        break;
                    case "publishedHouse":
                        this.hiddenAllCom();
                        this.profileList.publishedHouse = "";
                        break;
                    default:
                        this.hiddenAllCom();
                        this.profileList.collection = "";
                }
            },

            hiddenAllCom(){
                let myObj = this.profileList;
                Object.getOwnPropertyNames(myObj).forEach(function(key){
                    myObj[key] = "none";
                })
            }
        },
        beforeCreate(){
            this.$axios.get("/util/isLogin.do").then(res=>{
                if (!res.data){
                    this.$router.push("/");
                }
            }).catch(err=>{
                console.log(err)
            });
        },

        mounted(){

            this.showSelected("collection");
        }

    }
</script>

<style scoped>
    #container {
        background-color: #f5f5f5;
        font-size: 14px;
        color: #333;
        font-family: "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", 'Segoe UI', Tahoma, "宋体b8b\4f53", SimSun, sans-serif;
        text-rendering: optimizeLegibility;
        width: 1519px;
    }

    ul {
        padding: 0px;
    }

    ul > li {
        list-style: none;
        text-align: left;
        padding: 15px 25px;
        cursor: pointer;

    }


    ul > li:hover {
        background-color: #39ac6a;
        color: white;

    }

    .active{
        background-color: #39ac6a;
        color: white;
    }

    .aside {
        background: white;
        height: 575px;
        padding: 35px 0 9px;
        box-shadow:0 0 1px gray;
    }

    .main {

    }

    a {
        text-decoration: none;
    }

    a:visited {
        color: #000000;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
        color: white;
    }
</style>