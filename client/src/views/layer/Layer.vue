<template>
  <div>
    <h1>{{$route.params.id?'编辑':'添加'}}房号{{$route.params.id}}</h1>
    <el-form label-width="60px" @submit.native.prevent="save">
      <el-row :gutter="5">
        <el-col :span="6">
          <el-form-item label="父类">
            <el-select clearable v-model="model.parent" placeholder="请选择">
              <el-option
                v-for="item in parents"
                :key="item.value"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select clearable v-model="model.status" placeholder="请选择">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.name"
                :value="item.status"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        status:false,
        name:" "
      },
      parents: [],
      status:[
        {name:"未租赁",status:false},
        {name:"已租赁",status:true}
        ]
    }
  },
  methods: {
    async save() {
      const id = this.$route.params.id
      let res
      if (id) {
        res = await this.$http.put(`rest/layer/${id}`, this.model)
        this.message(res, '编辑失败', '编辑成功')
      } else {
        res = await this.$http.post('rest/layer/add',this.model)
        this.message(res, '添加失败', '添加成功')
      }
      this.$router.push('/layer/list')
    },
    async fetch() {
      const id = this.$route.params.id
      const res = await this.$http.get(`rest/layer/${id}`)
      this.model = res.data
    },
    message(res, ...str) {
      if (res.status != 200) return this.$message.error(str[0])
      this.$message.success(str[1])
    },
    async fetchParents() {
      const res = await this.$http.get('rest/layer')
      this.parents = res.data.items
    },
  },
  created() {
    this.$route.params.id && this.fetch()
    this.fetchParents()
  },
}
</script>

<style lang="less" scoped>
h1{
  margin-bottom: 20px;
}
</style>