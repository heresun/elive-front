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
  requestUrl: "http://localhost:8080/elive"
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
