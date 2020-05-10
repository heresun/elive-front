<template>
    <div id="container">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "App",
        components: {},
        data() {
            return {};
        },
        mounted() {
            console.log("1-1");

            //  this.$store.state.globalCityName = "";
            // 防止页面刷新导致数据前端丢失
            this.$axios
                .get("/util/isLogin.do")
                .then(res => {
                    console.log(res);
                    if (res.data == false) {
                        console.log("您还未登录!");
                    } else {
                        this.$store.state.globalIsLogin = true;
                        this.$store.state.globalUserId = res.data.id;
                        this.$store.state.globalAccount = res.data.account;
                        this.$store.state.globalHeaderNotState = "none";
                        this.$store.state.globalHeaderYesState = "";
                        this.$store.state.globalUserInfo = res.data;

                        // 获取当前用户的收藏列表
                        this.$axios
                            .get("/collection/all.do?account=" + res.data.account)
                            .then(res => {
                                for (let i = 0; i < res.data.length; i++) {
                                    this.$store.state.globalCollections.push(res.data[i].id);
                                }
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            // 每次刷新从后台获取城市数据，并刷新主页的房屋信息列表
            this.$axios
                .post("/util/globalCity.do")
                .then(res => {
                    if (res.data != "err") {
                        this.$store.state.globalCityId = res.data.cityId;
                        this.$store.state.globalCityName = res.data.cityName;
                        this.getHousePage();
                        console.log(res.data);
                    } else {
                        this.$store.state.globalCityId = 149;
                        this.$store.state.globalCityName = "郑州";
                        this.getHousePage();
                        console.log(res.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        methods: {
            getHousePage() {
                let type = 0;
                let form = new FormData();
                let obj = {
                    page: 1,
                    count: 4,
                    type: type,
                    cityId: this.$store.state.globalCityId
                };
                form.append("filterParams", JSON.stringify(obj));
                this.$axios
                    .post("/house/housePage.do", form)
                    .then(res => {
                        this.$store.state.newHouseIndex = res.data.housePage;
                        console.log("new");

                        console.log(this.$store.state.newHouseIndex);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                let type1 = 1;
                let form1 = new FormData();
                let obj1 = {
                    page: 1,
                    count: 4,
                    type: type1,
                    cityId: this.$store.state.globalCityId
                };
                form1.append("filterParams", JSON.stringify(obj1));
                this.$axios
                    .post("/house/housePage.do", form1)
                    .then(res => {
                        this.$store.state.usedHouseIndex = res.data.housePage;
                        console.log("used");

                        console.log(this.$store.state.usedHouseIndex);
                    })
                    .catch(err => {
                        console.log(err);
                    });


                // let type2 = 1;
                let form2 = new FormData();
                let obj2 = {
                    page: 1,
                    count: 4,
                    // type: type2,
                    cityId: this.$store.state.globalCityId
                };
                form2.append("filterParams", JSON.stringify(obj2));
                this.$axios
                    .post("/house/getRecommend.do", form2)
                    .then(res => {
                        this.$store.state.recoHouseIndex = res.data.housePage;

                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };
</script>

<style scoped>
    #container {
    }
</style>
