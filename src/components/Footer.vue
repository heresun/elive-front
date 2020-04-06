<template>

    <div id="container">
        <el-row class="bottomLink">
            <el-col :span="14" :offset="3">
                <ul>
                    <li><a>关于易居</a></li>
                    <li><a>联系我们</a></li>
                    <li><a>加入我们</a></li>
                    <li><a>隐私声明</a></li>
                    <li><a>网站地图</a></li>
                    <li><a>友情链接</a></li>
                </ul>
            </el-col>
            <el-col :span="4" class="bottomLink">
                <div style="padding-left: 82.1px">客服电话:17725344281</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="18" :offset="3">

                <el-divider></el-divider>
            </el-col>
        </el-row>
        <el-row class="bottomContent">
            <el-col :span="18" :offset="3">
                易居网（天津）科技有限公司 | 网络经营许可证 京ICP备1611650716号-308 | © Copyright©2010-2020 易居网elive.com版权所有 | 营业执照
                违法和不良信息举报电话：010-8835196 违法和不良信息举报邮箱：dehui_sun@qq.com
                <div>
                    <img src="../assets/beian.png" style="float: left">
                    <p style="float: left;height: 20px;line-height: 20px;margin: 0px 0px 0px 5px;">京公网安备 41142119960325号</p>
                </div>
            </el-col>

        </el-row>

    </div>

</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    #container {
        margin: 0px;
        padding: 0px;
    }

    ul {
        padding: 0px;
    }

    ul > li {
        float: left;
        margin-right: 10px;
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    .bottomLink {
        margin: 0px auto;
        padding-top: 10px;
    }

    .bottomContent {
        margin-bottom: 50px;
        color: #888c8e;
        font-size: 12px;
        line-height: 20px;
    }
</style>