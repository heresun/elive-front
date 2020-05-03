<template>
  <div id="container">
    <!--搜过框与导航栏-->
    <!--        <div id="bgImg"></div>-->
    <div id="row_head">
      <!-- 顶端导航-->
      <div class="wrapper">
        <el-row>
          <el-col :span="20" :offset="2">
            <div>
              <Header></Header>
            </div>
          </el-col>
        </el-row>
        <!--搜索框-->
        <el-row style="margin-top: 50px">
          <el-row>
            <div class="searchImg">
              <img src="../assets/searchImg.png" style="width: 28%" />
            </div>
          </el-row>

          <el-row style="display:flex;margin-bottom:5px">
            <div class="selectSearchNew">
              <el-button
                type="text"
                :class="{'selectSearch':true,'activeButton':searchTypeFlag}"
                style="margin-left:425px"
                @click="switchToSearchNewHouse"
              >找新房</el-button>
            </div>
            <div class="selectSearchUsed">
              <el-button
                type="text"
                :class="{'selectSearch':true,'activeButton':!searchTypeFlag}"
                @click="switchToSearchUsedHouse"
              >找二手房</el-button>
            </div>
          </el-row>

          <el-row>
            <div class="searchBox">
              <SearchBox
                but-text="开始找房"
                box-height="45px"
                box-width="500px"
                but-height="45px"
                but-width="150px"
                type="primary"
              ></SearchBox>
            </div>
          </el-row>
        </el-row>
      </div>
    </div>

    <!--        <div style="height: 20px"></div>-->
    <el-row class="rowContent" style="margin-top: 50px">
      <ExhibitionHouseCmp to-house-list-url="/house/recommend/1" desc="专属于您的精选好房" title="更多推荐"></ExhibitionHouseCmp>
    </el-row>

    <el-row class="rowContent" style="background-color: #eeeef1">
      <!-- <ExhibitionHouseCmp
        to-house-list-url="/house/onSaleNew"
        desc="新房新起点"
        title="更多在售新房"
        exhibition-url="/house/housePage.do"
        :type="0"
      ></ExhibitionHouseCmp>-->

      <ExhibitionHouseCmpNew
        to-house-list-url="/house/onSaleNew"
        desc="新房新起点"
        title="更多在售新房"
        :type="0"
      ></ExhibitionHouseCmpNew>
    </el-row>

    <el-row class="rowContent">
      <!-- <ExhibitionHouseCmp
        to-house-list-url="/house/onSaleUsed"
        desc="二手好房，为你而选"
        title="更多精品二手房"
        exhibition-url="/house/housePage.do"
        :type="1"
      ></ExhibitionHouseCmp>-->
      <ExhibitionHouseCmpUsed
        to-house-list-url="/house/onSaleUsed"
        desc="二手好房，为你而选"
        title="更多精品二手房"
        :type="1"
      ></ExhibitionHouseCmpUsed>
    </el-row>

    <el-row>
      <el-button type="primary" @click="$router.replace('/user/profile')">个人主页</el-button>
      <el-button type="primary" @click="$router.replace('/house/info')">房屋详情页</el-button>
      <el-button type="primary" @click="$router.replace('/test')">测试</el-button>
      <div>
        <SearchBox
          but-text
          box-height="45px"
          box-width="200px"
          but-height="45px"
          but-width="50px"
          type="text"
          but-color="white"
        ></SearchBox>
      </div>
    </el-row>

    <el-row>
      <Footer></Footer>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBox from "@/components/common/SearchBox";
import ExhibitionHouseCmp from "@/components/index/ExhibitionHouseCmp";
import ExhibitionHouseCmpNew from "@/components/index/ExhibitionHouseCmpNew";
import ExhibitionHouseCmpUsed from "@/components/index/ExhibitionHouseCmpUsed";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    SearchBox,
    ExhibitionHouseCmpNew,
    ExhibitionHouseCmpUsed,
    ExhibitionHouseCmp
  },
  data() {
    return {
      state: this.$store.state,
      input: "",
      searchTypeFlag: true
    };
  },
  methods: {
    switchToSearchNewHouse() {
      this.searchTypeFlag = true;
      this.$store.state.globalSearchType =0;
      console.log(this.$store.state.globalSearchType);
    },
     switchToSearchUsedHouse() {
      this.searchTypeFlag = false;
      this.$store.state.globalSearchType = 1;
      console.log(this.$store.state.globalSearchType);
    }
  },
  mounted(){
    this.$store.state.globalSearchType = 0;
  }
};
</script>

<style scoped>
#container {
  width: 1519px;
}

#row_head {
  background: black url("../assets/background.jpg") no-repeat;
  height: 610px;
  width: 100%;
  padding-top: 30px;
  /*position: absolute;*/
  background-attachment: fixed;
  /*background-position: center 0;*/
  display: block;
  position: relative;
}

.searchImg {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.searchBox {
  display: flex;
  justify-content: center;
  /*border-radius: 10px;*/
}

.rowContent {
  margin-top: 100px;
  padding: 50px 0px 50px 0px;
}

.activeButton {
  color: white !important;
}
.selectSearch {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: bold;
  margin-right: 20px;
}

.selectSearch:hover {
  color: white;
}
</style>
