<template>
    <div>
        <el-row>
            <el-divider><span class="title"> 我 的 收 藏 </span></el-divider>
        </el-row>
        <el-row>
            <el-table
                    :data="tableData"
                    height="507"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="发布日期"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="ownerName"
                        label="发布人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格/元"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="areaSize"
                        label="面积"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="查看详情">
                    <template slot-scope="scope">
                        <el-button type="text" @click="lookDetail(scope.row)">查看详情 >>></el-button>
                    </template>
                </el-table-column>

                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="medium" @click="cancelCollect(scope.row)">取消收藏</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>

    import {getDateStr, remove, removeCollection} from "../utils/utils";

    export default {
        name: "Collection",
        data() {
            return {
                houses: [],
                images: [],
                tableData: []
            }
        },
        methods: {
            cancelCollect(row) {
                this.$confirm('确认取消收藏?', '取消收藏', {
                    confirmButtonText: '确定',
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    console.log(row.cId);
                    this.$axios.delete("/collection/deleteOne", {params: {id: row.cId}}).then(res => {
                        if (res.data == "ok") {
                            this.tableData = remove(this.tableData, row.cId);
                            this.$store.state.globalCollections =
                                removeCollection(this.$store.state.globalCollections, row.id);                            this.$message.success("取消收藏成功!");
                        } else {
                            this.$message.error("请重试!");
                        }
                    });
                }).catch(() => {
                    console.log("取消取消收藏");
                })
            },

            lookDetail(row) {
                let id = row.id;
                let cId = row.cId;
                this.$router.push(`/house/info/${id}/${cId}`);
                console.log(row.id)
            }
        },
        mounted() {

            this.$axios.get("/collection/all?account=" + this.$store.state.globalAccount).then(res => {
                console.log("res.data:");
                console.log(res.data);
                this.houses = res.data;
                // this.tableData.length = this.houses.length;
                for (let i = 0; i < this.houses.length; i++) {
                    let date = getDateStr(this.houses[i].pubDate);

                    let obj = {
                        id: this.houses[i].id,
                        cId: this.houses[i].cid,
                        date: date,
                        ownerName: this.houses[i].owner,
                        price: this.houses[i].price + "万",
                        areaSize: this.houses[i].areaSize + "平方米",

                    };

                    this.tableData.push(obj);
                }
                console.log("houses:")
                console.log(this.houses)
            })
        }
    }
</script>

<style scoped>

    .title {
        font-size: 20px;
        font-weight: bold;
    }

    .el-divider__text {
        background-color: #f5f5f5;
    }
</style>