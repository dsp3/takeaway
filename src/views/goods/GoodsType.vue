<template>
<div class="userbox">
    <comm-card>
        <!-- title 标题  v-bind  :  v-on @  v-slot # -->
        <template #title>
            <span>商品分类</span>
        </template>

        <!-- content 正文-->
        <template #content>
            <div>
                <!-- 表格 -->
                <el-table :data="tableData" style="width: 100%">
                    <!-- :index="indexMethod" -->
                    <el-table-column type="index" :index="indexMethod" label="序号">
                    </el-table-column>
                    <el-table-column prop="gname" label="分类名称" width="180">
                        <template #default="{ row }">
                            <!--插槽-->
                            <span v-show="row.flag == false">{{ row.gname }}</span>
                            <el-input v-show="row.flag == true" :value="row.gname"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="是否启用" width="180">
                        <template #default="{ row }">
                            <el-switch v-model="row.status" active-color="#13ce66" inactive-color="#ff4949" :disabled="!row.flag">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button :type="row.flag == true ? 'success' : 'primary'" size="small" @click="upd(row)">{{ row.flag ? "完成" : "修改" }}</el-button>
                            <el-button type="danger" size="small" @click="del(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分类 -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="obj.currentPage" :page-sizes="[1, 4, 6, 20]" :page-size="obj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </template>
    </comm-card>
</div>
</template>

<script>
import {
    catelist_api,
    edittype_api,
    deltype_api
} from "@/api/goods";
// 第一步 引入
import commCard from "../../components/commonCard";
// 第二步 注册到我们的components中
export default {
    data() {
        return {
            obj: {
                currentPage: 1,
                pageSize: 4,
            },
            tableData: [],
            total: 0,
        };
    },
    components: {
        commCard,
    },
    created() {
        this.queryList();
    },
    methods: {
        async queryList() {
            let {
                data,
                total
            } = await catelist_api(this.obj);
            this.total = total;
            if (data.length != 0) {
                this.tableData = data.map((ele) => {
                    ele.flag = false;
                    ele.status = ele.state == 1 ? true : false;
                    return ele;
                });
            } else {
                this.obj.currentPage = this.obj.currentPage - 1;
                this.queryList();
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.obj.pageSize = val;
            this.queryList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.obj.currentPage = val;
            this.queryList();
        },
        //序号事件
        indexMethod(index) {
            return (this.obj.currentPage - 1) * this.obj.pageSize + index + 1;
        },
        // 修改设置
        async upd(row) {
            if (row.flag) {
                let obj = {
                    ...row
                }; //浅拷贝
                obj.state = obj.status ? 1 : 0; //让obj的值改变后不会影响row的值
                let res = await edittype_api(obj);
                if (res.code == 0) {
                    this.$message.success(res.msg);
                } else {
                    this.$message.error("修改失败");
                }
            }
            row.flag = !row.flag;
        },
        // 删除功能
        async del(id) {
            this.$confirm(`此操作将永久删除这条数据, 是否继续?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(async () => {
                    let {
                        code,
                        msg
                    } = await deltype_api({
                        id
                    });
                    if (code == 200) {
                        this.$message.success(msg);
                        this.queryList();
                    } else {
                        this.$message.error("删除失败");
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
};
</script>

<style lang="less" scoped>
.userbox {
    width: 98%;

    .el-table {
        padding-left: 20px;
    }
}

.el-pagination {
    margin: 10px 20px;
}
</style>
