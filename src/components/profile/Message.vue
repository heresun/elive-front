<template>
    <div>
        <el-row>
            <el-divider>
                <span class="title">我 的 消 息</span>
            </el-divider>
        </el-row>
        <el-row>
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="房源审核信息" name="first">
                    <el-table :show-header="false" :data="infoForHouse" style="width:100%;" max-height="435px">

                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status" :disabled="scope.row.status"
                                             @change="changeStatusForHouse(scope.row.id)"></el-checkbox>
                            </template>
                        </el-table-column>

                        <el-table-column width="150">
                            <template slot-scope="scope">
                                <div
                                        class="todo-item"
                                        :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.pubDate}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column width="160">
                            <template slot-scope="scope">
                                <div
                                        class="todo-item"
                                        :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.houseNumber}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                        class="todo-item"
                                        :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.content}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="100">
                            <template slot-scope="scope">
                                <el-button type="danger" icon="el-icon-delete" circle size="mini"
                                           @click="deleteInfoForHouse(scope.row.id)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="账户审核信息" name="second">
                    <el-table :show-header="false" :data="infoForUser" style="width:100%;" max-height="435px">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status" :disabled="scope.row.status"
                                             @change="changeStatusForUser(scope.row.id,scope.row.status)"></el-checkbox>
                            </template>
                        </el-table-column>

                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <div
                                        class="todo-item"
                                        :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.pubDate}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                        class="todo-item"
                                        :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.content}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="100">
                            <template slot-scope="scope">
                                <el-button type="danger" icon="el-icon-delete" circle
                                           @click="deleteInfoForUser(scope.row.id)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

            </el-tabs>
        </el-row>
    </div>
</template>

<script>
    import {getDateStr} from "@/utils/utils";

    export default {
        name: "Inspection",
        data() {
            return {
                activeName: "first",
                infoForHouse: [],
                infoForUser: []
            }
        },
        methods: {
            changeStatusForHouse(id) {
                // 勾选

                this.$axios.get("/houseMessage/changeStatus.do?id=" + id).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })

            },
            deleteInfoForHouse(id) {
                this.$confirm("确认删除信息?", "取消删除", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$axios
                        .get("/houseMessage/deleteOne.do?id=" + id)
                        .then(res => {
                            if (res.data == 1) {
                                this.getAllInfoForHouse();
                                this.$message.success("删除一条信息!");
                            } else {
                                this.$message.error("删除失败！")
                            }
                        });
                })
                    .catch(() => {
                        console.log("取消");
                    });
            },
            getAllInfoForHouse() {
                this.$axios.get("/houseMessage/getAll.do").then(res => {
                    this.infoForHouse = res.data;
                    for (let i = 0; i < this.infoForHouse.length; i++) {
                        this.infoForHouse[i].status = this.infoForHouse[i].status == 0 ? false : true;
                        this.infoForHouse[i].pubDate = getDateStr(this.infoForHouse[i].pubDate);
                    }
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })
            },
            changeStatusForUser(id) {
                // 勾选

                this.$axios.get("/userMessage/changeStatus.do?id=" + id).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })

            },
            deleteInfoForUser(id) {
                this.$confirm("确认删除信息?", "取消删除", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$axios
                        .get("/userMessage/deleteOne.do?id=" + id)
                        .then(res => {
                            if (res.data == 1) {
                                this.getAllInfoForUser();
                                this.$message.success("删除一条信息!");
                            } else {
                                this.$message.error("删除失败！")
                            }
                        });
                })
                    .catch(() => {
                        console.log("取消");
                    });
            },
            getAllInfoForUser() {
                this.$axios.get("/userMessage/getAll.do").then(res => {
                    this.infoForUser = res.data;
                    for (let i = 0; i < this.infoForUser.length; i++) {
                        this.infoForUser[i].status = this.infoForUser[i].status == 0 ? false : true;
                        this.infoForUser[i].pubDate = getDateStr(this.infoForUser[i].pubDate);
                    }
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.getAllInfoForHouse();
            this.getAllInfoForUser();
        }
    }
</script>

<style scoped>
    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .title {
        font-size: 20px;
        font-weight: bold;
    }
</style>