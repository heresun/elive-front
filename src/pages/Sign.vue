<template>
    <div>
        <div id="container">

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="ruleForm.account" @blur="accountVer"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="ruleForm.password2"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
<!--                <el-form-item label="居住地址" prop="address">-->
<!--                    <el-input v-model="ruleForm.address"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="联系方式" prop="phone">
                    <el-input type="tel" v-model="ruleForm.phone"></el-input>
                </el-form-item>

                <el-button class="el-button--primary" @click="sign(`ruleForm`)">注册</el-button>
                <el-button class="el-button--default" @click="$store.state.signDialogVisible=false">取消</el-button>
            </el-form>

        </div>
    </div>
</template>

<script>

    export default {
        name: "Sign",
        data() {

            //验证账号的合法性
            var accountVer = (rule, value, callback) => {
                let form = new FormData();
                form.append("account", this.ruleForm.account);
                this.$axios.post("/user/uniqueVer", form).then(res => {
                    if (res.data == "err") {

                        callback(new Error("该用户已经存在"));
                    } else {
                        callback()
                    }
                }).catch(err => {
                    alert(err.status);
                })
            };

            //验证确认密码
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    account: '',
                    password: '',
                    password2: '',
                    username: '',
                    // address: '',
                    phone: "",
                    photo: ""
                },
                rules: {
                    account: [
                        {required: true, message: '请输入', trigger: 'blur'},
                        {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入合法的手机号码', trigger: 'blur'},
                        {validator: accountVer, trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: "请输入姓名", trigger: "blur"},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    // address: [
                    //     {required: true, message: '请输入地址', trigger: 'blur'}
                    // ],
                    phone: [
                        {required: true, message: '请输入您的手机号码', trigger: 'blur'},
                        {pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入合法的手机号码', trigger: 'blur'},

                    ],
                    photo: [
                        {required: true, message: '请选择您的头像', trigger: 'change'}
                    ]
                },
                state: this.$store.state,
                files: []
            };
        },
        methods: {
            sign(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let form = new FormData();
                        //以下是获取input输入框中File对象的方法
                        // let file = document.getElementById("file")
                        // let files = this.$refs.sundehui.$refs.input.files;

                        // 将File对象放入form对象中
                        // for (let i = 0; i < files.length; i++) {
                        //     form.append("file", files[i]);
                        // }
                        form.append("account", this.ruleForm.account);
                        form.append("password", this.ruleForm.password);
                        form.append("username", this.ruleForm.username);
                        // form.append("address", this.ruleForm.address);
                        form.append("phone", this.ruleForm.phone);

                        this.$axios.post("/user/sign", form).then(res => {
                            if (res.data == "ok") {
                                this.$message.success("注册成功!正在跳转到主页")
                                this.$axios.post("/util/sleep").then(res => {
                                    if (res.data == "ok") {
                                        this.$store.state.globalSignDialogVisible = false;
                                        this.$store.state.globalLoginDialogVisible = false;
                                        this.$store.state.globalIsLogin = true;
                                        this.$store.state.globalAccount = this.ruleForm.account;
                                        this.$store.state.globalHeaderNotState="none";
                                        this.$store.state.globalHeaderYesState="";
                                        this.$router.replace("/")
                                    }
                                })
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        alert('信息填写错误，请检查！');
                        return false;
                    }
                });


            },


        }
    }


</script>

<style scoped>
    #container {
        /*margin-top: 180px;*/
        padding: 2% 0%;
        background: white;
        border-radius: 1%;
        width: 350px;
        margin: auto auto;
        height: 430px;
    }


</style>