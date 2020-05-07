import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/pages/Index";
import App from "@/App";
import Profile from "@/pages/Profile";
import Collection from "@/components/profile/Collection";
import Test from "@/pages/Test";
import PublishHouse from "@/pages/house/PublishHouse";
import BuyHouse from "@/pages/house/BuyHouse";
import LayoutAnalysis from "@/pages/LayoutAnalysis";
import PriceAnalysis from "@/pages/PriceAnalysis";
import HouseInfo from "@/pages/house/HouseInfo";
import RecommendList from "@/pages/house/RecommendList";
import OnSaleNewHouseList from "@/pages/house/OnSaleNewHouseList";
import OnSaleUsedHouseList from "@/pages/house/OnSaleUsedHouseList";


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
            path: "/house/info/:id",
            component: HouseInfo
        },
        {
            path: "/house/buy",
            component: BuyHouse
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
            path:"/house/recommend/:type",
            component:RecommendList
        },
        {
            path:"/house/onSaleNew",
            component:OnSaleNewHouseList
        },
        {
            path:"/house/onSaleUsed",
            component:OnSaleUsedHouseList
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
        {
            path: "/house/houseAnalysis",
            component:()=>import("@/pages/HouseAnalysis")
        },
        {
            path: "/house/transactionAnalysis",
            component: ()=>import("@/pages/TransactionAnalysis")
        }

    ]
});
