<template>
  <div>
    <el-container style="height:100vh">
      <!-- 顶部导航栏 -->
      <el-header></el-header>
      <el-container>
        <!-- 左侧导航栏 -->
        <el-aside :width="isCollapse?'64px':'200px'" style="background-color: rgb(49, 55, 67)">
          <div class="toggle-button" @click="toggleCollapse"> | | | </div>
          <el-menu :default-openeds="['1','2','3']" background-color="#313743" text-color="#fff" active-text-color="#409EFF" :collapse="isCollapse" router  :default-active="this.$route.path" :collapse-transition="false">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-school"></i>
                <span>九五内栋</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/layer/create">
                  <i class="el-icon-plus"></i>新建层数
                </el-menu-item>
                <el-menu-item index="/layer/list">
                  <i class="el-icon-s-custom"></i>层数列表
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-school"></i><span>人员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/houseinfo/create">
                  <i class="el-icon-plus"></i>新建租客
                </el-menu-item>
                <el-menu-item index="/houseinfo/list">
                  <i class="el-icon-s-custom"></i>房客信息
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-office-building"></i><span>水电管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/houseinfo/cost">
                  <i class="el-icon-plus"></i>新建水电
                </el-menu-item>
                <el-menu-item index="/cost/history">
                  <i class="el-icon-setting"></i>历史水电
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 中间内容部分 -->
        <el-main>
          <!-- <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"/>-->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color:#545c64;
}
.el-menu {
  border-right: none;
  background-color: #333744;
}
.el-menu-item-group__title {
  padding: 0;
}
.toggle-button{
  height: 30px;
  background-color: #15171b;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>

<script>
export default {
  data(){
    return{
      isCollapse: false
    }
  },
  methods: {
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    }
  },

}
</script>

