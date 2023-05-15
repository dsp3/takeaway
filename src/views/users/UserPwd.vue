<template>
  <div class="userpwd">
  <common-card>
  <template #title><span>修改密码</span></template>
  <template #content>
    <el-form style="padding: 10px" ref="pwdform" :rules="checkPwdObj" :model="form" label-width="100px">
      <el-form-item label="原密码" prop="opwd"
        ><el-input v-model="form.opwd" placeholder="请输入内容"></el-input
      ></el-form-item>
      <el-form-item label="新密码" prop="npwd"
        ><el-input v-model="form.npwd" placeholder="请输入内容"></el-input
      ></el-form-item>
      <el-form-item label="确认新密码" prop="qpwd"
        ><el-input v-model="form.qpwd" placeholder="请输入内容"></el-input
      ></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </template>

  </common-card>

  </div>
</template>

<script>
import commonCard from "@/components/commonCard";
import {editpwd_api,checkopwd_api} from '@/api/user'
export default {
  data() {
    let oldPwd=async (rule,value,callback)=>{
      let res=await checkopwd_api({opwd:this.form.opwd})
      if(res.code=="200"){
        callback()
      }else{
        callback(new Error("输入错误"))
      }
    }
    let checkPwd=(rule,value,callback)=>{
      if(this.form.npwd==value){
        callback()
      }else{
        callback(new Error("与之前新密码不一致 请重试"))
      }
    }
    let check=(rule,value,callback)=>{
      if(this.form.opwd!=value){
        callback()
      }else{
        callback(new Error("新密码不能与旧密码一致"))
        
      }
    }
    return {
      form:{
        opwd:"",
        npwd:"",
        qpwd:""
      },
      checkPwdObj:{
        opwd:[
          {required:true,message:"请输入正确的旧密码",trigger:'blur'},
          {validator:oldPwd,trigger:'blur'}
        ],
        npwd:[
          {required:true,message:"请输入正确的新密码",trigger:'blur'},
          {validator:check,trigger:'blur'}
        ],
        qpwd:[
          {required:true,message:"请输入正确的新密码",trigger:'blur'},
          {validator:checkPwd,trigger:'blur'}
        ]
      }
    }
  },
  components: {
        commonCard,
    },
    methods: {
      async add() {
        let {code,msg} =await editpwd_api(this.form)
        if(code==200){
          this.$message.success(msg)
          this.$router.push("/")
        }else{
          this.$message.error(msg)
        }
      }
    },
};
</script>

<style lang="less" scoped>
.userpwd{
  width: 98%;
}
.el-input {
  width: 250px;
}
</style>