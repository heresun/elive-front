<template>
    <div id="container">
        <el-row>
            <Navigator color="#394043"></Navigator>
        </el-row>
        <div class="headDiv">
            <el-row>
                <el-col :span="18" :offset="3">
                    <ul>
                        <li >我要卖房</li>
                    </ul>
                </el-col>
            </el-row>
            <el-row class="headText">
                {{contentHead}}
            </el-row>
        </div>

        <el-row>
            <el-col :span="16" :offset="4">
                <div>
                    <SaleHouse></SaleHouse>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="16" :offset="4">
                <div>

                </div>
            </el-col>
        </el-row>
        <div style="height: 100px"></div>
        <el-row>
            <Footer></Footer>
        </el-row>
    </div>
</template>

<script>
    import Navigator from "@/components/common/Navigator";
    import SaleHouse from "@/components/publish/SaleHouse";
    import Footer from "@/components/common/Footer";
    export default {
        name: "PublishHouse",
        components: {
            Navigator,
            SaleHouse,
            Footer
        },
        data() {
            return {
                contentHead: "发布售卖房源",
                saleHouse: "",
                leaseHouse: "none",
            }
        },


        methods: {

        }
    }
</script>

<style scoped>

    .headDiv {
        text-align: center;
        background-color: #f5f5f6;
        margin-bottom: 50px;
        /*padding: 50px 0px 50px 0px;*/
    }

    .headText {
        font-weight: bold;
        color: #333;
        font-size: 33px;
        margin-top: 40px;
        padding-bottom: 20px;
    }

    .active {
        color: #39ac6a;
    }

    ul {
        padding-top: 5px;
    }

    ul > li {
        float: left;
        list-style: none;
        margin-left: 20px;
        margin-right: 20px;
        cursor: pointer;
        color:#394043;
    }
</style>