<template>
  <el-card>
    <el-row>
      <el-col :span="8">
        <el-date-picker
          v-model="model.month"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="fetchMonth"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-table stripe :data="tableData">
      <el-table-column label="日期" prop="created"></el-table-column>
      <el-table-column label="房号" prop="layer.name"></el-table-column>
      <el-table-column label="房费" prop="room"></el-table-column>
      <el-table-column label="电费" prop="electricity"></el-table-column>
      <el-table-column label="水费" prop="water"></el-table-column>
       <el-table-column label="网费" >
        <template #default="scope">
          <el-switch
            disabled
            v-model="scope.row.network"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-upload
  class="avatar-uploader"
  :action="$http.defaults.baseURL+'upload'"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  >
  <img v-if="model.imageUrl" :src="model.imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      model: {
        month:[],
        imageUrl:''
        },
    }
  },
  methods: {
    handleAvatarSuccess(res){
      console.log(res)
      this.model.imageUrl = res.url
      },
    async fetchData(){
      const res = await this.$http.get('history/cost')
      this.tableData = res.data
      // console.log(res);
    },
    //当选择月份时
    async fetchMonth(){
      const res = await this.$http.post('history/month',this.model)
      this.tableData = res.data
      console.log(res);
    }
  },
  created() {
    this.fetchData()
  },
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>