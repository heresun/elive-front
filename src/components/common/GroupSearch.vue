<template>
    <div id="container">
<!--        地区过滤-->
        <el-row>
            <el-col :span="1" class="lineHead">
                <div style="margin-top: 4px;">位置:</div>
            </el-col>
            <el-col :span="5">
                <el-select v-model="$store.state.province" placeholder="请选择" size="mini" @change="getCity">
                    <el-option
                            v-for="item in provinces"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                省
            </el-col>

            <el-col :span="5">
                <el-select v-model="$store.state.city" placeholder="请选择" size="mini" @change="getArea">
                    <el-option
                            v-for="item in cities"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                市
            </el-col>

            <el-col :span="7">
                <el-select v-model="$store.state.area" placeholder="请选择" size="mini">
                    <el-option
                            v-for="item in areas"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                区/县
            </el-col>

        </el-row>


    </div>
</template>

<script>
    export default {
        name: "GroupSearch",
        data() {
            return {
                provinces: [],
                cities:[],
                areas:[],
            }
        },
        methods:{
            getCity(){
                this.$axios("/district/location.do?pId="+this.$store.state.province).then(res=>{
                    this.cities = res.data;
                }).catch(err=>{
                    console.log(err);
                });
            },

            getArea(){
                this.$axios("/district/location.do?pId="+this.$store.state.city).then(res=>{
                    this.areas = res.data;
                }).catch(err=>{
                    console.log(err);
                });
            }

        },

        mounted(){

            this.$axios("/district/location.do?pId=1").then(res=>{
                this.provinces = res.data;
            }).catch(err=>{
                console.log(err);
            });

        }
    }
</script>

<style scoped>

    #container{
        font-size: 12px;
    }

    .lineHead{
        font-weight: bold;
    }

</style>