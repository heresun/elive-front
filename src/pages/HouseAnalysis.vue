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
                font-family: 'Arial Narrow';">{{$store.state.globalCityName}}市过去各区成交房屋统计表
                </div>
            </el-col>
        </el-row>
        <div style="height: 50px"></div>
        <el-row>
            <el-col :span="14" :offset="5">
                <div>
                    <ve-line :data="chartData" :settings="chartSettings" :toolbox="toolbox"
                             :data-zoom="dataZoom"></ve-line>
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
                chartData: {
                    columns: ['区/县', "成交量"],
                    rows: []
                }
            }
        },
        methods: {
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

                    this.$axios.get("/analysis/getHouseAnalysis.do?cityId=" + this.$store.state.globalCityId).then(res => {
                        let data = res.data;
                        for (let i = 0; i < data.length; i++) {
                            let obj = {
                                "区/县": data[i].district,
                                "成交量": data[i].count,
                            }
                            this.chartData.rows.push(obj);
                        }

                        this.chartData.rows.reverse();

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