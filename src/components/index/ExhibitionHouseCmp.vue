<template>
    <div>
        <el-row>
            <el-col :span="18" :offset="3">
                <el-row>
                    <div class="headTitle">{{desc}}</div>
                </el-row>
                <el-button type="text" @click="moreHouses">{{title}} >>></el-button>
            </el-col>
        </el-row>
        <el-row type="flex" justify="left">
            <el-col :span="18" :offset="3">
                <el-col style="width: 265px;" v-for="(item, index) in houses" :key="item"
                        :style="`margin-left:${index > 0 ? 26 : 0}`+'px'">

                    <el-card :body-style="{ padding: '0px' }" shadow="hover">

                        <img :src="item.url" class="image" hidden="hidden">

                        <div style="padding: 14px;">
                            <span class="simpleDesc">{{item.desc}}</span>
                            <div class="bottom clearfix">
                                <time class="time">总价:<span style="color: chocolate">{{ item.price }}</span>万元</time>
                                <time class="time">面积:<span style="color: chocolate">{{ item.areaSize }}</span>平方米
                                </time>
                                <div style="height: 20px;padding-top: 5px;">
                                    <el-button type="text" size="small" class="button" @click="lookDetail(item.id)">
                                        详情>>>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ExhibitionHouseCmp",
        data() {
            return {
                houses: []
            }
        },
        props: {
            "toHouseListUrl": String,
            "exhibitionUrl": String,
            "title": String,
            "desc": String,
            "type":Number
        },
        methods: {
            moreHouses() {
                this.$router.push(this.toHouseListUrl)
            },
            lookDetail(id) {
                this.$router.push("/house/info/" + `${id}`);
            }
        },
        mounted() {
            let type = this.type;
            let form = new FormData();
            let obj = {page:1,count:4,type:type};
            form.append("filterParams",JSON.stringify(obj));
            this.$axios.post(this.exhibitionUrl,form).then(res => {
                this.houses = res.data.housePage;
                console.log(this.houses)
            }).catch(err => {
                console.log(err)
            });
        }
    }
</script>

<style scoped>

    .headTitle {
        font-size: 26px;
        font-weight: bold;

    }

    .simpleDesc {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;

    }

    .el-divider--horizontal {
        margin-top: 0px;
        margin-bottom: 10px;
    }


    .time {
        font-size: 13px;
        color: #999;
        margin-right: 5px;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
        height: 200px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>