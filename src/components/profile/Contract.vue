<template>
    <div>
        <el-button type="primary" @click="getContract"><a href="http://localhost:8080/elive/upload/contract.docx">获取合同模板</a></el-button>
    </div>
</template>

<script>
    export default {
        name: "Contract",
        methods:{
            // getContract(){
            //     this.$axios.get("/util/getContract.do").then(res=>{
            //         console.log(res)
            //     })
            // }
        }
    }
</script>

<style scoped>
a{
    text-decoration: none;
    color: whitesmoke;
}
</style>