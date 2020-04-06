<template>
    <div id="container">
        <el-row>
            <Navigator></Navigator>
        </el-row>
        <div class="headDiv">
            <el-row>
                <el-col :span="18" :offset="3">
                    <ul>
                        <li :class="{active:flag===true}" @click="sale">我要卖房</li>
                        <li :class="{active:flag===false}" @click="lease">我要出租</li>
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
                    <SaleHouse :style="`display:${saleHouse}`"></SaleHouse>
                    <LeaseHouse :style="`display:${leaseHouse}`"></LeaseHouse>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="16" :offset="4">
                <div>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Navigator from "@/components/Navigator";
    import SaleHouse from "@/components/SaleHouse";
    import LeaseHouse from "@/components/LeaseHouse";

    export default {
        name: "PublishHouse",
        data() {
            return {
                contentHead: "发布售卖房源",
                saleHouse: "",
                leaseHouse: "none",
                flag: true
            }
        },

        components: {
            Navigator,
            SaleHouse,
            LeaseHouse
        },
        methods: {
            sale() {
                this.leaseHouse = "none";
                this.saleHouse = "";
                this.flag = true
                this.contentHead = "发布售卖房源"
            },

            lease() {
                this.saleHouse = "none";
                this.leaseHouse = "";
                this.flag = false
                this.contentHead = "发布出租房源"
            }
        }
    }
</script>

<style scoped>

    .headDiv {
        text-align: center;
        background-color: #f5f5f6;
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