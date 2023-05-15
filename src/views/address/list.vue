<template>
<div class="userbox">
    <comm-card>
        <!-- title 标题 -->
        <template #title>
            <div class="box">
                <span>地址列表</span>
                <div>
                    <el-form label-width="80px" :inline="true" size="small">
                        <el-form-item label="用户名" style="display:flex;align-items:center;width:400px;margin:0;justify-content: space-between;">
                            <el-input v-model="addressObj.address" placeholder="请输入用户名" size="normal" style="width:200px" clearable></el-input>
                            <el-button type="primary" size="default" @click="likeBtn" style="margin-left: 10px;">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </template>
        <!-- content 正文-->
        <template #content>
            <div>
                <el-table ref="filterTable" :data="tableData" style="width: 95%;margin:0 auto">
                    <el-table-column prop="uname" label="用户名"> </el-table-column>
                    <el-table-column prop="ads" label="省市区"> </el-table-column>
                    <el-table-column prop="details" label="地址详情"> </el-table-column>
                    <el-table-column prop="label" label="标签">
                        <template slot-scope="scope">
                            <el-tag type="primary" v-show="scope.row.label=='家'" disable-transitions>{{ scope.row.label }}</el-tag>
                            <el-tag type="success" v-show="scope.row.label=='学校'" disable-transitions>{{ scope.row.label }}</el-tag>
                            <el-tag type="warning" v-show="scope.row.label=='公司'" disable-transitions>{{ scope.row.label }}</el-tag>
                            <el-tag type="info" v-show="scope.row.label=='他人'" disable-transitions>{{ scope.row.label }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template #default="{ row }">
                            <el-button size="mini" type="primary" @click="huixian(row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="del(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="addressObj.currentPage" :page-sizes="[1, 4, 6, 20]" :page-size="addressObj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <el-dialog title="修改地址" :visible.sync="dialogAddressVisible" style="min-width: 350px" :closeOnClickModal="false">
                    <el-form :model="updObj" label-width="80px" style="min-width: 300px; width: 400px" ref="updform">
                        <el-form-item label="地址" prop="account">
                            <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange" style="width: 100%">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="地址详情">
                            <el-input v-model="updObj.details" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="updObj.label" placeholder="请选择">
                                <el-option v-for="item in label" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAddressVisible = false">取 消</el-button>
                        <el-button type="primary" @click="toUpd">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </template>
    </comm-card>
</div>
</template>

<script>
import {
    addressList_api,
    addressDel_api,
    addressEdit_api
} from "@/api/address";
import {
    regionData,
    CodeToText,
    TextToCode
} from "element-china-area-data";
// 第一步 引入
import commCard from "@/components/commonCard";
// 第二步 注册到我们的components中
export default {
    components: {
        commCard,
    },
    data() {
        return {
            tableData: [],
            addressObj: {
                currentPage: 1,
                pageSize: 4,
                address: "",
            },
            total: 0,
            dialogAddressVisible: false,

            updObj: {
                id: 0, //id
                ads: "", //地址名称
                label: "", //地址类型
                details: "", //地址详情
            },
            adstr: [],
            options: regionData,
            selectedOptions: [],
            label:[{value:'学校',label:"学校"},
            {value:'家',label:"家"},
            {value:'公司',label:"公司"},
            {value:'他人',label:"他人"},]
        };
    },
    created() {
        this.queryList();
    },
    methods: {
        // 模糊查询
        likeBtn() {
            this.queryList();
        },
        //初始化数据
        async queryList() {
            let res = await addressList_api(this.addressObj);
            this.tableData = res.data;
            this.total = res.total;
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.addressObj.pageSize = val;
            this.queryList();
        },
        //分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.addressObj.currentPage = val;
            this.queryList();
        },
        //修改第一步回显数据
        huixian(row) {
            this.updObj = {
                id: row.id, //id
                ads: row.ads, //地址名称
                label: row.label, //地址类型
                details: row.details, //地址详情
            };
            let arr = row.ads.split("/");
            console.log(arr);
            this.selectedOptions = [
                TextToCode[arr[0]].code,
                TextToCode[arr[0]][arr[1]].code,
                TextToCode[arr[0]][arr[1]][arr[2]].code,
            ];
            this.dialogAddressVisible = true;
        },
        //数据改变事件
        handleChange(value) {
            let str = "";
            if (value) {
                str = value
                    .map((ele) => {
                        return CodeToText[ele];
                    })
                    .join("/");
            }
            this.updObj.ads = str;
        },
        // 提交修改
        async toUpd() {
            let res = await addressEdit_api(this.updObj);
            console.log(res);
            if (res.code == 200) {
                this.$message.success("修改成功");
                this.queryList();
            } else {
                this.$message.error("修改失败");
            }
            this.dialogAddressVisible = false;
        },
        //删除功能
        del(id) {
            // element-ui一个弹出框的拦截
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    label: "warning",
                })
                .then(async () => {
                    let res = await addressDel_api({
                        id
                    });
                    if (res.code == 0) {
                        //删除成功
                        this.$message.success("删除成功");
                        this.queryList();
                    } else {
                        this.$message.error("删除失败");
                    }
                })
                .catch(() => {});
        },
    },
};
</script>

<style lang="less" scoped>
.userbox {
    width: 98%;
}
/deep/.cell {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
