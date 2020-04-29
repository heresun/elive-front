<template>
    <div style="background-color: whitesmoke">
        <el-row>
            <Navigator color="#394043"></Navigator>
        </el-row>
        <el-row>
            <el-col>

            </el-col>
        </el-row>
        <el-row>
            <Footer></Footer>
        </el-row>
    </div>
</template>

<script>
    import Navigator from "@/components/common/Navigator";
    import Footer from "@/components/common/Footer";

    export default {
        name: "Recommend",
        components:{
            Navigator,
            Footer
        }
    }
</script>

<style scoped>

</style>