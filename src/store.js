import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);
// const state = {
//   num: 0
// }
const state = {
  // 全局登录状态
  globalIsLogin:false,
  // 登录框是否显示
  globalLoginDialogVisible:false,
  // 注册框是否显示
  globalSignDialogVisible:false,

  // 页头状态控制
  globalHeaderNotState:"",
  globalHeaderYesState:"none",
  // 全局用户名
  globalAccount:"",
  // 全局用户id
  globalUserId:null,
  // 用户收藏的房屋id列表
  globalCollections:[],
  //接口的请求基地址
  requestUrl: "http://localhost:8080/elive",

  // 城市 id,用于搜索框
  globalCityId:0,
  globalCityName:"",

  // 用于全局的地址搜索
  globalAddress:"",
  // 搜索类型，0 为 新房， 1 为二手房
  globalSearchType:0,

  // 用于保存主页的展示的数据
  newHouseIndex:[],
  usedHouseIndex:[],

  // 这四个个数组用来保存在售房屋数据，分别为新房和二手房
  houseList:[], // 默认排序
  houseListNewest:[], // 最新发布
  houseListByPrice:[], // 按价格升序
  houseListByArea:[] // 按面积升序


  // newHouseList:[],
  // usedHouseList:[],
  // newHouseListNewest:[],
  // usedHouseListNewest:[],

  // houseListByPrice





};

const actions = {

};

const mutations = {

};

const getters={

};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
});
