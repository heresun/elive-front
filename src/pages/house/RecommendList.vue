<template>
    <div>
        <!--        导航栏-->
        <el-row>
            <Navigator color="#394043"></Navigator>
        </el-row>
        <div style="background-color: whitesmoke">

            <div style="height: 50px"></div>

            <!--        页头-->
            <el-row>
                <el-col :span="18" :offset="3">
                    <div style="border: 1px solid lightgrey; width: 665px;">
                        <SearchBox
                                but-text=""
                                box-height="45px"
                                box-width="600px"
                                but-height="45px"
                                but-width="50px"
                                type="text"
                                but-color="white"></SearchBox>
                    </div>

                    <div>
                        <HouseListExhibition url="/house/getRecommend.do" :type="-1" typeStr="精选好房"></HouseListExhibition>
                    </div>

                </el-col>
            </el-row>
            <div style="height: 100px">

            </div>
            <el-row>
                <Footer></Footer>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Navigator from "@/components/common/Navigator";
    import Footer from "@/components/common/Footer";
    import HouseListExhibition from "@/components/common/HouseListExhibition";
    import SearchBox from "@/components/common/SearchBox";


    export default {
        name: "Recommend",
        components: {
            Navigator,
            Footer,
            HouseListExhibition,
            SearchBox,

        },
        mounted(){
            this.$store.state.globalSearchType = -1;
        }
    }
</script>

<style scoped>

</style>