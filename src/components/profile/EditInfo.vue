<template>
    <div>
        <div class="container">
            <el-row>
                <el-col :span="12" :offset="1">
                    <el-form>
                        <el-form-item label="我的头像">
                            <div class="crop-demo">
                                <img :src="cropImg" class="pre-img">
                                <div class="crop-demo-btn">修改头像
                                    <input class="crop-input" type="file" name="image" accept="image/*"
                                           @change="setImage"/>
                                </div>
                            </div>

                            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                                <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage"
                                             :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                                <span slot="footer" class="dialog-footer">
                                            <el-button @click="cancelCrop">取 消</el-button>
                                            <el-button type="primary" @click="confirmImg">确 定</el-button>
                                    </span>
                            </el-dialog>

                        </el-form-item>
                        <el-form-item label="用户名">
                            {{$store.state.globalUserInfo.username}}
                            <el-button type="text" @click="changeUserName">
                                修改
                            </el-button>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            {{$store.state.globalUserInfo.phone}}
                            <el-button type="text" @click="changePhone">
                                修改
                            </el-button>
                        </el-form-item>
                        <el-form-item label="修改密码">
                            <el-button type="text" @click="changePassword">
                                修改
                            </el-button>
                        </el-form-item>
                        <el-form-item label="账号审核">
                            <div style="display: flex;height: 40px;align-items: center">
                                <div v-if="$store.state.globalUserInfo.examineType!=0"
                                     style="border-radius: 2px;padding: 0px 0px 0px 10px;background: #39ac6a;height: 20px; width:60px;font-size: 12px;color: white;line-height: 20px;">
                                    审核通过
                                </div>
                                <div v-if="$store.state.globalUserInfo.examineType==0"
                                     style="border-radius: 2px;padding: 0px 0px 0px 10px;background: orangered;height: 20px; width: 70px;font-size: 12px;color: white;line-height: 20px;">
                                    审核未通过
                                </div>

                            </div>
                        </el-form-item>
                        <el-form-item label="审核材料" prop="" required v-if="$store.state.globalUserInfo.examineType===0">
                            <input type="file" multiple style="display:none" id="fileElemForProve"
                                   @change="getFileForProve"/>

                            <el-button size="mini" type="text" @click="inputFileForProve">选取文件</el-button>

                            <el-button size="mini" type="primary" @click="submitProve">提交</el-button>

                            <span class="warningInfo"> 此为必选项，若无则无法通过审核！</span>
                            <div style="margin-top:5px;padding-top:0.1px;width: 800px;height: 200px; background-color: #f1f1f1;border-radius: 8px">
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
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="请输入新的用户名" :visible.sync="dialogForChangeName" width="300px" :close-on-click-modal="false">
            <el-input v-model="newUserName" type="text"></el-input>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogForChangeName=false">取 消</el-button>
                <el-button type="primary" @click="confirmNewName">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="请输入新的手机号名" :visible.sync="dialogForChangePhone" width="300px" :close-on-click-modal="false">
            <el-input v-model="newPhone" type="text"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogForChangePhone=false">取 消</el-button>
                <el-button type="primary" @click="confirmNewPhone">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改密码" :visible.sync="dialogForChangePwd" width="300px" :close-on-click-modal="false"
                   :destroy-on-close="true">

            <el-form label-width="100px">
                <el-form-item label-width="验证旧密码">
                    <el-input v-model="oldPwd" type="password" placeholder="请输入旧密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogForChangePwd=false">取 消</el-button>
                <el-button type="primary" @click="confirmOldPwd">验 证</el-button>
            </span>
        </el-dialog>
        <el-dialog title="请输入新密码" :visible.sync="dialogChangePwd" :close-on-click-modal="false">
            <el-form label-width="100px">
                <el-form-item label="新密码">
                    <el-input v-model="newPwd_1" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码">
                    <el-input v-model="newPwd_2" type="password" placeholder="请再次输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogChangePwd=false">取 消</el-button>
                <el-button type="primary" @click="confirmNewPwd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    import VueCropper from 'vue-cropperjs';


    export default {
        name: 'basetable',
        data() {
            return {
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
                dialogForChangeName: false,
                dialogForChangePhone: false,
                dialogForChangePwd: false,
                dialogChangePwd: false,
                newUserName: '',
                newPhone: "",
                newPwd_1: "",
                newPwd_2: "",
                oldPwd: "",
                fileListForProve: [],
                rawHtmlForProve: [],
                newImagesForPorve: []

            };
        },
        components: {
            VueCropper
        },
        methods: {
            submitProve() {
                if (this.newImagesForPorve.length === 0) {
                    this.$message.warning("请选择新文件!");
                    return;
                }
                var form = new FormData();
                for (let i = 0; i < this.newImagesForPorve.length; i++) {
                    form.append("files", this.newImagesForPorve[i]);
                }
                this.$axios.post("/upload/img.do", form).then(res => {
                    if (res.data === "ok") {
                        this.$axios.get("/user/addProve.do").then(res => {
                            if (res.data == "ok") {
                                this.$message.success("提交审核成功!")
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                });

            },
            changePhone() {
                this.dialogForChangePhone = true;
            },
            confirmNewPhone() {
                var pattern = new RegExp(/^[1][3,4,5,6,7,8][0-9]{9}$/);
                var b = pattern.test(this.newPhone);
                if (!b) {
                    this.$message.error("请输入合法的手机号!")
                    return;
                }

                let form = new FormData();
                form.append('newPhone', this.newPhone);
                this.$axios.post('/util/updateTextInfo.do', form).then(res => {
                    if (res.data == 'ok') {
                        this.$message.success("修改手机号码成功!")
                        this.$axios
                            .get('/util/isLogin.do')
                            .then(res => {
                                console.log(res);
                                if (res.data == false) {
                                    console.log('您还未登录!');
                                } else {
                                    this.$store.state.globalUserInfo = res.data;
                                    this.dialogForChangePhone = false;

                                    // this.$router.push("/")
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });


            },
            changeUserName() {
                this.dialogForChangeName = true;
            },
            confirmNewName() {
                let form = new FormData();
                form.append('newName', this.newUserName);
                this.$axios.post('/util/updateTextInfo.do', form).then(res => {
                    if (res.data == 'ok') {
                        this.$message.success("修改用户名成功!")

                        this.$axios
                            .get('/util/isLogin.do')
                            .then(res => {
                                console.log(res);
                                if (res.data == false) {
                                    console.log('您还未登录!');
                                } else {
                                    this.$store.state.globalUserInfo = res.data;
                                    this.dialogForChangeName = false;

                                    // this.$router.push("/")
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
            },
            confirmOldPwd() {
                if (this.oldPwd.length <= 0) {
                    this.$message.error("请输入旧密码!");
                    return;
                }
                let form = new FormData();
                form.append("usedPwd", this.oldPwd);
                this.$axios.post("/util/checkUsedPwd.do", form).then(res => {
                    if (res.data == "ok") {
                        this.$message.success("验证成功!")
                        this.dialogForChangePwd = false;
                        this.dialogChangePwd = true;
                    } else {
                        this.$message.error("密码验证失败,请检查输入的密码!")
                    }
                }).then(err => {
                    console.log(err);
                })

            },
            confirmNewPwd() {
                if (this.newPwd_1.length <= 0 || this.newPwd_2.length <= 0) {
                    this.$message.error("请正确输入密码!");
                    return;
                }
                if (this.newPwd_1 !== this.newPwd_2) {
                    this.$message.error("输入的密码不一致!");
                    return;
                }

                var form = new FormData();
                form.append("newPwd", this.newPwd_2);
                this.$axios.post("/util/updatePwd.do", form).then(res => {
                    if (res.data === "ok") {
                        this.dialogForChangePwd = false;
                        this.$axios
                            .get('/util/isLogin.do')
                            .then(res => {
                                console.log(res);
                                if (res.data == false) {
                                    console.log('您还未登录!');
                                    this.$message.success("请重新登录!")

                                    this.$store.state.globalIsLogin = false;
                                    this.$store.state.globalUserId = null;
                                    this.$store.state.globalAccount = "";
                                    this.$store.state.globalHeaderNotState = "";
                                    this.$store.state.globalHeaderYesState = "none";
                                    this.$store.state.globalUserInfo = {};
                                    this.$router.push("/");
                                } else {
                                    this.$store.state.globalUserInfo = res.data;
                                    this.dialogForChangeName = false;

                                    //
                                }
                            }).catch(err => {
                            console.log(err)
                        });
                    }

                }).catch(err => {
                    console.log(err)
                });
            },
            changePassword() {
                this.dialogForChangePwd = true;
                // 需要验证旧密码
            },
            setImage(e) {
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage() {
                console.log('croping');
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop() {
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            confirmImg() {
                this.dialogVisible = false;
                console.log(this.cropImg);

                var form = new FormData();
                form.append('newPhoto', this.cropImg);
                this.$axios.post('/util/updateUserPhoto.do', form).then(res => {
                    if (res.data === 'ok') {
                        this.$message.success('传输成功！');
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            getFileForProve() {
                let that = this;
                let inputELe = document.getElementById("fileElemForProve");

                this.fileListForProve.push(inputELe.files[0]);
                this.newImagesForPorve.push(inputELe.files[0]);

                if (this.fileListForProve.length > 5) {
                    alert("最多上传的5张图片");
                    this.fileListForProve.slice(this.fileListForProve.length - 1, 1);
                    this.newImagesForPorve.slice(this.newImagesForPorve.length - 1, 1);
                    return;
                }

                let reader = new FileReader();
                reader.readAsDataURL(inputELe.files[0]);

                reader.onload = function (e) {
                    // document.getElementById("imgshow").src = e.target.result
                    let str =
                        "<img width='100px' height='100px' style='border-radius:2px' src='" +
                        e.target.result +
                        "'/>";
                    that.rawHtmlForProve.push(str);
                };
            },
            inputFileForProve() {

                let inputELe = document.getElementById("fileElemForProve");
                var a = document.createEvent("MouseEvents");
                a.initEvent("click", true, true);
                inputELe.dispatchEvent(a);
            },
            deleteImgForProve(index) {

                // 判断新加入的图片对象是否存在于新图片数组中，如果存在则删除之
                if (this.newImagesForPorve.indexOf(this.fileListForProve[index]) >= 0) {
                    let newIndex = this.newImagesForPorve.indexOf(this.fileListForProve[index]);
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
                            "/user/deleteOneProve.do?imageName=" + imgName
                        )
                        .then(res => {
                            if (res.data == "ok"){
                                this.$message.success("删除成功!")
                            }else{
                                this.$message.error("删除失败!")
                            }
                        });
                }
            },
            getImagesForProve() {
                // 请求用户证明信息
                this.$axios
                    .get("/user/getAllProve.do")
                    .then(res => {
                        if (res.data == "err") {
                            this.fileListForProve = [];
                        } else {
                            this.fileListForProve = res.data;
                            for (let i = 0; i < this.fileListForProve.length; i++) {
                                let str =
                                    "<img width='100px' height='100px' style='border-radius:2px' src='" +
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
            }
        },
        created() {
            this.cropImg = this.$store.state.globalUserInfo.photo;
            this.getImagesForProve()
        }

    };
</script>

<style scoped>
    .warningInfo {
        font-size: 12px;
        font-weight: bold;
        color: orangered;
    }

    .pre-img {
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }

    .crop-demo {
        display: flex;
        align-items: flex-end;
    }

    .crop-demo-btn {
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .crop-input {
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }


    li {
        float: left;
        margin-left: 10px;
        list-style: none;
    }
</style>
