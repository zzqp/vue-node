<template>
  <div>
    <h1>新建租客</h1>
    <el-card>
      <el-form :model="model" :rules="rules" ref="houseInfoRef" label-width="100px">
        <el-row :gutter="10">
          <el-col>
            <el-form-item label="房间号">
              <el-cascader v-model="layer" :options="options" @change="cascaderChange"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="人数">
              <el-input-number v-model="model.people" :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="model.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="号码" prop="mobile">
              <el-input v-model="model.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="房费">
              <el-input v-model="model.room" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="电费">
              <el-input v-model="model.electricity" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="水费">
              <el-input v-model="model.water" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="网费">
              <el-switch
                disabled
                v-model="model.network"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="primary" @click="fields">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { message } from '../../utils/utils'
export default {
  data() {
    const checkMobile = (rule, value, callback) => {
      const mobile = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (mobile.test(value)) {
        return callback()
      }
      return callback(new Error('请输入正确的手机号码'))
    }
    return {
      //双向绑定的数据
      model: {
        room: '',
        water: '',
        network: false,
        electricity: '',
        name: '',
        mobile: '',
        people: '',
        cost: '',
        layer: '',
      },
      //渲染级联的数据
      options: [],
      // 选中级联的数据
      layer: [],
      //校验规则
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在2到4个字符', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    //插入数据
    submit() {
      this.$refs.houseInfoRef.validate(async (valid) => {
        if (!valid) return
        const res = await this.$http.post('user/info', {
          name: this.model.name,
          mobile: this.model.mobile,
          people: this.model.people,
          cost:this.model.cost
        })
        await this.$http.post('user/cost/history',this.model)
        await this.$http.put(`user/layer/status/${this.model.layer}`)
        message(res, '添加失败', '添加成功')
        this.$router.push('/houseinfo/list')
      })
    },
    //级联发生改变
    async cascaderChange(el) {
      // this.$refs.ruleForm.resetFields()
      this.model.layer = el[1]
      const res = await this.$http.get(`user/cost/${el[1]}`)
      this.model.water = res.data.res.water
      this.model.network = res.data.res.network
      this.model.electricity = res.data.res.electricity
      this.model.room = res.data.res.room
      this.model.cost = res.data.res._id
      // console.log(this.costId)
    },
    //获取级联的数据
    async fetchCascader() {
      const res = await this.$http.get('user/cascader/history')
      this.options = res.data.obj
    },
    //重置表单
    fields() {
      this.$refs.houseInfoRef.resetFields()
    },
    
    },
    async refs() {
      this.$refs.houseInfoRef.validate((valid) => {
        console.log(valid)
      })
    },
  
  created() {
    this.fetchCascader()
  },
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 20px;
  padding-top: 10px;
}
</style>