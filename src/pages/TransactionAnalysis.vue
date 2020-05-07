<template>
    <div style="background: whitesmoke ">
        <el-row>
            <Navigator></Navigator>
        </el-row>
        <div style="height: 50px"></div>
        <el-row>
            <el-col :span="8" :offset="4">
                <div style="
                color:rgba(0,0,0,0.7);
                font-weight:700;font-size: 20px;
                font-family: 'Arial Narrow';">{{$store.state.globalCityName}}市过去十二个月交易量分析图
                </div>
                <div style="margin-top: 20px">
                    <el-select v-model="areaId" placeholder="请选择区或县" size="mini" @change="getData">
                        <el-option v-for="item in areas" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <div style="height: 50px"></div>
        <el-row>
            <el-col :span="14" :offset="5">
                <div>
                    <ve-line :data="chartData" :settings="chartSettings" :toolbox="toolbox"
                             :data-zoom="dataZoom"></ve-line>
                    <span style="color:orangered;font-size: 12px">注:同比增长率=(平均交易价格-平均发布价格)/平均发布价格</span>
                </div>
            </el-col>
        </el-row>
        <div style="height: 50px"></div>

        <el-row>
            <Footer></Footer>
        </el-row>
    </div>
</template>
<script>
    import Navigator from "@/components/common/Navigator";
    import Footer from "@/components/common/Footer";

    export default {
        name: "LayoutAnalysis",
        components: {
            Footer,
            Navigator,
        },
        data() {
            this.chartSettings = {
                yAxisType: ['KMB'],
                yAxisName: ['成交量']
            };
            this.toolbox = {
                feature: {
                    magicType: {type: ['line', 'bar']},
                    saveAsImage: {}
                }
            };
            this.dataZoom = [
                {
                    type: 'slider',
                    start: 0,
                    end: 100
                }
            ];
            return {
                areas: [],
                areaId: "",
                chartData: {
                    columns: ['月份', "成交量"],
                    rows: []
                }
            }
        },
        methods: {
            getData() {
                this.chartData.rows = []
                this.$axios.get("/analysis/getTransAnalysis.do?areaId=" + this.areaId).then(res => {

                    let data = res.data;
                    for (let i = 0; i < data.length; i++) {
                        let obj = {
                            "月份": data[i].dataStr,
                            "成交量": data[i].transCount,
                        }
                        this.chartData.rows.push(obj);
                    }

                    this.chartData.rows.reverse();

                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted() {

            this.$axios
                .post("/util/globalCity.do")
                .then(res => {
                    if (res.data != "err") {
                        this.$store.state.globalCityId = res.data.cityId;
                        this.$store.state.globalCityName = res.data.cityName;
                        console.log(res.data);
                    } else {
                        this.$store.state.globalCityId = 149;
                        this.$store.state.globalCityName = "郑州";
                        console.log(res.data);
                    }


                    this.$axios.get("/district/location.do?pId=" + this.$store.state.globalCityId).then(res => {
                        this.areas = res.data;
                        let initId = res.data[0].id;
                        this.areaId = initId;
                        this.chartData.rows = []
                        this.$axios.get("/analysis/getTransAnalysis.do?areaId=" + initId).then(res => {

                            let data = res.data;
                            for (let i = 0; i < data.length; i++) {
                                let obj = {
                                    "月份": data[i].dataStr,
                                    "成交量": data[i].transCount,
                                }
                                this.chartData.rows.push(obj);
                            }

                            this.chartData.rows.reverse();

                        }).catch(err => {
                            console.log(err)
                        })

                    }).catch(err => {
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
</script>

<style scoped>

</style>