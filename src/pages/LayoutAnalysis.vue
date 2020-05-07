<template>
    <div style="background: whitesmoke ">
        <el-row>
            <Navigator></Navigator>
        </el-row>
        <div style="height: 50px"></div>
        <el-row>
            <el-col :span="4" :offset="4">
                <div style="
                color:rgba(0,0,0,0.7);
                font-weight:700;font-size: 20px;
                font-family: 'Arial Narrow';">{{$store.state.globalCityName}}市房源户型分析图
                </div>
            </el-col>
        </el-row>
        <div style="height: 50px"></div>
        <el-row>
            <el-col :span="12" :offset="6">
                <div>
                    <ve-line :data="chartData" :settings="chartSettings" :toolbox="toolbox" :data-zoom="dataZoom"></ve-line>
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
                yAxisName: ['数量'],
                xAxisName: ['区/县'],
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
                area: "区/县",
                chartData: {
                    columns: ["区/县", '一居室', '二居室', '三居室', '四居室'],
                    rows: []
                }
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
                    this.$axios.get("/analysis/getLayoutAnalysis.do?cityId=" + this.$store.state.globalCityId).then(res => {

                        let data = res.data;
                        for (let i = 0; i < data.length; i++) {
                            let obj = {
                                "区/县": data[i].area,
                                "一居室": data[i].one,
                                "二居室": data[i].two,
                                "三居室": data[i].three,
                                "四居室": data[i].four,
                                "五居室": data[i].five
                            }
                            this.chartData.rows.push(obj);
                        }
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