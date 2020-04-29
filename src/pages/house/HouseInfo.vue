<template>
    <div id="container">
        <el-row>
            <Navigator></Navigator>
        </el-row>

        <div style="height: 120px;text-align: left;background-color: #f5f5f5;margin-bottom: 20px">
            <el-row>
                <el-col :span="10" :offset="4">
                    <div class="description">
                        {{info.desc}}<!--这里最多显示30个字符-->
                    </div>
                    <div style="margin-top: 66px;height: 1px;">
                        <el-divider></el-divider>
                    </div>
                    <div style="margin-top: 15px;font-size: 12px;color: gray;">
                        {{info.detailDesc}}<!--这里最多显示90个字符-->
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-row type="flex" justify="center" style="margin-top: 34px">
                        <SearchBox border="1px solid lightgray" but-text="搜索"
                                   box-height="30px" box-width="200px"
                                   but-height="32px" but-width="90px" size="small" type="primary"></SearchBox>
                    </el-row>
                    <el-row type="flex" justify="center" style="margin-top: 26px">
                        <el-col :span="6" class="topTip">
                            <span style="font-size: 15px">收藏数:</span>
                            <span style="color: #d25d3a;font-size: 20px;vertical-align: center">{{collectCount}}</span>
                        </el-col>
                        <el-col :span="6" class="topTip">
                            <div style="display: inline-block; ">
                                <el-button size="mini" :type="buttonType" icon="el-icon-star-off" round
                                           @click="collectOrCancel">
                                    {{collectText}}
                                </el-button>
                            </div>

                        </el-col>
                        <el-col :span="6" class="topTip">
                            <el-button type="text">预定>>></el-button>
                        </el-col>

                    </el-row>
                </el-col>
            </el-row>
        </div>

        <el-row>
            <el-col :span="10" :offset="4">
                <div class="imgContainer">
                    <el-scrollbar style="height: 100%">
                        <div class="image__lazy">
                            <el-image title="点击显示大图"
                                      scroll-container="div"
                                      :preview-src-list="images"
                                      v-for="url in images"
                                      :key="url" :src="url" lazy></el-image>
                        </div>
                    </el-scrollbar>
                </div>
            </el-col>
            <el-col :span="6" :offset="1" style="width: 300px">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="户型" class="info">
                        <span>{{info.bedroom+"室"+info.livingroom+"厅"+info.kitchen+"厨"+info.bathroom+"卫"}}</span>
                    </el-form-item>
                    <br/>
                    <el-form-item label="面积" class="info-special">
                        <span class="areaSize">{{info.areaSize}}</span> <sub><span class="unit">平 米</span></sub>
                    </el-form-item>
                    <br>
                    <el-form-item label="价格" class="info-special">
                        <span class="price">{{info.price}} </span> <sub><span class="unit">{{unit}}</span></sub>
                    </el-form-item>
                    <br/>
                    <el-form-item label="发布人" class="info">
                        <span>{{owner.username}}</span>
                    </el-form-item>
                    <br/>
                    <el-form-item label="发布时间" class="info">
                        <span>{{info.pubDate}}</span>
                    </el-form-item>
                    <br/>
                    <el-form-item label="使用年限" class="info">
                        <span>{{info.servLife}} 年</span>
                    </el-form-item>
                    <br>
                    <el-form-item label="咨询电话" class="info">
                        <span>{{owner.phone}}</span>
                    </el-form-item>
                    <br/>
                    <el-form-item label="房源地址" class="info">
                        <span>{{info.address}}</span>
                    </el-form-item>

                </el-form>
            </el-col>


        </el-row>

        <div style="height: 20px;"></div>

        <el-row>
            <el-col :span="16" :offset="4">
                <el-divider content-position="center"><span style="font-weight: bold;font-size: 20px">详细信息</span>
                </el-divider>
                <el-col :span="8" :offset="4">
                    <ul class="helpInfo">
                        <li>
                            面积: {{info.areaSize}}平方米
                        </li>
                        <li>
                            供暖: {{info.heating}}
                        </li>
                        <li>
                            用电: {{info.electric}}
                        </li>
                        <li>
                            用水: {{info.water}}
                        </li>

                        <li>
                            楼层: {{info.level}}楼
                        </li>

                    </ul>
                </el-col>
                <el-col :span="8" :offset="4">
                    <ul class="helpInfo">
                        <li>
                            朝向: {{info.orientedDirection}}
                        </li>

                        <li>
                            燃气: {{info.naturalGas==0?'无':'有'}}
                        </li>

                        <li>
                            车位: {{info.parkingLot==0?'无':'有'}}
                        </li>

                        <li>
                            装修: {{info.renovation}}
                        </li>
                    </ul>
                </el-col>

            </el-col>
        </el-row>
        <div style="height: 50px"></div>
        <el-row style="background-color: #f5f5f5">
            <Footer></Footer>
        </el-row>
    </div>
</template>

<script>
    import Navigator from "@/components/common/Navigator";
    import Footer from "@/components/common/Footer";
    import SearchBox from "@/components/common/SearchBox";
    import {getDateStr, removeCollection} from "@/utils/utils";


    export default {
        name: "HouseInfo",
        components: {
            Navigator,
            Footer,
            SearchBox
        },
        data() {
            return {
                info: "",
                owner: "",
                collectCount: 0,
                images: [],
                // 收藏相关

                buttonType: "primary",
                collectText: "未收藏",
                unit: ""

                // 附加信息
            };
        },

        methods: {
            collectOrCancel() {

                if (!this.$store.state.globalIsLogin) {
                    this.$store.state.globalLoginDialogVisible = true;
                    return;
                }

                // 取消收藏
                if (this.$store.state.globalCollections.indexOf(this.info.id) > -1) {
                    this.$confirm('确认取消收藏?', '取消收藏', {
                        confirmButtonText: '确定',
                        cancelButtonText: "取消",
                        type: "warning",
                    }).then(() => {
                        this.$axios.get("/collection/deleteOne.do?houseId=" + this.info.id + "&userId=" + this.$store.state.globalUserId).then(res => {
                            console.log(this.$store.state.globalCollections);
                            this.buttonType = "primary";
                            this.collectText = "未收藏";
                            this.$store.state.globalCollections =
                                removeCollection(this.$store.state.globalCollections, this.info.id);
                            if (this.collectCount > 0) {

                                this.collectCount--;
                            }
                            console.log(res);
                            console.log(this.$store.state.globalCollections);
                        });
                    }).catch(() => {
                        console.log("取消取消收藏");
                    });
                } else { //加入收藏

                    let form = new FormData();
                    form.append("houseId", this.info.id);
                    form.append("userId", this.$store.state.globalUserId);
                    this.$axios.post("/collection/addOne.do", form).then(res => {
                        if (res.data > 0) {
                            this.buttonType = "warning";
                            this.collectText = "已收藏";
                            this.info.cId = res.data;
                            this.$store.state.globalCollections.push(this.info.id);
                            this.collectCount++;
                        } else {
                            this.$message.error("收藏失败!")
                        }
                    }).catch(err => {
                        alert(err);
                    })
                }
            }
        },

        mounted() {
            this.$axios.get("/house/getOne.do?id=" + this.$route.params.id).then(res => {
                let house = res.data;
                console.log(res)
                house.pubDate = getDateStr(house.pubDate)
                if (house.length < 0) {
                    alert("呀,出错了1!")
                } else {
                    this.info = house;
                    if (this.info.tagId == 3) {
                        this.unit = "元/月"
                    } else {
                        this.unit = "万元"
                    }
                    this.info.cId = this.$route.params.cId;
                    if (this.$store.state.globalCollections.indexOf(this.info.id) > -1) {
                        this.buttonType = "warning";
                        this.collectText = "已收藏";
                    }

                    // 获取本套房子的收藏数
                    this.$axios.get("/collection/getCount.do?houseId=" + house.id).then(res => {
                        this.collectCount = res.data;
                    });

                    // 请求房屋主人的信息
                    this.$axios.get("/user/getOne.do?ownerId=" + house.ownerId).then(res => {
                        if (res.data.length <= 0) {
                            alert("呀,出错了2!");
                        } else {

                            this.owner = res.data[0];
                        }
                    }).catch(err => {
                        console.log("获取房屋拥有者失败");
                        console.log(err);
                    });
                    // 请求房屋的图片
                    this.$axios.get("/image/url.do?houseNumber=" + house.houseNumber).then(res => {
                        if (res.data.length <= 0) {
                            alert("呀,出错了3!");
                        } else {
                            this.images = res.data;
                        }
                    }).catch(err => {
                        console.log("获取房屋图片失败");
                        console.log(err);
                    });
                }
            });
        }
    }
</script>

<style scoped>

    .el-button {
        padding-top: 5px;
    }


    .topTip {
        text-align: center;
        font-size: 15px;
    }

    .description {
        float: left;
        margin-top: 35px;
        font-size: 20px;
        font-weight: bold;
        overflow: hidden;
    }

    .info {
        margin-bottom: 9px;
    }

    .info-special {
        margin-bottom: -9px;
    }

    #container {
        width: 1519px;
    }

    .el-scrollbar__wrap {
        overflow-x: hidden;
    }

    span {
        font-size: 16px;
        letter-spacing: 1px;
        font-weight: 500;
        /*font-family: Tahoma;*/
    }

    .price {
        display: inline-block;
        font-family: Tahoma;
        font-size: 26px;
        line-height: 40px;
        color: #e4393c;
        font-weight: bold;
        letter-spacing: -1px;
        max-width: 165px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .areaSize {
        display: inline-block;
        font-family: Tahoma;
        font-size: 26px;
        line-height: 40px;
        color: #e4393c;
        font-weight: bold;
        letter-spacing: 0px;
        max-width: 165px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .unit {
        display: inline-block;
        /*font-family: Tahoma;*/
        font-size: 16px;
        line-height: 40px;
        color: #e4393c;
        font-weight: bold;
        letter-spacing: -1px;
        max-width: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tag {
        background-color: #98ffc2;

    }

    .image__lazy {
        height: 420px;
        width: 632px;
        /*overflow: scroll;*/
    }

    .imgContainer {
        border: 2px solid gray;
        border-radius: 2px;
    }

    .helpInfo > li {
        list-style: none;
        margin-top: 10px;
        font-size: 16px;
    }

</style>