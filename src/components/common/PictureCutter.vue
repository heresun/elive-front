<template>
    <div>
        <el-dialog title="图片裁剪" :visible.sync="croppaVisible" width="640px" :before-close="handleClose">
            <div class="croppa_box">
                <croppa v-model="croppa" :show-remove-button="false" :width="360" :height="360"
                        :prevent-white-space="true" initial-size="natural"
                        initial-position="center"
                        :initial-image="'http://t00img.yangkeduo.com/goods/images/2018-07-19/15a2e96caa3851da064e464cf60eea3a.jpeg'">
                </croppa>
                <div class="croppa_btns_box">
                    <div class="croppa_btns_box_top">
                        <el-tooltip class="item" effect="dark" content="上移" placement="top">
                            <el-button type="primary" circle @click="croppa.moveUpwards(10)"
                                       icon="el-icon-arrow-up"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="下移" placement="top">
                            <el-button type="primary" circle @click="croppa.moveDownwards(10)"
                                       icon="el-icon-arrow-down"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="左移" placement="top">
                            <el-button type="primary" circle @click="croppa.moveLeftwards(10)"
                                       icon="el-icon-arrow-left"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="右移" placement="top">
                            <el-button type="primary" circle @click="croppa.moveRightwards(10)"
                                       icon="el-icon-arrow-right"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="放大" placement="top">
                            <el-button type="primary" circle @click="croppa.zoomIn(10)"
                                       icon="el-icon-zoom-in"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="缩小" placement="top">
                            <el-button type="primary" circle @click="croppa.zoomOut(10)"
                                       icon="el-icon-zoom-out"></el-button>
                        </el-tooltip>
                    </div>
                    <div class="croppa_btns_box_bottom">
                        <el-button type="primary" round @click="croppa.rotate()">旋转90°</el-button>
                        <el-button type="primary" round @click="croppa.rotate(2)">旋转180°</el-button>
                        <el-button type="primary" round @click="croppa.rotate(-1)">旋转-90°</el-button>
                        <el-button type="primary" round @click="croppa.flipX()">水平翻转</el-button>
                        <el-button type="primary" round @click="croppa.flipY()">垂直翻转</el-button>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="croppaVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadCroppedImage">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PictureCutter"
    }
</script>

<style scoped>

</style>