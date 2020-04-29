<template>
    <div>
        <span class="boxSpan">
            <input  :style="boxStyle" type="text" v-model="inputData" placeholder="请输入地址开始找房" class="searchInput"/>
        </span>
            <el-button :size="size" :style="butStyle" :type="type"  icon="el-icon-search" class="searchButton" @click="search">{{butText}}</el-button>
    </div>
</template>

<script>
    export default {
        name: "SearchBox",
        model: {
            prop: "content",
            event: "change",

        },
        props: {
            "content":String,
            "boxHeight":String,
            "boxWidth":String,
            "butHeight":String,
            "butWidth":String,
            "butText":String,
            "border":String,
            "size":String,
            "type":String,
            "butColor":String
        },

        data() {
            return {
                inputData: "",
                boxStyle:{height:this.boxHeight,width:this.boxWidth,border:this.border,outline:"none"},
                butStyle:{height:this.butHeight,width:this.butWidth,backgroundColor:this.butColor},

            }
        },
        methods: {
            search() {
                alert(this.inputData);
            }
        },

        watch:{
            inputData(val){
                this.$emit("change",val);
            }
        }
    }
</script>

<style scoped>

    .searchButton {
        border-radius: 0px;
        /*height: 50.5px;*/
        /*width: 150px;*/
    }

    .searchInput {
        /*height: 44.4px;*/
        /*width: 500px;*/
        padding:0px 0px 0px 15px;
        border: 0px;

    }

    .boxSpan{
        float: left;
        padding: 0px;
    }
</style>