<template>
    <div id="container">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所在地区" prop="areaId">
                <el-cascader
                        placeholder="请选择"
                        :props="props"
                        ref="cascader"
                        :options="options"
                        v-model="ruleForm.areaId"
                        v-on:change="test"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input type="text" v-model="ruleForm.address" placeholder="所在街道和门牌号" @focus="forceLogin"></el-input>
            </el-form-item>
            <el-form-item label="房屋面积" prop="areaSize">
                <el-input type="text" v-model="ruleForm.areaSize" placeholder="单位:平方" @focus="forceLogin"></el-input>
            </el-form-item>
            <el-form-item label="使用年限" prop="servLife">
                <el-input v-model="ruleForm.servLife" placeholder="单位:年" @focus="forceLogin"></el-input>
            </el-form-item>
            <el-form-item label="所在楼层" prop="level">
                <el-input v-model="ruleForm.level" placeholder="单位:楼" @focus="forceLogin"></el-input>
            </el-form-item>
            <el-form-item label="房屋类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="选择房屋类型" @focus="forceLogin">
                    <el-option
                            v-for="(item,index) in type"
                            :key="index"
                            :label="item"
                            :value="index">

                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="天然气" prop="naturalGas">
                <el-select v-model="ruleForm.naturalGas" placeholder="选择是否有天然气" @focus="forceLogin">
                    <el-option
                            v-for="(item,index) in naturalGas"
                            :key="index"
                            :label="item"
                            :value="index">

                    </el-option>
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
                            :value="index">

                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房屋朝向" prop="orientation">
                <el-select v-model="ruleForm.orientation" placeholder="选择房屋朝向" @focus="forceLogin">
                    <el-option
                            v-for="item in orientation"
                            :key="item.id"
                            :label="item.direction"
                            :value="item.id">

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="供暖类型" prop="heatingType">
                <el-select v-model="ruleForm.heatingType" placeholder="选择供暖类型" @focus="forceLogin">
                    <el-option
                            v-for="item in heatingType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用水类型" prop="waterType">
                <el-select v-model="ruleForm.waterType" placeholder="选择用水类型" @focus="forceLogin">
                    <el-option
                            v-for="item in waterType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用电类型" prop="electricType">
                <el-select v-model="ruleForm.electricType" placeholder="选择用电类型" @focus="forceLogin">
                    <el-option
                            v-for="item in electricType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="装修情况" prop="renovationType">
                <el-select v-model="ruleForm.renovationType" placeholder="选择装修类型" @focus="forceLogin">
                    <el-option
                            v-for="item in renovationType"
                            :key="item.id"
                            :label="item.type"
                            :value="item.id">

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="简单描述" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" placeholder="简要描述房子特点，如朝向、楼层等,不超过30字"
                          @focus="forceLogin"></el-input>
            </el-form-item>

            <el-form-item label="详细描述" prop="detailDesc">
                <el-input type="textarea" v-model="ruleForm.detailDesc"
                          placeholder="详细描述房屋的卖点,如周围的公共设施、交通情况等，不超过90字" @focus="forceLogin"></el-input>
            </el-form-item>

            <el-form-item label="证明材料" prop="" required>
                <input type="file" multiple style="display:none" id="fileElemForProve" @change="getFileForProve"
                       @focus="forceLogin"/>

                <el-button areaSize="small" type="success" @click="inputFileForProve">选取文件</el-button>
                <span class="warningInfo"> 此为必选项，若无则无法通过房屋审核！</span>
                <div style="margin-top:5px;padding-top:0.1px;width: 900px;height: 230px; background-color: #f1f1f1;border-radius: 8px">
                    <ul>
                        <li v-for="(item, index) in rawHtmlForProve" :key="index">
                            <div v-html="item"></div>
                            <div style="text-align: center;">
                                <el-button type="danger" icon="el-icon-delete" areaSize="mini"
                                           @click="deleteImgForProve(index)">
                                    删除
                                </el-button>
                            </div>

                        </li>
                    </ul>
                </div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-form-item>


            <el-form-item label="房屋图片" prop="" required>
                <input type="file" multiple style="display:none" id="fileElem" @change="getFile" @focus="forceLogin"/>

                <el-button areaSize="small" type="success" @click="inputFile">选取文件</el-button>
                <span class="warningInfo"> 此为必选项，若无则无法通过房屋审核！</span>
                <div style="margin-top:5px;padding-top:0.1px;width: 900px;height: 230px; background-color: #f1f1f1;border-radius: 8px">
                    <ul>
                        <li v-for="(item, index) in rawHtml" :key="index">
                            <div v-html="item"></div>
                            <div style="text-align: center;">

                                <el-button type="danger" icon="el-icon-delete" areaSize="mini"
                                           @click="deleteImg(index)">
                                    删除
                                </el-button>
                            </div>

                        </li>
                    </ul>
                </div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

            </el-form-item>
            <el-button class="el-button--primary" @click="publish(`ruleForm`)">发布</el-button>
            <el-button class="el-button--default" @click="$router.push('/')">取消</el-button>

        </el-form>
        <el-button @click="test">财务室</el-button>
    </div>
</template>

<script>


    export default {
        name: "SaleHouse",
        components: {},

        data() {
            return {
                rawHtmlForProve: [],
                fileListForProve: [],
                fileList: [],
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

                dialogImageUrl: '',
                dialogVisible: false,

                ruleForm: {
                    areaId: '',
                    provinceId: '',
                    cityId: '',
                    address: '',
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
                    kitchen: "",


                },
                rules: {
                    areaId: [
                        {required: true, message: '请选择地区'},

                    ],
                    address: [
                        {required: true, message: '请输入房屋地址', trigger: 'blur'}
                    ],
                    areaSize: [
                        {required: true, message: '请输入房屋面积', trigger: 'blur'},
                    ],
                    servLife: [
                        {required: true, message: "请输入使用年限", trigger: "blur"},
                    ],
                    desc: [
                        {required: true, message: '请输入简要描述', trigger: 'blur'}
                    ],
                    detailDesc: [
                        {required: true, message: '请输入详细描述', trigger: 'blur'}
                    ],

                    type: [
                        {required: true, message: "请输入房屋类型", trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: "请输入房屋价格", trigger: 'blur'}
                    ],

                    level: [
                        {required: true, message: "请输入房屋所在楼层", trigger: 'blur'}
                    ],

                    naturalGas: [
                        {required: true, message: "请输入房屋是否有天然气", trigger: 'blur'}
                    ],

                    parkingLot: [
                        {required: true, message: "请输入房屋配有停车位", trigger: 'blur'}
                    ],
                    heatingType: [
                        {required: true, message: "请输入房屋供暖类型", trigger: 'blur'}
                    ],
                    waterType: [
                        {required: true, message: "请输入房屋用水类型", trigger: 'blur'}
                    ],
                    electricType: [
                        {required: true, message: "请输入房屋用电类型", trigger: 'blur'}
                    ],
                    orientation: [
                        {required: true, message: "请输入房屋朝向", trigger: 'blur'}
                    ],
                    renovationType: [
                        {required: true, message: "请输入房屋装修情况", trigger: 'blur'}
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


                        this.that.$axios.get("/district/location.do?pId=" + pId).then(res => {
                            let districts = res.data;
                            for (let i = 0; i < districts.length; i++) {
                                let obj = {};
                                obj.value = districts[i].id;
                                obj.label = districts[i].name;
                                if (node.level == 2) {
                                    obj.leaf = true;
                                }

                                options.push(obj)
                            }
                            resolve(options)
                        }).catch(err => {
                            console.log(err);
                        });


                    }
                },
                pId: 1,
                options: []
            };
        },
        methods: {

            getFileForProve() {
                let that = this;
                let inputELe = document.getElementById("fileElemForProve");
                this.fileListForProve.push(inputELe.files[0]);
                if (this.fileListForProve.length > 5) {
                    alert("最多上传的5张图片");
                    this.fileListForProve.slice(this.fileList.length - 1, 1);
                    return;
                }

                let reader = new FileReader();
                reader.readAsDataURL(inputELe.files[0]);

                reader.onload = function (e) {
                    // document.getElementById("imgshow").src = e.target.result
                    let str = "<img width='150px' height='150px' style='border-radius:2px' src='" + e.target.result + "'/>";
                    that.rawHtmlForProve.push(str)
                };
            },
            inputFileForProve() {
                let isLogin = this.forceLogin();
                if (isLogin) {
                    return 0;
                }
                let inputELe = document.getElementById("fileElemForProve");
                var a = document.createEvent("MouseEvents");
                a.initEvent("click", true, true);
                inputELe.dispatchEvent(a);
            },
            deleteImgForProve(index) {
                this.fileListForProve.splice(index, 1);
                this.rawHtmlForProve.splice(index, 1)
            },
            forceLogin() {

                if (!this.$store.state.globalIsLogin) {
                    this.$store.state.globalLoginDialogVisible = true;
                    return true;
                }
            },
            deleteImg(index) {
                this.fileList.splice(index, 1);
                this.rawHtml.splice(index, 1)
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
                if (this.fileList.length > 5) {
                    alert("最多上传的5张图片");
                    this.fileList.slice(this.fileList.length - 1, 1);
                    return;
                }

                let reader = new FileReader();
                reader.readAsDataURL(inputELe.files[0]);

                reader.onload = function (e) {
                    // document.getElementById("imgshow").src = e.target.result
                    let str = "<img width='150px' height='150px' style='border-radius:2px' src='" + e.target.result + "'/>";
                    that.rawHtml.push(str)
                };

            },

            getDistrict(options, pId) {

                this.$axios.get("/district/location.do?pId=" + pId).then(res => {
                    let districts = res.data;
                    for (let i = 0; i < districts.length; i++) {
                        let obj = {};
                        obj.value = districts[i].id;
                        obj.label = districts[i].name;
                        obj.children = [];

                        options.push(obj)
                    }


                }).catch(err => {
                    console.log(err);
                });

            },


            publish(formName) {

                let isLogin = this.forceLogin();
                if (isLogin) {
                    return 0;
                }

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let files = new FormData();
                        for (let i = 0; i < this.fileList.length; i++) {
                            files.append("files", this.fileList[i]);
                        }

                        // 发布
                        this.$axios.post("/upload/img.do", files).then(res => {
                            if (res.data == "ok") {
                                // 创建表单对象
                                let form = new FormData();
                                // 填充地区数据信息
                                let district = this.ruleForm.areaId;
                                this.ruleForm.provinceId = district[0];
                                this.ruleForm.cityId = district[1];
                                this.ruleForm.areaId = district[2];
                                form.append("house", JSON.stringify(this.ruleForm));

                                this.$axios.post("/house/addOne.do", form).then(res => {
                                    if (res.data != "err") {
                                        let houseNumber = res.data;

                                        let files = new FormData();
                                        for (let i = 0; i < this.fileListForProve.length; i++) {
                                            files.append("files", this.fileListForProve[i]);
                                        }
                                        this.$axios.post("/upload/img.do", files).then(res => {
                                            if (res.data==="ok"){
                                                var form = new FormData();
                                                form.append("houseNumber",houseNumber);
                                                this.$axios.post("/house/addProve.do",form).then(res=>{
                                                    if(res.data === "ok"){
                                                        this.$message.success("发布成功，工作人员正在审核中！")
                                                        this.$router.push("/")
                                                    }
                                                }).catch(err=>{
                                                    console.log(err)
                                                });
                                            }
                                        }).catch(err=>{
                                            console.log(err);
                                        })

                                    }
                                }).catch(err => {
                                    console.log(err)
                                });
                            }
                        }).catch(err => {
                            console.log(err);
                        });


                    } else {
                        alert('信息填写错误，请检查！');
                        return false;
                    }
                });
            },

            test() {
                console.log(this.ruleForm);
            }

        },
        mounted() {
            // 获取地区一级选项
            this.getDistrict(this.options, this.pId);

            // 获取供暖类型
            this.$axios.get("/type/heating/getAll.do").then(res => {
                this.heatingType = res.data;
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })

            // 获取用电类型
            this.$axios.get("/type/electric/getAll.do").then(res => {
                this.electricType = res.data;
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })


            // 获取用水类型
            this.$axios.get("/type/water/getAll.do").then(res => {
                this.waterType = res.data;

                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })


            // 获取朝向类型
            this.$axios.get("/type/orientation/getAll.do").then(res => {
                this.orientation = res.data;
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })

            // 获取装修类型
            this.$axios.get("/type/renovation/getAll.do").then(res => {
                this.renovationType = res.data;
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>

<style scoped>
    .warningInfo {
        font-size: 12px;
        font-weight: bold;
        color:orangered;
    }

    li {
        float: left;
        margin-left: 10px;
        list-style: none;
    }

    .layout {
        display: inline-block;
        width: 60px;
    }
</style>