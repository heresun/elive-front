<template>
  <div id="nav">
    <!--登录模态框-->
    <el-dialog
      id="login"
      title="登录"
      :visible.sync="$store.state.globalLoginDialogVisible"
      :close-on-click-modal="false"
      :center="true"
      :destroy-on-close="true"
      width="400px"
    >
      <el-row type="flex" justify="center">
        <el-col>
          <Login></Login>
        </el-col>
      </el-row>
    </el-dialog>
    <!--注册模态框-->
    <el-dialog
      id="sign"
      title="注册"
      :visible.sync="$store.state.globalSignDialogVisible"
      :close-on-click-modal="false"
      :center="true"
      :destroy-on-close="true"
      width="450px"
    >
      <el-row type="flex" justify="center">
        <el-col>
          <Sign></Sign>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 地址选择模态框 -->
    <el-dialog
      id="locationSelect"
      title="请选择城市"
      :visible.sync="locationDialogVisible"
      :close-on-click-modal="false"
      :center="true"
      :destroy-on-close="true"
      width="450px"
    >
      <div style="display:flex">
        <div class="locationGroup">
          <el-select
            v-model="provinceId"
            placeholder="省份"
            @change="getCity"
            popper-class="select-option"
            filterable
          >
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="locationGroup">
          <el-select
            v-model="$store.state.globalCityId"
            placeholder="城市"
            popper-class="select-option"
            filterable
          >
            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="locationGroup">
          <el-button type="primary" @click="confirmCity">确认</el-button>
        </div>
      </div>
    </el-dialog>

    <!--如果当前还未登录，显示-->
    <el-row justify="end" type="flex" :style="`display:${$store.state.globalHeaderNotState}`">
      <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="0">
        <span
          style="color:white;font-size: 12px;cursor: pointer"
          @click="$store.state.globalLoginDialogVisible=true"
        >
          <i class="el-icon-s-custom">登 录</i>
        </span>
      </el-col>

      <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="0" style="margin-right:30px">
        <span
          style="color:white;font-size: 12px;cursor: pointer"
          @click="$store.state.globalSignDialogVisible=true"
        >
          <i style="font-style: normal">注册</i>
        </span>
      </el-col>
    </el-row>

    <!--如果当前已经登录，显示-->
    <el-row type="flex" justify="end" :style="`display:${$store.state.globalHeaderYesState}`">
      <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="0" style="margin-right: 10px">
        <span style="color:white;font-size: 12px;cursor: pointer">
          <router-link to="/user/profile" class="router-link-active">
            <i class="el-icon-s-custom">{{$store.state.globalAccount}}</i>
          </router-link>
        </span>
      </el-col>

      <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="0" style="margin-right:45px">
        <span style="color:white;font-size: 12px;cursor: pointer" @click="logout">
          <i style="font-style: normal">退 出</i>
        </span>
      </el-col>
    </el-row>

    <div style="height: 10px"></div>

    <!-- 主页左侧 logo和定位 -->
    <el-row type="flex" justify="end">
      <el-col :span="6">
        <div class="imgAndlocation">
          <div>
            <img src="../../assets/ee.png" width="120" />
          </div>
          <!-- 选取城市定位 -->
          <div>
            <div class="location" @click="selectLocation">
              <span>
                <i class="el-icon-location-outline" style="margin-right:5px"></i>
                {{$store.state.globalCityName}}
              </span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="15">
        <ul>
          <li>
            <router-link to="/" class="router-link-active">
              <span class="text">主 页</span>
            </router-link>
          </li>
          <li>
            <span class="text" @click="buyNewHouse">新 房</span>
          </li>
          <li>
            <span class="text" @click="buyUsedHouse">二手房</span>
          </li>
          <li>
            <span class="text" @click="publishHouse">发布房源</span>
          </li>
          <li>
            <span class="text" @click="layoutAnalysis">户型分析</span>
          </li>
          <li>
            <span class="text" @click="priceAnalysis">房价分析</span>
          </li>
          <li>
            <span class="text" @click="$router.push('/house/transactionAnalysis')">交易分析</span>
          </li>
          <li>
            <span class="text" @click="$router.push('/house/houseAnalysis')">房源分析</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Login from "@/components/login_sign/Login";
import Sign from "@/components/login_sign/Sign";

export default {
  name: "Header",
  components: {
    Login,
    Sign
  },
  data() {
    return {
      state: this.$store.state,

      //   cityName: "郑州",
      provinceList: [],
      cityList: [],
      locationDialogVisible: false,
      provinceId: ""
    };
  },
  methods: {
    getCity() {
      this.$axios
        .get("/district/location.do?pId=" + this.provinceId)
        .then(res => {
          this.cityList = res.data;
        });
    },
    confirmCity() {
      this.cityList.forEach(item => {
        if (item.id == this.$store.state.globalCityId) {
          this.$store.state.globalCityName = item.name;
        }
      });
      this.getHousePage();
      this.locationDialogVisible = false;

      // 把当前定位的城市信息发送到后台,以防刷新丢失城市信息
      let obj = {
        cityName: this.$store.state.globalCityName,
        cityId: this.$store.state.globalCityId
      };
      let form = new FormData();
      form.append("cityInfo", JSON.stringify(obj));

      this.$axios
        .post("/util/globalCity.do", form)
        .then(res => {
          if (res.data == "ok") {
            console.log("选择城市成功!");
          } else if (res.data == "err") {
            this.$message.error("选择城市失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHousePage() {
      let type = 0;
      let form = new FormData();
      let obj = {
        page: 1,
        count: 4,
        type: type,
        cityId: this.state.globalCityId
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
        cityId: this.state.globalCityId
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



    },
    selectLocation() {
      // 先把省 id和全局市 id置空
      this.provinceId = "";
      this.state.globalCityId = "";

      this.$axios.get("/district/location.do?pId=1").then(res => {
        this.provinceList = res.data;
      });

      this.locationDialogVisible = true;

      //   if(this.state.globalCityId == ""){
      //       this.state.globalCityId = 149;
      //   }
    },
    logout() {
      this.$axios
        .post("/user/logout.do")
        .then(response => {
          if (response.data === "ok") {
            this.state.globalIsLogin = false;
            this.state.globalHeaderNotState = "";
            this.state.globalHeaderYesState = "none";
            this.state.globalAccount = "";

            this.$message.success("退出成功！");
            //返回主页
            this.$router.replace("/");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    publishHouse() {
      this.$router.push("/house/publish");
    },

    buyNewHouse() {
      this.$store.state.globalSearchType = 0;
      this.$store.state.globalAddress = "";
      this.$router.push("/house/onSaleNew");
    },
    buyUsedHouse() {
      this.$store.state.globalSearchType = 1;
      this.$store.state.globalAddress = "";
      this.$router.push("/house/onSaleUsed");
    },
    layoutAnalysis() {
      this.$router.push("/house/analysis/layout");
    },

    priceAnalysis() {
      this.$router.push("/house/analysis/price");
    }
  },
  mounted() {
    this.getHousePage();
  }
};
</script>

<style scoped>
.text {
  font-size: 16px;
  /*font-family: "黑体";*/
  font-weight: 700;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: white;
}

ul > li {
  list-style: none;
  float: left;
  margin-left: 30px;
  color: white;
  font-size: 16px;
  font-weight: 700;
}

.imgAndlocation {
  display: flex;
  align-items: center;
}

.location {
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  height: 27px;
  line-height: 27px;
  padding: 0px 10px;
  color: white;
  cursor: pointer;
  font-size: 12px;
}

.locationGroup {
  margin-right: 5px;
}

.select-option li {
  float: none !important;
  color: #606266 !important;
  font-size: 14px !important ;
  font-weight: normal !important;
}
</style>