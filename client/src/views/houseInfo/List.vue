<template>
  <el-card>
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="model.query" class="input-with-select">
          <el-button @click="fetch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table stripe :data="tableData">
      <el-table-column label="日期" prop="created"></el-table-column>
      <el-table-column label="房号" prop="cost.layer.name"></el-table-column>
      <el-table-column label="人数" prop="people"></el-table-column>
      <el-table-column label="状态" prop>
        <template #default="scope">
          <el-switch
            disabled
            @change="handleStatus1(scope.row)"
            v-model="scope.row.cost.layer.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="号码" prop="mobile"></el-table-column>
      <el-table-column label="房费" prop="cost.room"></el-table-column>
      <el-table-column label="电费" prop="cost.electricity"></el-table-column>
      <el-table-column label="水费" prop="cost.water"></el-table-column>
      <el-table-column label="网费" prop="cost.network">
        <template #default="scope">
          <el-switch
            @change="networkChange(scope.row)"
            v-model="scope.row.cost.network"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="model.pagenum"
      :page-sizes="[2, 4, 6]"
      :page-size="model.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
import { message, confirm } from '../../utils/utils'
export default {
  data() {
    return {
      tableData: [],
      model: {
        query: '',
        pagesize: 2,
        pagenum: 1,
      },
      total: 40,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    //获取表单数据
    async fetch() {
      const res = await this.$http.get('user/info', { params: this.model })
      this.tableData = res.data.res
      this.total = res.data.total
    },
    //删除数据
    async handleDelete(row) {
      const confirm1 = await confirm(`是否删除"${row.name}"`)
      if (confirm1 != 'confirm') return this.$message('取消删除')
      const res = await this.$http.delete(
        `user/info/delete/${row._id}/${row.cost.layer._id}/${row.cost._id}`
      )
      message(res, '删除失败', '删除成功')
      this.fetch()
    },
    //修改网络状态
    async networkChange(row) {
      const res = await this.$http.put('user/cost/network/', {
        id: row.cost._id,
        network: row.cost.network,
      })
      message(res, '更新失败', '更新成功')
      this.fetch()
    },
    //一页显示多少条信息
    handleSizeChange(e) {
      this.model.pagesize = e
      this.fetch()
    },
    // 当前第一页
    handleCurrentChange(e) {
      this.model.pagenum = e
      this.fetch()
    }
  },
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
  margin-left: 50px;
}
.el-table{
  margin-top: 20px;
}
</style>