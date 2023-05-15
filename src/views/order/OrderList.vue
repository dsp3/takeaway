<template>
<div class="order">
    <common-card>
        <template #title>
            <el-form ref="form" :inline="true" :model="form" label-width="80px">
                <el-form-item label="订单号">
                    <el-input v-model="form.orderID" placeholder="请输入内容" @keyup.enter="fn"></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                    <el-input v-model="form.consignee" placeholder="请输入内容" @keyup.enter="fn"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" placeholder="请输入内容" @keyup.enter="fn"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-input v-model="form.status" placeholder="请输入内容" @keyup.enter="fn"></el-input>
                </el-form-item>
                <el-form-item label="选择时间">
                    <el-date-picker v-model="form.orderTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                    </el-date-picker>
                    <!-- <el-time-picker is-range v-model="form.tt" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                    </el-time-picker> -->
                </el-form-item>
                &nbsp;<el-button type="primary" @click="fn">查询</el-button>
            </el-form>
        </template>
        <template #content>
            <!-- 表格 -->
            <el-table v-loading="loading" :data="tableData" border style="width: 95%">
                <el-table-column fixed prop="orderID" label="订单号" width="100">
                </el-table-column>
                <el-table-column label="下单时间" width="250">
                    <template #default="{row}">
                        {{ row.orderTime|dateTime }}</template>
                </el-table-column>
                <el-table-column prop="phone" label="手机号" width="180">
                </el-table-column>
                <el-table-column prop="consignee" label="收货人" width="120">
                </el-table-column>
                <el-table-column prop="address" label="配送地址" width="80">
                </el-table-column>
                <el-table-column prop="arriveTime" label="送达时间" width="120">
                </el-table-column>
                <el-table-column prop="notes" label="用户备注" width="140">
                </el-table-column>
                <el-table-column prop="amount" label="订单金额" width="120">
                </el-table-column>
                <el-table-column prop="status" label="订单状态" width="120">
                    <template #default="{row}">{{ row.status?'已完成':'未完成' }}</template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template #default="{row}">
                        <el-button @click="handleClick(row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="editClick(row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="obj.currentPage" :page-sizes="[1, 3, 5, 7, 9]" :page-size="obj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <!-- 查看 -->
            <el-dialog title="查看" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <p>订单ID: {{ checkobj.orderID }}</p>
                <hr>
                <p>下单时间: {{ checkobj.orderTime|dateTime }}</p>
                <hr>
                <p>电话: {{ checkobj.phone }}</p>
                <hr>
                <p>收货人: {{ checkobj.consignee }}</p>
                <hr>
                <p>配送地址: {{ checkobj.address }}</p>
                <hr>
                <p>送达时间: {{ checkobj.arriveTime }}</p>
                <hr>
                <p>备注: {{ checkobj.notes }}</p>
                <hr>
                <p>订单金额: {{ checkobj.amount }}</p>
                <hr>
                <p>订单状态: {{ checkobj.status?'已完成':'未完成' }}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑 -->
            <el-dialog :title="'编辑 id为: '+checkobj.orderID+' 的订单'" :visible.sync="dialogVedit" width="70%" :before-close="handleClose">
                <el-form :model="checkobj" label-width="80px" :inline="true" size="normal">
                    <el-form-item label="电话:">
                        <el-input v-model="checkobj.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人:">
                        <el-input v-model="checkobj.consignee"></el-input>
                    </el-form-item>
                    <el-form-item label="配送地址:">
                        <el-input v-model="checkobj.address"></el-input>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <el-input v-model="checkobj.notes"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVedit = false">取 消</el-button>
                    <el-button type="primary" @click="gai">确 定</el-button>
                </span>
            </el-dialog>
        </template>
    </common-card>
</div>
</template>

<script>
import {
    orderList_api,
    singleDatum_api,
    editlist_api,
    cha_api
} from '@/api/order'
import {personal_api} from '@/api/user'
import commonCard from "@/components/commonCard";
export default {
    components: {
        commonCard,
    },
    data() {
        return {
            pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
            tableData: [],
            obj: {
                currentPage: 1, //当前页
                pageSize: 3, //当前数据条数
            },
            form: {
                orderID: "",
                consignee: "",
                phone: "",
                status: "",
                currentPage: 1, //当前页
                pageSize: 1, //当前数据条数
                orderTime:[]
            },
            loading: false,
            total: 10,
            dialogVisible: false,
            checkobj: {
                consignee: "", //用户
                orderID: 0, //id
                phone: "", //电话
                address: "", //地址
                notes: "" //状态
            },
            dialogVedit: false
        };
    },
    methods: {
        // 分页
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
        //模糊查询
        fn() {
            this.loading = true
            setTimeout(async () => {
                this.loading = false
                this.form.orderTime=JSON.stringify(this.form.orderTime)
                let {
                    data,
                    total
                } = await cha_api(this.form)
                this.tableData = data
                if (data.length != 0) {
                    console.log(this.tableData);
                    this.total = total;
                    this.form = {
                        orderID: "",
                        consignee: "",
                        phone: "",
                        status: "",
                        currentPage: 1, //当前页
                        pageSize: 1, //当前数据条数
                    }
                } else {
                    if(total==0){
                        alert("查无此数据")
                        this.queryList();
                    }
                    this.obj.currentPage = this.obj.currentPage - 1
                    // this.queryList();
                }
            }, 10);
        },
        // 数据渲染初始化
        queryList() {
            this.loading = true
            setTimeout(async () => {
                this.loading = false
                let {
                    data,
                    total
                } = await orderList_api(this.obj)
                if (data.length != 0) {
                    this.tableData = data
                    console.log(this.tableData);
                    this.total = total;
                } else {
                    this.obj.currentPage = this.obj.currentPage - 1
                    this.queryList();
                }
            }, 10);
        },
        //模态框确认关闭
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        //查看
        async handleClick(row) {
            this.dialogVisible = true
            let {
                data
            } = await singleDatum_api({
                id: row.orderID
            })
            this.checkobj = data
            console.log(this.checkobj);
        },
        //编辑
        async editClick(row) {
            // 查看权限
            let res= await personal_api()
            if(res.data.power=="超级管理员"){
                this.dialogVedit = true
            let {
                data
            } = await singleDatum_api({
                id: row.orderID
            })
            this.checkobj = data
            console.log(this.checkobj);
            }else{
                alert("抱歉您的权限不够")
            }
        },
        // 修改提交
        async gai() {
            let {
                data,
                code,
                msg
            } = await editlist_api(this.checkobj)
            if (code == 200) {
                this.$message.success(msg)
                this.checkobj = data
                this.queryList()
            } else {
                this.$message.error("修改失败")
            }
            this.dialogVedit = false
        }
    },
    created() {
        this.queryList()
    },
};
</script>

<style lang="less" scoped>
.order {
    width: 98%;
}

/deep/th {
    resize: horizontal;
    overflow: auto;
}

/deep/.cell {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

/deep/.el-table__body-wrapper {
    &::-webkit-scrollbar {
        height: 10px
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

.el-input {
    width: 200px;
}

.el-dialog hr {
    margin: 0;
}

.el-dialog p {
    font-size: 16px;
    margin: 5px 0 5px 10px;
}

.el-dialog p:hover {
    background: #aaa;
}

.el-pagination {
    margin: 10px 20px;
}

.el-table {
    width: 98%;
    margin: 20px auto 20px;
}

.cell {
    display: flex;
}
.order{
    width: 98%;
}
</style>
