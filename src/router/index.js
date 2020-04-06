import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/pages/Index";
import ManaIndex from "@/pages/manage/Index"
import App from "@/App";
import Profile from "@/pages/Profile";
import Collection from "@/components/Collection";
import Test from "@/pages/Test";
import PublishHouse from "@/pages/PublishHouse";
import BuyHouse from "@/pages/BuyHouse";
import RentHouse from "@/pages/RentHouse";
import LayoutAnalysis from "@/pages/LayoutAnalysis";
import PriceAnalysis from "@/pages/PriceAnalysis";
import HouseInfo from "@/pages/HouseInfo";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        // 房屋模块路由信息
        {
            path: "/house/info/:id/:cId",
            component: HouseInfo
        },
        {
            path: "/house/buy",
            component: BuyHouse
        },
        {
            path: "/house/rent",
            component: RentHouse
        },
        {
            path: "/house/analysis/layout",
            component: LayoutAnalysis
        },
        {
            path: "/house/analysis/price",
            component: PriceAnalysis
        },
        {
            path: "/house/publish",
            component: PublishHouse
        },

        {
            path: "/test",
            component: Test
        },
        //  用户模块路由信息
        {
            path: "/user/collect",
            component: Collection
        },
        {
            path: "/user/profile",
            component: Profile
        },
        {
            path: "/index",
            component: Index
        },
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: "/",
            component: App
        },

        //  后台管理模块的路由信息
        {
            path: "/management/index",
            component: ManaIndex
        }
    ]
});
