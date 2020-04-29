import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import Croppa from "vue-croppa"
import "vue-croppa/dist/vue-croppa.css"

import router from './router'
import store from "@/store";


Vue.use(ElementUI);
Vue.use(Croppa);

Vue.config.productionTip = false;



//将根Api挂载到axios的请求基地址
axios.defaults.baseURL = "http://localhost:8080/elive";
// 将其设置为false意为不携带cookie，因为携带cookie就无法通过CROS检测，
// 在CORS中，Credential不接受http响应首部中的‘Access-Control-Allow-Origin’设置为通配符‘*’
axios.defaults.withCredentials = true
//设置默认的响应处理，如果没有这个，无论请求失败成功，都被catch捕获
var myInterceptor = axios.interceptors.request.use(function () {/*...*/
});

axios.interceptors.request.eject(myInterceptor);

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做了坑爹的数据处理
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

Vue.prototype.$axios = axios;


new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
