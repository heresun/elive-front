<template>
    <div>

        <div id="container">
            <div align="center" style="margin-bottom: 10px">
                <img src="../../assets/logo.png" width="65%"/>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label-width="0" prop="user">
                    <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label-width="0" prop="pass">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label-width="auto">

                    <span style="width: 20%;margin-right: 10px">
                        <el-button type="primary" @click="login">登录</el-button>
                    </span>
                    <span style="width: 20%">
                        <el-button @click="$store.state.globalSignDialogVisible=true">注册</el-button>
                    </span>

                </el-form-item>

            </el-form>
        </div>


    </div>
</template>

<script>
    import qs from "qs"


    export default {
        name: "Login",
        data() {
            // 验证账户名的合法性
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            // 验证密码的合法性
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    user: '',
                    pass: '',
                },
                rules: {
                    user: [
                        {validator: validateUser, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                },
                loginFaile: "",
                state: this.$store.state
            };
        },
        methods: {
            //登录
            login() {
                console.log(this.state)
                if (this.ruleForm.user == "" || this.ruleForm.pass == "") {
                    this.$message.warning('请输入用户名或密码');

                } else {
                    let data = {
                        account: this.ruleForm.user,
                        password: this.ruleForm.pass
                    };
                    //qs将对象字符串化
                    let param = qs.stringify(data);
                    this.$axios.post("/user/login.do", param)
                        .then(response => {
                            if (response.data == "err") {
                                this.$message.error('用户名或密码错误');
                            } else {
                                console.log(response.data);
                                let user = qs.parse(response.data);
                                this.state.globalIsLogin = true;
                                this.state.globalLoginDialogVisible = false;
                                this.state.globalSignDialogVisible = false;
                                this.state.globalHeaderNotState = "none";
                                this.state.globalHeaderYesState = "";
                                this.state.globalAccount = response.data.account;
                                this.state.globalUserId = response.data.id;

                                // 获取当前用户的收藏列表
                                this.$axios.get("/collection/all.do").then(res => {

                                    for (let i=0; i < res.data.length; i++){
                                        this.$store.state.globalCollections.push(res.data[i].id);
                                    }
                                    console.log("获取当前用户的收藏列表")
                                    console.log(this.$store.state.globalCollections)
                                });
                                if (user.roleName=="admin"){
                                    this.$router.push("/management/index")
                                }else if (user.roleName=="user"){

                                this.$router.push("/");
                                }
                            }

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },
        },
        mounted(){
            console.log("登录挂载")
        }

    }
</script>

<style scoped>
    #container {
        /*margin-top: 180px;*/
        padding: 0;
        background: white;
        border-radius: 1px;
        width:350px;
    }

    #loginStyle {
        font-size: 50px;
    }
</style>