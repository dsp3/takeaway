<template>
<div class="list">
    <common-card>
        <template #title><span>账号列表</span></template>
        <template #content>
            <!-- 弹出框 -->
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :before-close="handleClose" style="min-width: 300px">
                <el-form :model="userObj" label-width="80px" :rules="checkuser" ref="userfrom">
                    <el-form-item label="用户名" prop="uname">
                        <el-input v-model="userObj.uname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户组">
                        <el-select v-model="userObj.power" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="toupd">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 地址弹出框 -->
            <el-dialog title="添加收货地址" :visible.sync="dialogAddressVisible" style="min-width: 350px" :closeOnClickModal="false">
                <el-form :model="addressObj" label-width="80px" style="min-width: 300px; width: 400px" ref="updform">
                    <el-form-item label="地址" prop="account">
                        <el-cascader size="large" :options="options" v-model="adstr" @change="handleChange" style="width: 100%">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="地址详情">
                        <el-input v-model="addressObj.details" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="addressObj.label" placeholder="请选择">
                            <el-option label="家" value="家"></el-option>
                            <el-option label="公司" value="公司"></el-option>
                            <el-option label="学校" value="学校"></el-option>
                            <el-option label="他人" value="他人"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogAddressVisible = false">取 消</el-button>
                    <el-button type="primary" @click="toAddress">确 定</el-button>
                </div>
            </el-dialog>
            <el-table v-loading="loading" @selection-change="handlerSelect" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 95%" max-height="450px">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="账号">
                    <template slot-scope="scope">{{ scope.row.uname }}</template>
                </el-table-column>
                <el-table-column prop="power" label="用户组"> </el-table-column>
                <el-table-column prop="date" label="创建时间" show-overflow-tooltip>
                    <template #default="{row}">
                        {{ row.date|dateTime }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="primary" size="mini" @click="huixian(row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="del(row.id)">删除</el-button>
                        <el-button size="mini" type="success" @click="addAddress(row.uname)">添加地址</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 20px">
                <el-button type="danger" @click="delMove">批量删除</el-button>
                <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
            </div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="obj.currentPage" :page-sizes="[2, 3, 5, 7, 9]" :page-size="obj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </template>
    </common-card>
</div>
</template>

<script>
import {
    userNameRule
} from "@/utils/rules";
import {
    addAddress_api
} from '@/api/address'
import {
    regionData,
    CodeToText
} from "element-china-area-data";
import commonCard from "@/components/commonCard";

import {
    userList_api,
    userDel_api,
    edit_api,
    batchdel_api
} from "@/api/user";
export default {
    data() {
        //验证
        let checkAccount = function (rule, value, callback) {
            if (userNameRule(value)) {
                callback();
            } else {
                callback(new Error("请输入3到6位由中文 数字 组成的用户名"));
            }
        };
        return {
            tableData: [],
            multipleSelection: [],
            loading: false, //等待 布尔
            ids: [],
            total: 0, //总数
            obj: {
                currentPage: 1, //当前页
                pageSize: 3, //当前数据条,
            },
            userObj: {
                id: "",
                uname: "", //用户名
                power: "", //用户组
            },
            dialogFormVisible: false,
            dialogAddressVisible: false,
            //规则
            checkuser: {
                uname: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        validator: checkAccount,
                        trigger: "blur",
                    },
                ],
            },
            addressObj: {
                address: "", //地址名称
                label: "", //地址类型
                details: "", //地址详情
                uname: ""
            },
            adstr: [],
            options: regionData, //回显地址数据
        };
    },
    components: {
        commonCard,
    },
    created() {
        this.queryList();
    },
    methods: {
        //修改
        toupd() {
            this.$refs.userfrom.validate(async (val) => {
                if (val) {
                    let {
                        code,
                        msg
                    } = await edit_api(this.userObj);
                    if (code == 0) {
                        this.$message.success(msg);
                        this.queryList();
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error("修改失败");
                    }
                }
            });
        },
        //确认关闭？
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        //初始化数据
        queryList() {
            this.loading = true;
            setTimeout(async () => {
                this.loading = false;
                let {
                    data,
                    total
                } = await userList_api(this.obj);
                this.tableData = data;
                if (data.length != 0) {
                    this.total = total;
                } else {
                    this.obj.currentPage = this.obj.currentPage - 1;
                    this.queryList();
                }
            }, 1000);
        },
        // 重置
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.obj.pageSize = val;
            this.queryList();
        },
        //分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.obj.currentPage = val;
            this.queryList();
        },
        //删除功能
        del(id) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                let {
                    code,
                    msg
                } = await userDel_api({
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
        //批量删除
        delMove() {
            if (this.ids.length == 0) {
                this.$message.warning("没用删除的数据");
            } else {
                this.$confirm(`此操作将永久删除条 ${this.ids.length} 数据, 是否继续?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(async () => {
                    let {
                        code,
                        msg
                    } = await batchdel_api({
                        ids: JSON.stringify(this.ids),
                    });
                    if (code == 200) {
                        this.$message.success(msg);
                        this.queryList();
                        this.ids = [];
                    } else {
                        this.$message.error("删除失败");
                    }
                });
            }
        },
        //全选
        handlerSelect(rows) {
            let newarr = rows.map((ele) => {
                return ele.id;
            });
            this.ids = newarr;
        },
        //编辑弹窗
        huixian(row) {
            this.dialogFormVisible = true;
            this.userObj = {
                id: row.id,
                uname: row.uname, //用户名
                power: row.power, //用户组
            };
        },
        // 弹出地址模态框
        //将用户id存入外卖定义的addressObj中
        addAddress(uname) {
            this.dialogAddressVisible = true;
            this.addressObj.uname = uname;

        },
        // 添加地址
        async toAddress() {
            console.log(this.addressObj);
            let res = await addAddress_api(this.addressObj);
            if (res.code == 200) {
                this.$message.success("地址添加成功");
                this.queryList();
            } else {
                this.$message.error("地址添加失败");
            }
            this.dialogAddressVisible = false;
        },
        //地址栏选择框选中之后触发的事件
        //value就是选中的值
        handleChange(value) {
            console.log(value);
            let str = "";
            if (value) {
                str = value
                    .map((ele) => {
                        return CodeToText[ele];
                    })
                    .join("/");
            }
            this.addressObj.address = str;
            console.log(this.addressObj);
        },
    },
};
</script>

<style lang="less" scoped>
.list {
    width: 98%;

    .el-table {
        margin: 0 auto;
    }

    /deep/ .el-card__body,
    .el-main {
        padding: 8px 20px !important;
    }
}
</style>
