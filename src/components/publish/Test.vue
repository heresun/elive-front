<template>
    <div>
        结果: {{houseInfo}}
    </div>
</template>

<script>
    export default {
        name: "Test",
        props:[
            "houseInfo"
        ],

        mounted(){
            alert("mounted")
        }
    }
</script>

<style scoped>

</style>