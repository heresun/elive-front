<template>
    <!--该组件用于展示列表的每一行-->
    <div>
        <el-row type="flex" justify="start">
            <el-col :span="4">
                <div style="width: 160px;" @click="houseDetail">
                    <img class="showImg" :src="house.url" alt="">
                </div>
            </el-col>
            <el-col :span="20">
                <el-col :span="16">
                    <div class="title" @click="houseDetail">{{title}}，{{house.desc}}</div>
                    <div class="position"><span class="el-icon-location-outline"> {{house.address}}</span></div>
                    <div class="simpleIntro"><span class="el-icon-house" v-html="simpleIntro"> </span></div>
                    <div class="simpleIntro"><span class="el-icon-star-off"> {{collectionCount}}人收藏 / {{Math.round((new Date()-house.pubDate)/(60*60*24*1000)) }}天前发布</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <p style="color: #fa5741;"><span
                                style="font-weight: bold;font-size: 26px">{{house.price}}</span> 万元</p>
                        <p style="color: gray;font-size: 12px">
                            <span>单价:{{Math.round(house.price*10000/house.areaSize)}}</span> 元/平米</p>
                    </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ListRownCmp",
        props: {
            "house": Object
        },
        data() {
            return {
                title: "",
                simpleIntro: "",
                orientation: "",
                renovation: "",
                collectionCount: 0
            }
        },

        mounted() {
            this.title = this.house.bedroom + "室" + this.house.livingroom + "厅" + this.house.kitchen + "厨" + this.house.bathroom + "卫";
            let intro = " " + this.title + " / " + this.house.areaSize + " m<sup style='font-size: 6px'>2</sup>  ";
            if (this.house.parkingLot == 1) {
                intro += "/<span style='color: #d25d3a'>有停车位</span>";
            }

            // 获取朝向
            this.$axios.get("/type/orientation/getOne.do?id=" + this.house.orientation).then(res => {
                this.orientation = res.data;

                // 获取装修成度
                this.$axios.get("/type/renovation/getOne.do?id=" + this.house.renovationType).then(res => {
                    this.renovation = res.data;
                    intro += " / " + this.orientation + " / " + this.renovation+"/"+this.house.level+"楼";
                    this.simpleIntro = intro;
                }).catch(err => {
                    console.log(err);
                })

            }).catch(err => {
                console.log(err);
            })

            // 获取本套房子的收藏数
            this.$axios.get("/collection/getCount.do?houseId=" + this.house.id).then(res => {
                this.collectionCount = res.data;
            });


        },

        methods:{
            houseDetail(){
                this.$router.push("/house/info/"+this.house.id);
            }
        }
    }
</script>

<style scoped>
    .showImg {
        width: 160px;
        height: 122px;
        border-radius: 5px;
    }

    .showImg:hover{
        cursor: pointer;
    }


    .title {
        /*float: left;*/
        max-width: 600px;
        text-decoration: none;
        font-size: 22px;
        font-weight: bold;
        color: #394043;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .title:hover{
        color: #39ac6a;
        cursor: pointer;
    }

    .position {
        margin-top: 10px;
        color: gray;
        font-size: 14px;
    }

    .simpleIntro {
        margin-top: 10px;
        color: gray;
        font-size: 14px;
    }

</style>