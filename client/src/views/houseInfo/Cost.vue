<template>
  <el-card>
    <el-form
      label-width="40px"
      :model="model"
      :rules="rules"
      ref="ruleForm"
      @submit.native.prevent="save"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="房号">
            <el-cascader
              :props="{ expandTrigger: 'hover' }"
              :options="options"
              v-model="layer"
              @change="cascaderChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row >
        <el-col :span="6">
          <el-form-item  label="房费">
            <el-input v-model="model.room"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="6">
          <el-form-item  label="电费">
            <el-input v-model="model.electricity"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="6">
          <el-form-item  label="水费">
            <el-input v-model="model.water"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="6">
          <el-form-item  label="网费">
            <el-switch v-model="model.network" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {message} from '../../utils/utils'
export default {
  data() {
    return {
      layer: [],
      options: [],
      rules: {},
      model: {
        water:'',
        electricity:'',
        network:false,
        room:'',
        layer:''
      }
    }
  },
  methods: {
    cascaderChange(e) {
      this.model.layer = e[1]
    },
    //获取级联的数据
    async fetchCascader() {
      const res = await this.$http.get("user/cascader");
      res.data.layer.forEach((item) => {
        this.options.push(item);
      });
    },
    //插入数据
    async save(){
      const res = await this.$http.post('user/cost',this.model)
      message(res,'添加失败','添加成功')
      // console.log(res);
    }
  },
  created() {
    this.fetchCascader();
  },
};
</script>

<style lang="less" scoped>
</style>