<template>
<div class="userbox">
    <common-card>
        <!-- 标题 -->
        <template #title><span>添加账号</span></template>
        <!-- 内容 -->
        <template #content>
            <div>
                <el-form :model="userObj" status-icon :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="uname">
                        <el-input type="text" v-model="userObj.uname" autocomplete="off"></el-input>
                        <!-- autocomplete是否记录历史记录 -->
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd">
                        <el-input type="password" v-model="userObj.pwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户组">
                        <el-select v-model="userObj.power" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通用户" value="普通用户"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="addUser">添加</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </common-card>
</div>
</template>

<script>
import dayjs from "dayjs";
import {
    userAdd_api
} from "@/api/user";
import {
    userNameRule,
    pwdRule
} from "@/utils/regular";
import commonCard from "@/components/commonCard";
export default {
    components: {
        commonCard,
    },
    data() {
        //rule规则 value值 callback验证成功或者失败的回调
        let checkAccount = function (rule, value, callback) {
            if (userNameRule(value)) {
                callback();
            } else {
                callback(new Error("请输入3到6位由中文 数字 组成的用户名"));
            }
        };
        let checkPwd = function (rule, value, callback) {
            if (pwdRule(value)) {
                callback();
            } else {
                callback(new Error("请输入3到6位由数字 组成的密码"));
            }
        };
        return {
            userObj: {
                uname: "",
                pwd: "",
                power: "",
                date: "",
            },
            rules: {
                uname: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    // validator自定义的的一个事件触发验证规则
                    {
                        validator: checkAccount,
                        trigger: "blur"
                    },
                ],
                pwd: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        validator: checkPwd,
                        trigger: "blur"
                    },
                ],
            },
        };
    },
    methods: {
        addUser() {
            this.userObj.date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
            console.log(this.userObj);
            // ref取名字获取元素
            this.$refs.userForm.validate(async (val) => {
                if (val) {
                    let {
                        code,
                        msg
                    } = await userAdd_api(this.userObj);
                    if (code == 200) {
                        this.$message.success(msg);
                        this.$router.push("/users/list")
                    } else {
                        this.$message.error("添加失败");
                    }
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.el-input,
.el-select {
    width: 200px;
}
.userbox{
width: 98%;
}
</style>
