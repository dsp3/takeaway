<template>
  <div class="userbox">
    <comm-card>
      <!-- title 标题  v-bind  :  v-on @  v-slot # -->
      <template #title>
        <span>商品添加</span>
      </template>
      <!-- content 正文-->
      <template #content>
        <div>
          <el-form
            :model="goodsObj"
            ref="form"
            label-width="80px"
            :inline="false"
            size="normal"
          >
            <el-form-item label="商品名称">
              <el-input v-model="goodsObj.name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-select v-model="goodsObj.category">
                <el-option
                  v-for="(item, index) in categories"
                  :key="index"
                  :label="item.gname"
                  :value="item.gname"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input-number
                v-model="goodsObj.price"
                :precision="2"
                :step="0.5"
                :min="0.0"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="商品图片">
              <el-upload
                class="avatar-uploader"
                action="/api/goods/gphoto"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品描述">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入商品描述"
                v-model="goodsObj.gdesc"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addGoods">商品添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </comm-card>
  </div>
</template>
<!-- goodstype -->
<script>
import { goodsadd_api, goodsType_api } from "@/api/goods";
// 第一步 引入
import commCard from "../../components/commonCard";
// 第二步 注册到我们的components中
export default {
  data() {
    return {
      goodsObj: {
        name: "", //商品名称
        category: "", //商品分类
        price: 0.0, //商品价格
        imgUrl: "", //商品图片
        gdesc: "", //商品描述
      },
      categories: [],
      imageUrl: "", //存储上传图片的名称
    };
  },
  components: {
    commCard,
  },
  created() {
    this.queryCateName();
  },
  methods: {
    // 上传成功之后
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.goodsObj.imgUrl = res.imgUrl;
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 后台数据
    async queryCateName() {
      let res = await goodsType_api();
      this.categories = res.data;
    },
    // 添加商品
    async addGoods() {
      let res = await goodsadd_api(this.goodsObj);
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.goodsObj = {
          name: "",
          category: "",
          price: 0.0,
          imgUrl: "",
          gdesc: "",
        };
        this.imageUrl = "";
      } else {
        this.$message.error("商品添加失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
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

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
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
