<template>
<div id="shop">
    <common-card>
        <template #title>
            <p>
                店铺管理
                <el-button type="primary" style="float: right" @click="upd">保存</el-button>
            </p>
        </template>
        <template #content>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="店铺名称">
                    <el-input v-model="form.name" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="店铺公告">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.bulletin" style="width: 500px">
                    </el-input>
                </el-form-item>
                <el-form-item label="店铺头像">
                    <!-- 这里是单个头像上传 -->
                    <el-upload class="avatar-uploader" action="/api/shop/sphoto" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="店铺图片">
                    <!-- 多个图片上传 -->
                    <el-upload action="/api/shop/sphoto" :file-list="imgList" list-type="picture-card" :on-success="manyImg" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                </el-form-item>
                <el-form-item label="配送费">
                    <el-input v-model="form.deliveryPrice" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="配送时间">
                    <el-input v-model="form.deliveryTime" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="配送描述">
                    <el-input v-model="form.description" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="店铺评分">
                    <el-input v-model="form.score" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="销量">
                    <el-input v-model="form.sellCount" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="活动">
                    <el-checkbox-group v-model="form.supports">
                        <el-checkbox label="在线支付满28减5" value="在线支付满28减5"></el-checkbox>
                        <el-checkbox label="特饮品8折抢购" value="特饮品8折抢购"></el-checkbox>
                        <el-checkbox label="单人精彩套餐" value="单人精彩套餐"></el-checkbox>
                        <el-checkbox label="VC无限橙果汁全场8折" value="VC无限橙果汁全场8折"></el-checkbox>
                        <el-checkbox label="特色套餐" value="特色套餐"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <!-- <el-date-picker v-model="form.date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker> -->
            </el-form>
        </template>
    </common-card>
</div>
</template>

<script>
import {
    info_api,
    supd_api
} from "@/api/shop";

import commonCard from "@/components/commonCard";

export default {
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            form: {
                id: "",
                name: "",
                bulletin: "", //公告
                avatar: "", //头像
                deliveryPrice: "", //配送费
                deliveryTime: "", //配送时间
                score: "", //评分
                sellCount: "", //销量
                supports: [], //活动
                description: "", //配送方式
                // date: '', //时间
            },
            dialogImageUrl: "", //回显
            dialogVisible: false,
            disabled: false,
            imgList: [], //做多个图片回显用
            imageUrl: ""
        };
    },
    components: {
        commonCard,
    },
    methods: {
        //初始化
        async shop() {
            let res = await info_api();
            this.form = res.data;
            this.form.supports = JSON.parse(res.data.supports) //活动渲染
            // this.form.date = res.data.date;
            //单个图片
            this.imageUrl = res.data.avatar;
            this.form.avatar = res.data.avatar;
            //多个图片
            let pics = JSON.parse(res.data.pics);
            this.imgList = pics.map((ele) => {
                let obj = {
                    name: ele,
                    url: "/api/shopImg/" + ele,
                };
                return obj;
            });
            console.log(this.imgList);
            // this.form.date = this.form.date.split(",");
        },
        //上传之前
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg" || "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        // 上传图片规则
        handleAvatarSuccess(res, file) {
            //res对象有code和imgUrl 图片地址
            this.imageUrl = URL.createObjectURL(file.raw);
            // this.shopObj.avatar = res.imgUrl; //将上传成功之后的图片被存入到异步请求的变量中
            this.form.avatar = res.imgUrl; //将上传成功之后的图片被存入到异步请求的变量中

        },
        //将添加图片追加到多个图片的变量中 imgList
        manyImg(res, file) {
            this.imgList.push({
                name: res.imgUrl,
                url: "/api/shop/sphoto/" + res.imgUrl,
            });
        },
        //多图片上传
        //删除时触发
        handleRemove(file, fileList) {
            // fileList是最后的图片
            this.imgList = fileList.map((ele) => {
                return {
                    name: ele.name,
                    url: ele.url,
                };
            });
        },
        //点击放大镜 大图显示
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //将添加图片追加到多个图片的变量中 imgList
        manyImg(res, file) {
            this.imgList.push({
                name: res.imgUrl,
                url: "/api/shopImg/" + res.imgUrl
            })
        },
        // 修改提交
        async upd() {
            this.form.supports = JSON.stringify(this.form.supports)
            this.form.pics=JSON.stringify(this.imgList.map(ele=>{
                return ele.name
            }))
            let {
                code,
                msg
            } = await supd_api(this.form);
            if (code == 200) {
                this.$message.success(msg);
                this.shop();
            } else {
                this.$message.error("保存成功");
            }
        },
    },
    mounted() {
        this.shop();
    },
};
</script>

<style lang="less" scoped>
#shop {
    overflow: auto;
    width: 98%;
    padding-bottom: 20px;

    &::-webkit-scrollbar {
        width: 10px
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #aaa;
    }

    &::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 10px;
    }

}

.el-image {
    margin: 10px;
    width: 100px;
    height: 100px;
    cursor: pointer;
    user-select: none;
}

p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    font-size: 20px;
}

.el-form {
    padding: 20px 0 50px 20px;
}

.avatar {
    width: 200px;
    height: 200px;
}
</style>
