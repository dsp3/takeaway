<template>
<div class="goodsList">
    <common-card>
        <template #title>
            <div class="box">
                <span>商品列表</span>
                <div class="title">
                    <el-form ref="form" label-width="80px" v-model="likeObj" :inline="true" size="small">
                        <el-form-item label="商品名称">
                            <el-input v-model="likeObj.gname" placeholder="请输入商品名称" style="width: 200px; margin-right: 20px"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <!-- filterable可搜索 clearable是否可以清空选项 -->
                            <el-select placeholder="请选择商品分类" v-model="likeObj.category" style="width: 150px; margin-right: 20px">
                                <el-option :label="item.gname" :value="item.gname" v-for="(item, index) in cateName" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="likebtn">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </template>
        <template #content>
            <el-table v-loading="loading" :data="tableData" style="width: 99%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品ID:">
                                <span>{{ props.row.goodsID }}</span>
                            </el-form-item>
                            <el-form-item label="所属分类:">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="商品图片:">
                                <span>
                                    <el-avatar shape="square" :src="'/api/goodsImg/' + props.row.imgUrl"></el-avatar>
                                </span>
                            </el-form-item>
                            <el-form-item label="商品评价:">
                                <span @click="jia(props.row.rating)" style="cursor: pointer;">{{ props.row.rating }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述:">
                                <p class="aa" @click="refer" style="">{{ props.row.gdesc }}</p>
                            </el-form-item>
                            <el-form-item label="商品名称:">
                                <span>{{ props.row.gname }}</span>
                            </el-form-item>
                            <el-form-item label="商品价格:">
                                <span>{{ props.row.price }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间:">
                                <span>{{ props.row.ctime | dateTime }}</span>
                            </el-form-item>
                            <el-form-item label="商品销量:">
                                <span>{{ props.row.sellcount }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" prop="gname"></el-table-column>
                <el-table-column label="所属分类" prop="category"> </el-table-column>
                <el-table-column label="商品价格" prop="price"> </el-table-column>
                <el-table-column label="商品图片" prop="picture">
                    <template #default="{ row }">
                        <el-avatar shape="square" :src="'/api/goodsImg/' + row.imgUrl"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column label="商品描述" prop="gdesc"> </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="primary" @click="upd(row)">编辑</el-button>
                        <el-button type="danger" @click="del(row.goodsID)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="likeObj.currentPage" :page-sizes="[1, 3, 5, 7, 9]" :page-size="likeObj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <!-- 弹出框 -->
            <el-dialog title="修改商品" :visible.sync="dialogFormVisible" :before-close="handleClose">
                <el-form :data="updobj">
                    <el-form-item label="商品名称">
                        <el-input v-model="updobj.gname" autocomplete="off" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <el-select v-model="updobj.category">
                            <el-option :label="item.gname" :value="item.gname" v-for="(item, index) in cateName" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input-number v-model="updobj.price" :precision="2" :step="0.5" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="商品图片" label-width="120">
                        <el-upload class="avatar-uploader" action="/api/goods/gphoto" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="updobj.gdesc">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="define">确 定</el-button>
                </div>
            </el-dialog>
        </template>
    </common-card>
</div>
</template>

<script>
import commonCard from "@/components/commonCard";
import {
    goodsList_api,
    goodsDel_api,
    goodsType_api,
    goodsLike_api,
    edit_api,
} from "@/api/goods";
export default {
    data() {
        return {
            cateName: [],
            tableData: [],
            dialogFormVisible: false,
            total: 0,
            loading: false,
            likeObj: {
                //模糊查询
                gname: "",
                category: "",
                currentPage: 1,
                pageSize: 3,
            },
            updobj: {
                //弹出框的
                name: "", //姓名
                category: "", //分类
                price: "", //价格
                imgUrl: "", //图片
                desc: "", //描述
                goodsID: 0, //id
            },
            imageUrl: "", //显示
        };
    },
    components: {
        commonCard,
    },
    methods: {
        //初始化选择器
        async queryCateName() {
            let res = await goodsType_api();
            this.cateName = res.data;
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.likeObj.pageSize = val;
            this.queryList();
        },
        //分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.likeObj.currentPage = val;
            this.queryList();
        },
        //初始化数据
        async queryList() {
            this.loading = true;
            setTimeout(async () => {
                this.loading = false;
                let {
                    total,
                    data
                } = await goodsList_api(this.likeObj);
                if (data.length != 0) {
                    this.tableData = data;
                    this.total = total;
                } else {
                    if(total==0){
                        alert("查无此数据")
                        this.queryList();
                    }
                    this.likeObj.currentPage = this.likeObj.currentPage - 1;
                    this.queryList();
                }
            }, 1000);
        },
        //模糊查询
        async likebtn() {
            this.queryList();
        },
        //修改功能
        async updgood() {
            let res = await edit_api(this.updobj);
            if (res.code == 0) {
                this.$message.success(res.msg);
                this.dialogFormVisible = false;
                this.queryList();
            } else {
                this.$message.error("修改失败");
            }
        },
        //删除功能
        async del(id) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                let {
                    code,
                    msg
                } = await goodsDel_api({
                    id,
                });
                if (code == 200) {
                    this.$message.success(msg);
                    this.queryList();
                } else {
                    this.$message.error("删除失败");
                }
            });
        },
        //上传成功之后
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.updobj.imgUrl = res.imgUrl;
        },
        //上传成功之前
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg" || "image/gif";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        //修改功能 数据回显
        upd(row) {
            this.updobj = row;
            this.imageUrl = "/api/goodsImg/" + row.imgUrl;
            this.dialogFormVisible = true;
        },
        //修改功能
        async define() {
            let {
                code,
                msg
            } = await edit_api(this.updobj);
            if (code == 200) {
                this.$message.success(msg);
                this.queryList();
                this.dialogFormVisible = false;
            } else {
                this.$message.error("修改失败");
            }
        },
        //评价
        jia(num) {
            console.log(num);
        },
        //描述
        refer() {
            document.querySelector(".aa").style.width = "auto"
            document.querySelector(".aa").style.height = "auto"
        },
        //确认关闭
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    created() {
        this.queryList();
        this.queryCateName();
    },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    padding-left: 100px;
}

/deep/.cell,
.el-form-item__content {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

/deep/.el-form-item {
    text-overflow: ellipsis;
    white-space: nowrap;

    .el-form-item__content {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.el-table {
    margin: 20px auto;
    width: 95%;
}

.goodsList {
    width: 98%;
}

.box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-form-item {
        margin: 0 auto;
    }
}

.avatar {
    width: 150px;
    height: 150px;
}

.el-pagination {
    margin: 10px 20px;
}

.aa {
    width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    white-space: nowrap;
}
/deep/.number{
    background: #eee;
    margin:0 10px;
    border-radius: 5px;
}
</style>
