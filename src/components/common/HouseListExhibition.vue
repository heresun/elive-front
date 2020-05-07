<template>
  <div>
    <!-- 这里是条件筛选部分-->
    <div id="container">
      <!--地区过滤-->
      <el-row>
        <el-col :span="1" class="lineHead">
          <div style="margin-top: 4px;">位置:</div>
        </el-col>
        <!-- <el-col :span="5">
                    <el-select v-model="provinceId" placeholder="请选择" size="mini" @change="getCity">
                        <el-option
                                v-for="item in provinces"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    省
                </el-col>

                <el-col :span="5">
                    <el-select v-model="cityId" placeholder="请选择" size="mini" @change="getArea">
                        <el-option
                                v-for="item in cities"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    市
        </el-col>-->

        <el-col :span="7">
          <el-select v-model="areaId" placeholder="请选择" size="mini">
            <el-option v-for="item in areas" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>区/县
        </el-col>
      </el-row>
      <!--价格过滤-->
      <el-row>
        <el-col :span="1" class="lineHead">
          <div style="margin-top: 4px;">价格:</div>
        </el-col>
        <el-col :span="23" style="margin-top: 2px">
          <el-checkbox v-model="priceC1">
            <span style="font-size: 12px">60万以下</span>
          </el-checkbox>
          <el-checkbox v-model="priceC2">
            <span style="font-size: 12px">60~90万</span>
          </el-checkbox>
          <el-checkbox v-model="priceC3">
            <span style="font-size: 12px">90~120万</span>
          </el-checkbox>
          <el-checkbox v-model="priceC4">
            <span style="font-size: 12px">120~160万</span>
          </el-checkbox>
          <el-checkbox v-model="priceC5">
            <span style="font-size: 12px">160~200万</span>
          </el-checkbox>
          <el-checkbox v-model="priceC6">
            <span style="font-size: 12px">200~250万</span>
          </el-checkbox>
          <el-checkbox v-model="priceC7">
            <span style="font-size: 12px">250~300万</span>
          </el-checkbox>
          <el-checkbox v-model="priceC8">
            <span style="font-size: 12px">300万以上</span>
          </el-checkbox>
        </el-col>
      </el-row>
      <!--面积过滤-->
      <el-row>
        <el-col :span="1" class="lineHead">
          <div style="margin-top: 7px;">面积:</div>
        </el-col>
        <el-col :span="23" style="margin-top: 2px">
          <el-checkbox v-model="squareC1">
            <span style="font-size: 12px">
              60 m
              <sup>2</sup>以下
            </span>
          </el-checkbox>
          <el-checkbox v-model="squareC2">
            <span style="font-size: 12px">
              60~100 m
              <sup>2</sup>
            </span>
          </el-checkbox>
          <el-checkbox v-model="squareC3">
            <span style="font-size: 12px">
              100~130 m
              <sup>2</sup>
            </span>
          </el-checkbox>
          <el-checkbox v-model="squareC4">
            <span style="font-size: 12px">
              130~160 m
              <sup>2</sup>
            </span>
          </el-checkbox>
          <el-checkbox v-model="squareC5">
            <span style="font-size: 12px">
              160~180 m
              <sup>2</sup>
            </span>
          </el-checkbox>
          <el-checkbox v-model="squareC6">
            <span style="font-size: 12px">
              180~200 m
              <sup>2</sup>
            </span>
          </el-checkbox>
          <el-checkbox v-model="squareC7">
            <span style="font-size: 12px">
              200 m
              <sup>2</sup>以上
            </span>
          </el-checkbox>
        </el-col>
      </el-row>
      <!--楼层过滤-->
      <el-row>
        <el-col :span="1" class="lineHead">
          <div style="margin-top: 7px;">楼层:</div>
        </el-col>
        <el-col :span="23" style="margin-top: 2px">
          <el-checkbox v-model="levelC1">
            <span style="font-size: 12px">低楼层(8楼以下)</span>
          </el-checkbox>
          <el-checkbox v-model="levelC2">
            <span style="font-size: 12px">中楼层(8~20楼)</span>
          </el-checkbox>
          <el-checkbox v-model="levelC3">
            <span style="font-size: 12px">高楼层(20楼以上)</span>
          </el-checkbox>
        </el-col>
      </el-row>
      <!--朝向过滤-->
      <el-row>
        <el-col :span="1" class="lineHead">
          <div style="margin-top: 7px;">朝向:</div>
        </el-col>
        <el-col :span="23" style="margin-top: 5px">
          <el-checkbox v-model="orienC1">
            <span style="font-size: 12px">朝东</span>
          </el-checkbox>
          <el-checkbox v-model="orienC2">
            <span style="font-size: 12px">朝南</span>
          </el-checkbox>
          <el-checkbox v-model="orienC3">
            <span style="font-size: 12px">朝西</span>
          </el-checkbox>
          <el-checkbox v-model="orienC4">
            <span style="font-size: 12px">朝北</span>
          </el-checkbox>
        </el-col>
      </el-row>

      <!--供暖过滤-->
      <el-row>
        <el-col :span="1" class="lineHead">
          <div style="margin-top: 7px;">供暖:</div>
        </el-col>
        <el-col :span="23" style="margin-top: 5px">
          <el-radio v-model="heatingType" label="1">
            <span style="font-size: 12px">集中供暖</span>
          </el-radio>
          <el-radio v-model="heatingType" label="2">
            <span style="font-size: 12px">自供暖</span>
          </el-radio>
        </el-col>
      </el-row>

      <!--车位过滤-->
      <el-row>
        <el-col :span="1" class="lineHead">
          <div style="margin-top: 7px;">车位:</div>
        </el-col>
        <el-col :span="23" style="margin-top: 5px">
          <el-radio v-model="parkLot" label="1">
            <span style="font-size: 12px">无</span>
          </el-radio>
          <el-radio v-model="parkLot" label="2">
            <span style="font-size: 12px">有</span>
          </el-radio>
        </el-col>
      </el-row>
    </div>
    <!-- 这里是列表展示部分-->
    <div style="margin-top: 50px">
      <span style="font-size:18px;font-weight: bold">
        已为您找到
        <span style="color: #39ac6a">{{total > 0 ? total:0}}</span>
        套{{$store.state.globalCityName}}{{typeString}}
      </span>
    </div>
    <div>
      <el-tabs :tab-position="top">
        <el-tab-pane label="默认排序">
          <ul class="houseList">
            <li v-for="item in $store.state.houseList" :key="item">
              <ListRownCmp :house="item"></ListRownCmp>
              <el-divider></el-divider>
            </li>
          </ul>

          <div>
            <el-divider></el-divider>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="getPage(0)"
              :page-count="10"
              :current-page.sync="curPage_1"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最新发布">
          <ul class="houseList">
            <li v-for="item in $store.state.houseListNewest" :key="item">
              <ListRownCmp :house="item"></ListRownCmp>
              <el-divider></el-divider>
            </li>
          </ul>

          <div>
            <el-divider></el-divider>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="getPage(1)"
              :page-count="10"
              :current-page.sync="curPage_2"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="按价格升序">
          <ul class="houseList">
            <li v-for="item in $store.state.houseListByPrice" :key="item">
              <ListRownCmp :house="item"></ListRownCmp>
              <el-divider></el-divider>
            </li>
          </ul>

          <div>
            <el-divider></el-divider>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="getPage(2)"
              :page-count="10"
              :current-page.sync="curPage_3"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="按面积升序">
          <ul class="houseList">
            <li v-for="item in $store.state.houseListByArea" :key="item">
              <ListRownCmp :house="item"></ListRownCmp>
              <el-divider></el-divider>
            </li>
          </ul>

          <div>
            <el-divider></el-divider>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="getPage(3)"
              :page-count="10"
              :current-page.sync="curPage_4"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ListRownCmp from "@/components/common/ListRownCmp";
import Bus from "@/api/Bus";
// import qs from "qs";

export default {
  name: "HouseListExhibition",
  components: {
    ListRownCmp
  },
  data() {
    return {
      typeString: "",

      // 参数名
      paramName: "filterParams",
      // 四个顶端滑框对应的页
      curPage_1: 1,
      curPage_2: 1,
      curPage_3: 1,
      curPage_4: 1,
      // 每次筛选的
      total: 0,

      houseList: [],
      houseListNewest: [],
      houseListByPrice: [],
      houseListByArea: [],

      provinceId: null,
      cityId: null,
      areaId: null,

      provinces: [],
      cities: [],
      areas: [],
      test: "",
      // 价格复选框
      priceC1: false,
      priceC2: false,
      priceC3: false,
      priceC4: false,
      priceC5: false,
      priceC6: false,
      priceC7: false,
      priceC8: false,
      //面积复选框
      squareC1: false,
      squareC2: false,
      squareC3: false,
      squareC4: false,
      squareC5: false,
      squareC6: false,
      squareC7: false,
      //楼层复选框
      levelC1: false,
      levelC2: false,
      levelC3: false,
      // 朝向复选框
      orienC1: false,
      orienC2: false,
      orienC3: false,
      orienC4: false,
      //供暖单选框
      heatingType: false,
      //ting车位单选框
      parkLot: false,
      //地址参数
      address: "",

      params: {},

      // 表单对象
      form: new FormData()
    };
  },
  props: {
    url: String,
    type: Number,
    typeStr: String
  },
  methods: {
    addParamsToBus() {
      Bus.$emit("params", this.params);
    },
    getPage(flag) {
      if (flag == 0) {
        this.params.page = this.curPage_1;
        let form = new FormData();
        form.append(this.paramName, JSON.stringify(this.params));
        this.getNewPage(form);
      } else if (flag == 1) {
        this.params.page = this.curPage_2;
        let form = new FormData();
        form.append(this.paramName, JSON.stringify(this.params));
        this.getNewPageNewest(form);
      } else if (flag == 2) {
        this.params.page = this.curPage_3;
        let form = new FormData();
        form.append(this.paramName, JSON.stringify(this.params));
        this.getNewPageByPriceAesc(form);
      } else if (flag == 3) {
        this.params.page = this.curPage_4;
        let form = new FormData();
        form.append(this.paramName, JSON.stringify(this.params));
        this.getNewPageByAreaAesc(form);
      }
    },
    getNewPage(form) {
      this.form = form;
      this.$axios
        .post(this.url, form)
        .then(res => {
          this.$store.state.houseList = res.data.housePage;
          this.total = res.data.houseCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNewPageNewest(form) {
      this.form = form;

      let objStr = form.get(this.paramName);
      let params = JSON.parse(objStr);
      params.flag = 1;
      let innerForm = new FormData();
      innerForm.append(this.paramName, JSON.stringify(params));

      this.$axios
        .post(this.url, innerForm)
        .then(res => {
          this.$store.state.houseListNewest = res.data.housePage;
          this.total = res.data.houseCount;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getNewPageByPriceAesc(form) {
      this.form = form;
      let objStr = form.get(this.paramName);
      let params = JSON.parse(objStr);
      params.flag = 2;
      let innerForm = new FormData();
      innerForm.append(this.paramName, JSON.stringify(params));

      this.$axios
        .post(this.url, innerForm)
        .then(res => {
          this.$store.state.houseListByPrice = res.data.housePage;
          this.total = res.data.houseCount;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getNewPageByAreaAesc(form) {
      this.form = form;
      let objStr = form.get(this.paramName);
      let params = JSON.parse(objStr);
      params.flag = 3;
      let innerForm = new FormData();
      innerForm.append(this.paramName, JSON.stringify(params));

      this.$axios
        .post(this.url, innerForm)
        .then(res => {
          this.$store.state.houseListByArea = res.data.housePage;
          this.total = res.data.houseCount;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // testVal() {

    //     this.curPage_1 = 1;
    // },

    // getCity() {
    //     this.$axios("/district/location.do?pId=" + this.provinceId).then(res => {
    //         this.cities = res.data;
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // },

    getArea() {
      this.$axios("/district/location.do?pId=" + this.cityId)
        .then(res => {
          this.areas = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    // 每次刷新从后台获取城市数据，并刷新主页的房屋信息列表
    this.$axios
      .post("/util/globalCity.do")
      .then(res => {
        if (res.data != "err") {
          this.$store.state.globalCityId = res.data.cityId;
          this.$store.state.globalCityName = res.data.cityName;

          (this.typeString = this.typeStr), (this.params.page = 1);
          this.params.count = 10;
          this.params.type = this.type;
          this.params.address = this.$store.state.globalAddress;

          this.params.cityId = this.$store.state.globalCityId;
          // 创建表单对象
          let form = new FormData();
          this.form = form;
          // 往表单里放参数
          form.append(this.paramName, JSON.stringify(this.params));

          this.getNewPage(form);
          this.getNewPageNewest(form);
          this.getNewPageByPriceAesc(form);
          this.getNewPageByAreaAesc(form);

          // 获取城市区/县数据
          this.$axios(
            "/district/location.do?pId=" + this.$store.state.globalCityId
          )
            .then(res => {
              this.areas = res.data;
            })
            .catch(err => {
              console.log(err);
            });

          this.addParamsToBus();
        } else {
          this.$store.state.globalCityId = 149;
          this.$store.state.globalCityName = "郑州";

          (this.typeString = this.typeStr), (this.params.page = 1);
          this.params.count = 10;
          this.params.type = this.type;
          this.params.address = this.$store.state.globalAddress;

          this.params.cityId = this.$store.state.globalCityId;
          // 创建表单对象
          let form = new FormData();
          this.form = form;
          // 往表单里放参数
          form.append(this.paramName, JSON.stringify(this.params));

          this.getNewPage(form);
          this.getNewPageNewest(form);
          this.getNewPageByPriceAesc(form);
          this.getNewPageByAreaAesc(form);

          // 获取城市区/县数据
          this.$axios(
                  "/district/location.do?pId=" + this.$store.state.globalCityId
          )
                  .then(res => {
                    this.areas = res.data;
                  })
                  .catch(err => {
                    console.log(err);
                  });

          this.addParamsToBus();


          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  watch: {
    // provinceId() {
    //     this.params.provinceId = this.provinceId;
    //     let form = new FormData();
    //     form.append("filterParams",JSON.stringify(this.params));

    //     this.getNewPage(form);
    //     this.getNewPageNewest(form);
    //     this.getNewPageByPriceAesc(form);
    //     this.getNewPageByAreaAesc(form);
    // },
    // cityId() {
    //     this.params.cityId = this.cityId;
    //     let form = new FormData();
    //     form.append("filterParams",JSON.stringify(this.params));

    //     this.getNewPage(form);
    //     this.getNewPageNewest(form);
    //     this.getNewPageByPriceAesc(form);
    //     this.getNewPageByAreaAesc(form);
    // },
    areaId() {
      this.params.areaId = this.areaId;
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    priceC1() {
      if (this.priceC1) {
        this.params.price_1 = [0, 60];
      } else {
        if ("price_1" in this.params) {
          delete this.params.price_1;
        }
      }

      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    priceC2() {
      if (this.priceC2) {
        this.params.price_2 = [60, 90];
      } else {
        if ("price_2" in this.params) {
          delete this.params.price_2;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);
      this.addParamsToBus();
    },
    priceC3() {
      if (this.priceC3) {
        this.params.price_3 = [90, 120];
      } else {
        if ("price_3" in this.params) {
          delete this.params.price_3;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    priceC4() {
      if (this.priceC4) {
        this.params.price_4 = [120, 160];
      } else {
        if ("price_4" in this.params) {
          delete this.params.price_4;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    priceC5() {
      if (this.priceC5) {
        this.params.price_5 = [160, 200];
      } else {
        if ("price_5" in this.params) {
          delete this.params.price_5;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    priceC6() {
      if (this.priceC6) {
        this.params.price_6 = [200, 250];
      } else {
        if ("price_6" in this.params) {
          delete this.params.price_6;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    priceC7() {
      if (this.priceC7) {
        this.params.price_7 = [250, 300];
      } else {
        if ("price_7" in this.params) {
          delete this.params.price_7;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    priceC8() {
      if (this.priceC8) {
        this.params.price_8 = [300, 100000];
      } else {
        if ("price_8" in this.params) {
          delete this.params.price_8;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    squareC1() {
      if (this.squareC1) {
        this.params.square_1 = [0, 60];
      } else {
        if ("square_1" in this.params) {
          delete this.params.square_1;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    squareC2() {
      if (this.squareC2) {
        this.params.square_2 = [60, 100];
      } else {
        if ("square_2" in this.params) {
          delete this.params.square_2;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    squareC3() {
      if (this.squareC3) {
        this.params.square_3 = [100, 130];
      } else {
        if ("square_3" in this.params) {
          delete this.params.square_3;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    squareC4() {
      if (this.squareC4) {
        this.params.square_4 = [130, 160];
      } else {
        if ("square_4" in this.params) {
          delete this.params.square_4;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    squareC5() {
      if (this.squareC5) {
        this.params.square_5 = [160, 180];
      } else {
        if ("square_5" in this.params) {
          delete this.params.square_5;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    squareC6() {
      if (this.squareC6) {
        this.params.square_6 = [180, 200];
      } else {
        if ("square_6" in this.params) {
          delete this.params.square_6;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    squareC7() {
      if (this.squareC7) {
        this.params.square_7 = [200, 100000];
      } else {
        if ("square_7" in this.params) {
          delete this.params.square_7;
        }
      }
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    levelC1() {
      // 低楼层
      if (this.levelC1) {
        this.params.level_1 = [1, 8];
      } else {
        if ("level_1" in this.params) {
          delete this.params.level_1;
        }
      }

      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    levelC2() {
      // 中楼层
      if (this.levelC2) {
        this.params.level_2 = [8, 20];
      } else {
        if ("level_2" in this.params) {
          delete this.params.level_2;
        }
      }

      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);
      this.addParamsToBus();
    },
    levelC3() {
      // 高楼层
      if (this.levelC3) {
        this.params.level_3 = [20, 1000];
      } else {
        if ("level_3" in this.params) {
          delete this.params.level_3;
        }
      }

      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    orienC1() {
      //东
      if (this.orienC1) {
        this.params.orien_1 = 1;
      } else {
        if ("orien_1" in this.params) {
          delete this.params.orien_1;
        }
      }

      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));
      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    orienC2() {
      //南
      if (this.orienC2) {
        this.params.orien_2 = 2;
      } else {
        if ("orien_2" in this.params) {
          delete this.params.orien_2;
        }
      }

      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    orienC3() {
      //西
      if (this.orienC3) {
        this.params.orien_3 = 3;
      } else {
        if ("orien_3" in this.params) {
          delete this.params.orien_3;
        }
      }

      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    orienC4() {
      //北
      if (this.orienC4) {
        this.params.orien_4 = 4;
      } else {
        if ("orien_4" in this.params) {
          delete this.params.orien_4;
        }
      }

      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },

    parkLot() {
      this.params.parkLot = this.parkLot - 1;
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    },
    heatingType() {
      this.params.heatingType = this.heatingType;
      let form = new FormData();
      form.append("filterParams", JSON.stringify(this.params));

      this.getNewPage(form);
      this.getNewPageNewest(form);
      this.getNewPageByPriceAesc(form);
      this.getNewPageByAreaAesc(form);

      this.addParamsToBus();
    }
  }
};
</script>

<style scoped>
.houseList li {
  list-style: none;
  margin-top: 30px;
}

#container {
  margin-top: 50px;
  font-size: 12px;
}

.lineHead {
  font-weight: bold;
}
</style>