<template>
    <div>
        <el-dialog
                title="更新房源信息"
                :visible.sync="updateHouseInfoDialog"
                @close="handleDialogClose"
                :close-on-click-modal="false"
                :center="true"
                :destroy-on-close="true"
                width="70%"
        >
            <el-row type="flex" justify="center">
                <el-col>
                    <div>
                        <el-form
                                :model="ruleForm"
                                status-icon
                                :rules="rules"
                                ref="ruleForm"
                                label-width="100px"
                                class="demo-ruleForm"
                        >
                            <el-form-item label="所在地区" prop="areaId">
                                <el-row>
                                    <el-col :span="8">
                                        <div>
                                            <el-select
                                                    v-model="ruleForm.provinceId"
                                                    placeholder="请选择"
                                                    size="mini"
                                                    @change="getCity"
                                            >
                                                <el-option
                                                        v-for="item in provinces"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id"
                                                ></el-option>
                                            </el-select>
                                            省
                                        </div>
                                    </el-col>

                                    <el-col :span="8">
                                        <div>
                                            <el-select
                                                    v-model="ruleForm.cityId"
                                                    placeholder="请选择"
                                                    size="mini"
                                                    @change="getArea"
                                            >
                                                <el-option
                                                        v-for="item in cities"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id"
                                                ></el-option>
                                            </el-select>
                                            市
                                        </div>
                                    </el-col>

                                    <el-col :span="8">
                                        <div>
                                            <el-select v-model="ruleForm.areaId" placeholder="请选择" size="mini">
                                                <el-option
                                                        v-for="item in areas"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id"
                                                ></el-option>
                                            </el-select>
                                            区/县
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="详细地址" prop="address">
                                <el-input
                                        type="text"
                                        v-model="ruleForm.address"
                                        placeholder="所在街道和门牌号"
                                        @focus="forceLogin"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="房屋面积" prop="areaSize">
                                <el-input
                                        type="text"
                                        v-model="ruleForm.areaSize"
                                        placeholder="单位:平方"
                                        @focus="forceLogin"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="使用年限" prop="servLife">
                                <el-input v-model="ruleForm.servLife" placeholder="单位:年" @focus="forceLogin"></el-input>
                            </el-form-item>
                            <el-form-item label="所在楼层" prop="level">
                                <el-input v-model="ruleForm.level" placeholder="单位:楼" @focus="forceLogin"></el-input>
                            </el-form-item>
                            <el-form-item label="房屋类型" prop="type">
                                <el-select v-model="ruleForm.type" placeholder="选择房屋类型" @focus="forceLogin">
                                    <el-option v-for="(item,index) in type" :key="index" :label="item"
                                               :value="index"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="天然气" prop="naturalGas">
                                <el-select v-model="ruleForm.naturalGas" placeholder="选择是否有天然气" @focus="forceLogin">
                                    <el-option
                                            v-for="(item,index) in naturalGas"
                                            :key="index"
                                            :label="item"
                                            :value="index"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="房屋布局" required>
                                <el-input v-model="ruleForm.bedroom" class="layout" @focus="forceLogin"></el-input>
                                居室
                                <el-input v-model="ruleForm.livingroom" class="layout" @focus="forceLogin"></el-input>
                                客厅
                                <el-input v-model="ruleForm.kitchen" class="layout" @focus="forceLogin"></el-input>
                                厨房
                                <el-input v-model="ruleForm.bathroom" class="layout" @focus="forceLogin"></el-input>
                                卫生间
                            </el-form-item>
                            <el-form-item label="房屋价格" prop="price">
                                <el-input v-model="ruleForm.price" placeholder="单位:万元" @focus="forceLogin"></el-input>
                            </el-form-item>

                            <el-form-item label="停车位" prop="parkingLot">
                                <el-select v-model="ruleForm.parkingLot" placeholder="是否有停车位" @focus="forceLogin">
                                    <el-option
                                            v-for="(item,index) in parkingLot"
                                            :key="index"
                                            :label="item"
                                            :value="index"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="房屋朝向" prop="orientation">
                                <el-select v-model="ruleForm.orientation" placeholder="选择房屋朝向" @focus="forceLogin">
                                    <el-option
                                            v-for="item in orientation"
                                            :key="item.id"
                                            :label="item.direction"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="供暖类型" prop="heatingType">
                                <el-select v-model="ruleForm.heatingType" placeholder="选择供暖类型" @focus="forceLogin">
                                    <el-option
                                            v-for="item in heatingType"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="用水类型" prop="waterType">
                                <el-select v-model="ruleForm.waterType" placeholder="选择用水类型" @focus="forceLogin">
                                    <el-option
                                            v-for="item in waterType"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="用电类型" prop="electricType">
                                <el-select v-model="ruleForm.electricType" placeholder="选择用电类型" @focus="forceLogin">
                                    <el-option
                                            v-for="item in electricType"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="装修情况" prop="renovationType">
                                <el-select
                                        v-model="ruleForm.renovationType"
                                        placeholder="选择装修类型"
                                        @focus="forceLogin"
                                >
                                    <el-option
                                            v-for="item in renovationType"
                                            :key="item.id"
                                            :label="item.type"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="简单描述" prop="desc">
                                <el-input
                                        type="textarea"
                                        v-model="ruleForm.desc"
                                        placeholder="简要描述房子特点，如朝向、楼层等,不超过30字"
                                        @focus="forceLogin"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="详细描述" prop="detailDesc">
                                <el-input
                                        type="textarea"
                                        v-model="ruleForm.detailDesc"
                                        placeholder="详细描述房屋的卖点,如周围的公共设施、交通情况等，不超过90字"
                                        @focus="forceLogin"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="证明材料" prop>
                                <input
                                        type="file"
                                        multiple
                                        style="display:none"
                                        id="fileElemForProve"
                                        @change="getFileForProve"
                                        @focus="forceLogin"
                                />

                                <el-button areaSize="small" type="success" @click="inputFileForProve">选取文件</el-button>
                                <div
                                        style="margin-top:5px;padding-top:0.1px;width: 900px;height: 230px; background-color: #f1f1f1;border-radius: 8px"
                                >
                                    <ul>
                                        <li v-for="(item, index) in rawHtmlForProve" :key="index">
                                            <div v-html="item"></div>
                                            <div style="text-align: center;">
                                                <el-button
                                                        type="danger"
                                                        icon="el-icon-delete"
                                                        areaSize="mini"
                                                        @click="deleteImgForProve(index)"
                                                >删除
                                                </el-button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-form-item>
                            <el-form-item label="房屋图片" prop>
                                <input
                                        type="file"
                                        multiple
                                        style="display:none"
                                        id="fileElem"
                                        @change="getFile"
                                        @focus="forceLogin"
                                />

                                <el-button areaSize="small" type="success" @click="inputFile">选取文件</el-button>
                                <div
                                        style="margin-top:5px;padding-top:0.1px;width: 900px;height: 230px; background-color: #f1f1f1;border-radius: 8px"
                                >
                                    <ul>
                                        <li v-for="(item, index) in rawHtml" :key="index">
                                            <div v-html="item"></div>
                                            <div style="text-align: center;">
                                                <el-button
                                                        type="danger"
                                                        icon="el-icon-delete"
                                                        areaSize="mini"
                                                        @click="deleteImg(index)"
                                                >删除
                                                </el-button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-form-item>
                            <el-button class="el-button--primary" @click="update(`ruleForm`)">更新</el-button>
                            <el-button class="el-button--default" @click="cancelUpdate">取消</el-button>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>

        <el-row>
            <el-divider>
                <span class="title">我 发 布 的 房 源 ({{tableData.length}})</span>
            </el-divider>
        </el-row>
        <el-row>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :default-sort="{prop: 'index', order: 'ascending'}"
                    max-height="500"
                    :row-class-name="ableRowClassName"
            >
                <el-table-column label="序号" prop="index" sortable width="80"></el-table-column>
                <el-table-column label="日期" prop="pubDate" sortable width="120"></el-table-column>
                <el-table-column label="省/市/县(区)" prop="district" width="180"></el-table-column>
                <el-table-column label="地址" prop="address" width="180"></el-table-column>
                <el-table-column label="房屋编号 " prop="houseNumber" width="180"></el-table-column>

                <el-table-column label="简介" prop="desc" width="200"></el-table-column>

                <el-table-column label="操作" fixed="right" width="220">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <el-button
                                size="mini"
                                type="success"
                                @click="handleSoldHouse(scope.$index, scope.row)"
                        >已售出
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
      <span style="font-weight:bold;font-size:13px;color:gray">
        备注：
        <span style="color:#EE6363">number.1 表示正在审核</span>
      </span>
        </el-row>

        <el-dialog title="请输入买家账户" :visible.sync="inputDialogVisible" :close-on-click-modal="false" width="500px">
            <span><el-input placeholder="请输入买家账户" v-model="buyerAccount" style="width:350px;margin-right:10px"/></span>
            <el-button type="primary" @click="handleConfirAccount">确认</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import {getDateStr} from "@/utils/utils";

    // import UpdateHouse from "@/components/publish/UpdateHouse";
    // import qs from "qs";

    export default {
        name: "PublishedHouse",
        components: {
            // UpdateHouse
        },
        data() {
            return {
                row: "",
                inputDialogVisible: false,
                buyerAccount: "",
                tableData: [],
                rawData: null,
                updateHouseInfoDialog: false,
                // row: null,
                provinces: [],
                cities: [],
                areas: [],
                fileListForProve: [],
                fileList: [],
                newImagesForPorve: [],
                newImages: [],
                rawHtmlForProve: [],
                rawHtml: [],
                //停车位
                parkingLot: ["有", "无"],
                // 天然气
                naturalGas: ["有", "无"],
                //房屋新旧
                type: ["新房", "二手房"],
                //供暖
                heatingType: [],
                // 供水
                waterType: [],
                //供电
                electricType: [],
                // 朝向
                orientation: [],
                // 装修
                renovationType: [],

                dialogVisible: false,

                ruleForm: {
                    areaId: "",
                    provinceId: "",
                    cityId: "",
                    address: "",
                    areaSize: "",
                    servLife: "",
                    desc: "",
                    detailDesc: "",
                    parkingLot: "",
                    price: "",
                    orientation: "",
                    heatingType: "",
                    waterType: "",
                    electricType: "",
                    renovationType: "",
                    level: "",
                    type: "",
                    naturalGas: "",
                    bedroom: "",
                    bathroom: "",
                    livingroom: "",
                    kitchen: ""
                },
                rules: {
                    areaId: [{required: true, message: "请选择地区"}],
                    address: [
                        {required: true, message: "请输入房屋地址", trigger: "blur"}
                    ],
                    areaSize: [
                        {required: true, message: "请输入房屋面积", trigger: "blur"}
                    ],
                    servLife: [
                        {required: true, message: "请输入使用年限", trigger: "blur"}
                    ],
                    desc: [{required: true, message: "请输入简要描述", trigger: "blur"}],
                    detailDesc: [
                        {required: true, message: "请输入详细描述", trigger: "blur"}
                    ],

                    type: [{required: true, message: "请输入房屋类型", trigger: "blur"}],
                    price: [{required: true, message: "请输入房屋价格", trigger: "blur"}],

                    level: [
                        {required: true, message: "请输入房屋所在楼层", trigger: "blur"}
                    ],

                    naturalGas: [
                        {required: true, message: "请输入房屋是否有天然气", trigger: "blur"}
                    ],

                    parkingLot: [
                        {required: true, message: "请输入房屋配有停车位", trigger: "blur"}
                    ],
                    heatingType: [
                        {required: true, message: "请输入房屋供暖类型", trigger: "blur"}
                    ],
                    waterType: [
                        {required: true, message: "请输入房屋用水类型", trigger: "blur"}
                    ],
                    electricType: [
                        {required: true, message: "请输入房屋用电类型", trigger: "blur"}
                    ],
                    orientation: [
                        {required: true, message: "请输入房屋朝向", trigger: "blur"}
                    ],
                    renovationType: [
                        {required: true, message: "请输入房屋装修情况", trigger: "blur"}
                    ]
                },
                state: this.$store.state,

                props: {
                    multiple: false,
                    lazy: true,
                    that: this,
                    id: 0,
                    lazyLoad(node, resolve) {
                        let pId = node.value;
                        let options = [];

                        this.that.$axios
                            .get("/district/location.do?pId=" + pId)
                            .then(res => {
                                let districts = res.data;
                                for (let i = 0; i < districts.length; i++) {
                                    let obj = {};
                                    obj.value = districts[i].id;
                                    obj.label = districts[i].name;
                                    if (node.level == 2) {
                                        obj.leaf = true;
                                    }

                                    options.push(obj);
                                }
                                resolve(options);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                },
                pId: 1,
                options: []
            };
        },
        methods: {
            inputFileForProve() {
                console.log("fuckyou 1 --------------------------------------------------------------------button")
                let isLogin = this.forceLogin();
                if (isLogin) {
                    return 0;
                }
                console.log("fuckyou 2 --------------------------------------------------------------------button")

                let inputELe = document.getElementById("fileElemForProve");
                var a = document.createEvent("MouseEvents");
                a.initEvent("click", true, true);
                inputELe.dispatchEvent(a);
            },
            getFileForProve() {
                console.log("fuckyou 1 --------------------------------------------------------------------input")

                let that = this;
                let inputELe = document.getElementById("fileElemForProve");

                this.fileListForProve.push(inputELe.files[0]);
                this.newImagesForPorve.push(inputELe.files[0]);
                console.log("fuckyou 2 --------------------------------------------------------------------input")

                if (this.fileListForProve.length > 5) {
                    alert("最多上传的5张图片");
                    this.fileListForProve.slice(this.fileListForProve.length - 1, 1);
                    this.newImagesForPorve.slice(this.newImagesForPorve.length - 1, 1);
                    return;
                }

                console.log("fuckyou 3 --------------------------------------------------------------------input")

                let reader = new FileReader();
                reader.readAsDataURL(inputELe.files[0]);

                reader.onload = function (e) {
                    let str =
                        "<img width='150px' height='150px' style='border-radius:2px' src='" +
                        e.target.result +
                        "'/>";
                    that.rawHtmlForProve.push(str);
                };

                console.log("fuckyou 4 --------------------------------------------------------------------input")

            },
            deleteImgForProve(index) {


                // 判断新加入的图片对象是否存在于新图片数组中，如果存在则删除之
                if (this.newImagesForPorve.indexOf(this.fileList[index]) >= 0) {
                    let newIndex = this.newImagesForPorve.indexOf(this.fileList[index]);
                    let result = this.newImagesForPorve.splice(newIndex, 1);
                    console.log(result[0].name);
                }

                this.rawHtmlForProve.splice(index, 1);
                let img = this.fileListForProve.splice(index, 1)[0];

                if (typeof img == "string") {
                    let imgNames = img.split("/");
                    let imgName = imgNames[imgNames.length - 1];

                    this.$axios
                        .get(
                            "/houseProve/deleteOne.do?imageName=" +
                            imgName +
                            "&houseNumber=" +
                            this.ruleForm.houseNumber
                        )
                        .then(res => {
                            console.log(res);
                        });
                }
            },
            confirm() {
                this.inputDialogVisible = false;
            },
            // 标记正在审核中
            ableRowClassName({row, rowIndex}) {
                console.log("==========================================");

                if (row.examineType === 1) {
                    return "warning-row";
                }
                console.log(rowIndex);
                console.log(row);
                return "";
            },

            showRuleForm() {
                alert(JSON.stringify(this.ruleForm));
            },

            cancelUpdate() {
                this.handleDialogClose();
            },
            handleDialogClose() {
                this.updateHouseInfoDialog = false;
                this.fileList = [];
                this.rawHtml = [];
                this.newImages = [];
                this.fileListForProve = [];
                this.rawHtmlForProve = [];
                this.newImagesForPorve=[];
            },

            handleEdit(index, row) {
                for (let i = 0; i < this.rawData.length; i++) {
                    if (this.rawData[i].id == row.id) {
                        this.ruleForm = this.rawData[i];
                        // alert(JSON.stringify(this.ruleForm))
                        this.$axios
                            .get("/district/location.do?pId=1")
                            .then(res => {
                                this.provinces = res.data;
                            })
                            .catch(err => {
                                console.log(err);
                            });

                        this.getCity();
                        this.getArea();
                        this.getImages();
                        this.getImagesForProve();
                        this.updateHouseInfoDialog = true;
                    }
                }
            },

// 顶层处理已售出
            handleSoldHouse(index, row) {
                // 如果当前房屋还未通过审核，不予允许售卖
                if (row.examineType == 1) {
                    alert("此房源信息还未审核通过，不可售出！");
                    return;
                }

                console.log(index);
                this.inputDialogVisible = true;
                this.row = row;
            },
// 确认买家账户
            handleConfirAccount() {
                this.$axios
                    .get("/user/checkAccount.do?account=" + this.buyerAccount)
                    .then(res => {
                        if (res.data == 1) {
                            this.soldHouse(this.row, this.buyerAccount);
                        } else {
                            this.$message.error("该用户不存在，请核查!")
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
// 将房屋标记为已售出
            soldHouse(row, account) {
                console.log(account);

                this.$confirm("此操作不可恢复，确认售出?", "售出房源", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let houseNumber = row.houseNumber;
                    this.$axios
                        .get("/house/saleOne.do?houseNumber=" + houseNumber + "&buyerAccount=" + account)
                        .then(res => {
                            if (res.data > 0) {
                                for (let i = 0; i < this.tableData.length; i++) {
                                    if (this.tableData[i].id == row.id) {
                                        this.tableData.splice(i, 1);
                                    }
                                }

                                this.inputDialogVisible = false;
                                this.$message.success("恭喜您交易成功!");
                            } else if (res.data == 0) {
                                this.$message.error("失败!");
                            }
                        });
                }).catch(() => {
                    console.log("取消");
                });
            },
            handleDelete(index, row) {
                this.$confirm("此操作不可恢复，确认删除?", "删除已发布房源", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        let houseNumber = row.houseNumber;
                        this.$axios
                            .get("/house/deleteOne.do?houseNumber=" + houseNumber)
                            .then(res => {
                                if (res.data > 0) {
                                    for (let i = 0; i < this.tableData.length; i++) {
                                        if (this.tableData[i].id == row.id) {
                                            this.tableData.splice(i, 1);
                                        }
                                    }
                                    this.$message.success("删除房源成功");
                                } else if (res.data == 0) {
                                    this.$message.error("失败!");
                                }
                            });
                    })
                    .catch(() => {
                        console.log("取消");
                    });
            },
            testRequest() {
                this.$axios.get("/house/published.do").then(res => {
                    console.log(res);
                });
            },
            getCity() {
                this.$axios("/district/location.do?pId=" + this.ruleForm.provinceId)
                    .then(res => {
                        this.cities = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            getArea() {
                this.$axios("/district/location.do?pId=" + this.ruleForm.cityId)
                    .then(res => {
                        this.areas = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            getImages() {
                // 请求房屋的图片
                this.$axios
                    .get("/image/url.do?houseNumber=" + this.ruleForm.houseNumber)
                    .then(res => {
                        if (res.data == "err") {
                            this.fileList = [];
                        } else {
                            this.fileList = res.data;
                            for (let i = 0; i < this.fileList.length; i++) {
                                let str =
                                    "<img width='150px' height='150px' style='border-radius:2px' src='" +
                                    this.fileList[i] +
                                    "'/>";
                                this.rawHtml.push(str);
                            }
                        }
                    })
                    .catch(err => {
                        console.log("获取房屋图片失败");
                        console.log(err);
                    });
            },
            getImagesForProve() {
                // 请求房屋的图片
                this.$axios
                    .get("/houseProve/getAll.do?houseNumber=" + this.ruleForm.houseNumber)
                    .then(res => {
                        if (res.data == "err") {
                            this.fileListForProve = [];
                        } else {
                            this.fileListForProve = res.data;
                            for (let i = 0; i < this.fileListForProve.length; i++) {
                                let str =
                                    "<img width='150px' height='150px' style='border-radius:2px' src='" +
                                    this.fileListForProve[i] +
                                    "'/>";
                                this.rawHtmlForProve.push(str);
                            }
                        }
                    })
                    .catch(err => {
                        console.log("获取证明材料失败");
                        console.log(err);
                    });
            },
            forceLogin() {
                if (!this.$store.state.globalIsLogin) {
                    this.$store.state.globalLoginDialogVisible = true;
                    return true;
                }
            },
            deleteImg(index) {
                // 判断新加入的图片对象是否存在于新图片数组中，如果存在则删除之
                if (this.newImages.indexOf(this.fileList[index]) >= 0) {
                    let newIndex = this.newImages.indexOf(this.fileList[index]);
                    let result = this.newImages.splice(newIndex, 1);
                    console.log(result[0].name);
                }
                this.rawHtml.splice(index, 1);
                let img = this.fileList.splice(index, 1)[0];

                if (typeof img == "string") {
                    let imgNames = img.split("/");
                    let imgName = imgNames[imgNames.length - 1];

                    this.$axios
                        .get(
                            "/image/deleteOne.do?imageName=" +
                            imgName +
                            "&houseNumber=" +
                            this.ruleForm.houseNumber
                        )
                        .then(res => {
                            console.log(res);
                        });
                }
            },
            // 通过按钮点击input
            inputFile() {
                let isLogin = this.forceLogin();
                if (isLogin) {
                    return 0;
                }
                let inputELe = document.getElementById("fileElem");
                var a = document.createEvent("MouseEvents");
                a.initEvent("click", true, true);
                inputELe.dispatchEvent(a);
            },
            // input改变时获取input输入的文件
            getFile() {
                let that = this;
                let inputELe = document.getElementById("fileElem");

                this.fileList.push(inputELe.files[0]);
                this.newImages.push(inputELe.files[0]);

                if (this.fileList.length > 5) {
                    alert("最多上传的5张图片");
                    this.fileList.slice(this.fileList.length - 1, 1);
                    this.newImages.slice(this.newImages.length - 1, 1);
                    return;
                }

                let reader = new FileReader();
                reader.readAsDataURL(inputELe.files[0]);

                reader.onload = function (e) {
                    // document.getElementById("imgshow").src = e.target.result
                    let str =
                        "<img width='150px' height='150px' style='border-radius:2px' src='" +
                        e.target.result +
                        "'/>";
                    that.rawHtml.push(str);
                };
            },

            update(formName) {
                let isLogin = this.forceLogin();
                if (isLogin) {
                    return 0;
                }

                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let files = new FormData();
                        for (let i = 0; i < this.newImages.length; i++) {
                            files.append("files", this.newImages[i]);
                        }

                        // 更新
                        this.$axios
                            .post("/upload/img.do", files)
                            .then(res => {
                                if (res.data == "ok") {
                                    // 创建表单对象
                                    let form = new FormData();
                                    form.append("house", JSON.stringify(this.ruleForm));

                                    // let param = {house: JSON.stringify(this.ruleForm)};
                                    this.$axios
                                        .post("/house/update.do", form)
                                        .then(res => {
                                            if (res.data > 0) {

                                                let files = new FormData();
                                                for (let i = 0; i < this.newImagesForPorve.length; i++) {
                                                    files.append("files", this.newImagesForPorve[i]);
                                                }

                                                this.$axios
                                                    .post("/upload/img.do", files).then(res => {
                                                    if (res.data == "ok") {
                                                        var form = new FormData();
                                                        form.append("houseNumber", this.ruleForm.houseNumber);
                                                        this.$axios.post("/house/addProve.do", form).then(res => {
                                                            if (res.data === "ok") {
                                                                this.$message.success("更新房源信息成功!");
                                                                this.updateHouseInfoDialog = false;
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        alert("信息填写错误，请检查！");
                        return false;
                    }
                });
            }
        },
        mounted() {
            // 根据session存储的用户信息查询出该用户发布的房源
            this.$axios
                .get("/house/published.do")
                .then(res => {
                    this.rawData = res.data;
                    for (let i = 0; i < res.data.length; i++) {
                        let obj = {};
                        let data = res.data[i];
                        obj.pubDate = getDateStr(data.pubDate);
                        // obj.district = this.getDistrict(data.provinceId,data.cityId,data.areaId);
                        this.$axios
                            .get(
                                "/district/singleLocation.do?provinceId=" +
                                data.provinceId +
                                "&cityId=" +
                                data.cityId +
                                "&areaId=" +
                                data.areaId
                            )
                            .then(res => {
                                if (data.examineType == 1) {
                                    obj.index = i + 1.1;
                                } else {
                                    obj.index = i + 1;
                                }

                                obj.examineType = data.examineType;
                                obj.id = data.id;
                                obj.district = res.data;
                                obj.address = data.address;
                                obj.houseNumber = data.houseNumber;
                                obj.desc = data.desc;
                                this.tableData.push(obj);
                            })
                            .catch(err => {
                                console.log(err);
                                return "";
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            // 获取供暖类型
            this.$axios
                .get("/type/heating/getAll.do")
                .then(res => {
                    this.heatingType = res.data;
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

            // 获取用电类型
            this.$axios
                .get("/type/electric/getAll.do")
                .then(res => {
                    this.electricType = res.data;
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

            // 获取用水类型
            this.$axios
                .get("/type/water/getAll.do")
                .then(res => {
                    this.waterType = res.data;

                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

            // 获取朝向类型
            this.$axios
                .get("/type/orientation/getAll.do")
                .then(res => {
                    this.orientation = res.data;
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

            // 获取装修类型
            this.$axios
                .get("/type/renovation/getAll.do")
                .then(res => {
                    this.renovationType = res.data;
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
</script>

<style scoped>
    .title {
        font-size: 20px;
        font-weight: bold;
    }

    .el-divider__text {
        background-color: #f5f5f5;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }

    .layout {
        display: inline-block;
        width: 60px;
    }

    li {
        float: left;
        margin-left: 10px;
        list-style: none;
    }

    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>