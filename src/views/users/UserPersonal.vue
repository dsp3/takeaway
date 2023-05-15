<template>
<div class="userbox">
    <common-card>
        <!-- 标题 -->
        <template #title><span>个人中心</span></template>
        <!-- 内容 -->
        <template #content>
            <div class="cont">
                <span>用户id: {{ userInfo.id }}</span>
                <el-divider></el-divider>
                <span>账号: {{ userInfo.uname }}</span>
                <el-divider></el-divider>
                <span>身份: {{ userInfo.power }}</span>
                <el-divider></el-divider>
                <span>创建时间: {{ userInfo.ctime | dateTime }}</span>
                <el-divider></el-divider>
                <span class="imgbox">用户头像:
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-upload class="avatar-uploader" action="/api/users/tou" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <el-button type="primary" @click="updImg">修改头像</el-button>
                </span>
            </div>
            <el-dialog title="修改头像" :visible.sync="dialogVisible" width="90%" :before-close="handleClose">
                <cropper></cropper>
            </el-dialog>
        </template>
    </common-card>
</div>
</template>

<script>
import cropper from "@/components/cropper/vue-cropper";
import {
    personal_api,
    usertou_api
} from "@/api/user";
import commonCard from "@/components/commonCard";
export default {
    components: {
        commonCard,
        cropper,
    },
    data() {
        return {
            dialogVisible: false,
            userInfo: {},
            imageUrl: "", //显示
            imgUrl: "", //传值
        };
    },
    methods: {
        // 初始化
        async queryUserInfo() {
            let res = await personal_api();
            this.userInfo = res.data[0];
            let imgUrl = res.data[0].imgUrl;
            this.userInfo.imgUrl = imgUrl
                .substring(imgUrl.indexOf("3000"))
                .replace("3000", "/api");
            this.imageUrl = this.userInfo.imgUrl;
        },
        //图片选择成功之后触发的事件
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.imgUrl = res.imgUrl;
        },
        //图片选择之前触发的事件
        beforeAvatarUpload(file) {
            //格式和大小规定
            const isJPG = file.type === "image/jpeg " || "image/gif " || "image/png ";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        //上传图片
        async updImg() {
            if (this.imgUrl == "") {
              this.$router.push("/cropper")
              this.$message.error("请上传图片进行修改")
            } else {
                let res = await usertou_api({
                    imgUrl: this.imgUrl,
                });
                if (res.code == 0) {
                    this.$message.success(res.msg);
                    this.$router.go(0);
                } else {
                    this.$message.error("修改失败");
                }
            }
        },
        //确认是否关闭
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
    },
    created() {
        this.queryUserInfo();
    },
};
</script>

<style lang="less" scoped>
.imgbox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.cont {
    padding: 20px;
}

.avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.userbox {
    width: 98%;
}
</style>
