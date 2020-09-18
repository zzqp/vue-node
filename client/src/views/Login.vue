<template>
  <div class="card-container">
    <el-card header="请登录" v-show="isShow">
      <el-form
        :model="model"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="20">
            <el-form-item label="账号" prop="user">
              <el-input v-model="model.user" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="密码" prop="password">
              <el-input v-model="model.password" show-password clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>  
          <el-button type="primary" @click="Off">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card header="请注册" v-show="isreg">
      <el-form
        :model="reg"
        :rules="registeredRules"
        ref="registeredRule"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="20">
            <el-form-item label="账号" prop="user">
              <el-input v-model="reg.user" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="密码" prop="password">
              <el-input v-model="reg.password" show-password clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="Off">登录</el-button>  
          <el-button type="primary" @click="registered">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model:{},
      reg:{},
      isShow:true,
      isreg:false,
      rules:{
        user:[
           { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password:[
           { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      registeredRules:{
        user:[
           { required: true, message: '请输入用户名', trigger: 'blur' },
           { min:3,max:10, message: '长度在3到10个字符', trigger: 'blur' },
        ],
        password:[
           { required: true, message: '请输入密码', trigger: 'blur' },
           { min:3,max:10, message: '长度在3到10个字符', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    login(){
      this.$refs.ruleForm.validate(async validate=>{
        if(!validate) return
        const res = await this.$http.post('login/login',this.model)
        if(res.data.status == 200) {
          this.$message.success(res.data.msg)
          this.$router.push('/home')
          console.log('---');
          localStorage.setItem('token',res.data.token)
        }
      })
    },
    Off(){
      this.isShow = !this.isShow
      this.isreg = !this.isreg
    },
    registered(){
      this.$refs.registeredRule.validate(async validate=>{
        if(!validate) return
        const res = await this.$http.post('login/registered',this.reg)
        this.$message.success('注册成功')
      })
    },
  }
}
</script>

<style lang="less" scoped>
.el-card {
  width: 20%;
  height: 300px;
}
.card-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
}
</style>