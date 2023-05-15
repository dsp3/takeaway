<template>
<div class="cut">
    <el-upload class="upload-demo" :on-change="changeUpload" action="/api/">
        <el-button size="small" type="primary">选择图片</el-button>
    </el-upload>
    <el-button type="success" size="small" @click="finish" :loading="loading">上传头像</el-button>

    <el-row style="margin: 10px 0 0 0">
        <el-button @click="rotateRight" type="primary" icon="el-icon-refresh-right" circle></el-button>
        <el-button @click="rotateLeft" type="success" icon="el-icon-refresh-left" circle></el-button>
        <el-button @click="scaleBigger" type="danger" icon="el-icon-plus" circle></el-button>
        <el-button @click="scaleSmaller" type="warning" icon="el-icon-minus" circle></el-button>
    </el-row>
    <div class="cropper">
        <!-- 显示裁剪后的图片 -->
            <img :src="fileImg" />

        <div class="cropper-content">
            <div class="cropper" style="text-align: center">
                <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :canScale="option.canScale" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox" :infoTrue="option.infoTrue" :full="option.full" :enlarge="option.enlarge" :mode="option.mode">
                </vueCropper>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {

    usertou_api
} from "@/api/user";
// 使用vue-cropper 图片上传组件
import {
    VueCropper
} from "vue-cropper";
export default {
    name: "Cropper",
    data() {
        return {
            msg: "Welcome to Your Vue.js App",
            fileImg: "",
            dialogVisible: false,
            // 裁剪组件的基础配置option
            option: {
                img: "", // 裁剪图片的地址
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: "jpeg", // 裁剪生成图片的格式
                info: true, // 裁剪框的大小信息
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: 320, // 默认生成截图框宽度
                autoCropHeight: 320, // 默认生成截图框高度
                fixedBox: false, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [1, 1], // 截图框的宽高比例
                canMove: false, // 上传图片是否可以移动
                canMoveBox: true, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: true, // 截图框是否被限制在图片里面
                infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                full: false, // 是否输出原图比例的截图
                enlarge: "5", // 图片根据截图框输出比例倍数
                mode: "contain", // 图片默认渲染方式
            },
            // 防止重复提交
            loading: false,
        };
    },
    components: {
        VueCropper,
    },
    methods: {
        // 上传按钮 限制图片大小
        changeUpload(file) {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
               this.fileImg= this.$message.error("上传文件大小不能超过 5MB!");
                return false;
            }
            // 上传成功后将图片地址赋值给裁剪框显示图片
            this.$nextTick(() => {
                this.option.img = URL.createObjectURL(file.raw);
                this.dialogVisible = true;
            });
        },
        // 点击裁剪，这一步是可以拿到处理后的地址
         finish() {
            // 获取截图的base64 数据
            this.myCropper.getCroppedCanvas({
				imageSmoothingQuality:'high'
			}).toDataURL('image/jpeg');
;
        },
        // 图片左旋转90°
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        // 图片右旋转90°
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        // 图片放大
        scaleBigger() {
            this.$refs.cropper.changeScale(1);
        },
        // 图片缩小
        scaleSmaller() {
            this.$refs.cropper.changeScale(-1);
        },
    },
};
</script>

<style lang="less" scoped>
.cut {
    width: 100%;

    .cropper {
        width: 260px;
        height: 260px;
        margin: 0 auto;
        display: flex;
justify-content: space-around;
    }

    .file-image {
        width: 32px;
        height: 32px;
        font-size: 14px;
        margin: 15px 0;
    }
    .el-row button {
        margin-left: 10px;
    }
}
</style>
