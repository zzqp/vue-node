<template>
  <div>
    <el-table :height="840" :data="items">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column prop="name" label="楼层"></el-table-column>
      <el-table-column prop="parent.name" label="父级"></el-table-column>
      <el-table-column label="状态" prop="network">
        <template #default="scope">
          <el-switch
            @change="handleStatus(scope.row)"
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="$router.push({name:'Edit',params:{id:scope.row._id}})">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      model:{
        status:''
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/rest/layer')
      this.items = res.data.res
    },
    //删除数据
    async handleDelete(index, row) {
      const confirm = await this.confirm(`是否删除"${row.name}"`)
      if (confirm != 'confirm') return this.$message('取消删除')
      const res = await this.$http.delete(`rest/layer/${row._id}`)
      this.message(res, '删除失败', '删除成功')
      this.fetch()
    },
    async confirm(str) {
      const res = await this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      return res
    },
    message(res, ...str) {
      if (res.status != 200) return this.$message.error(str[0])
      this.$message.success(str[1])
    },
    async handleStatus(){
      // console.log(this.model.status);
    }
  },
}
</script>

<style>
</style>