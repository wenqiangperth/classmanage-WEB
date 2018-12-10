<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <i class="el-icon-back icon1 icon0"></i>--讨论课
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell icon0" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="{name:'Login'}"><i class="el-icon-back icon0"></i>&nbsp;&nbsp;退 出</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <el-card>
        <div slot="header">
          <span>主题:{{}}</span>
        </div>
        <table style="width: 100%;text-align: center">
          <tr style="line-height: 40px">
            <td style="width: 30%">课次序号:</td>
            <td>{{}}</td>
          </tr>
          <tr>
            <td style="width: 30%">要求:</td>
            <td style="text-align: left">{{}}</td>
          </tr>
          <tr>
            <td style="width: 30%">课程情况:</td>
            <td><span style="color: red">暂停</span></td>
          </tr>
        </table>
      </el-card>
      <el-button type="success" class="btn" plain>继续讨论课</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "SuspendSeminar",
    data() {
      return {}
    },
    methods:{
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      }
    }
  }
</script>

<style scoped>


</style>
