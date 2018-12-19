<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <router-link :to="{name:'StartSeminar'}"><i class="el-icon-back icon1 icon0"></i></router-link>
        OOAD--讨论课
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><router-link :to="{name:'Login'}"><i class="el-icon-back">&nbsp;&nbsp;退 出</i></router-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div style="width:100%;height:25px"></div>
      <table class="info" cellspacing="0">
        <tr class="tr0">
          <td class="td1"><label>轮次:</label></td>
          <td><label>{{seminar.round}}</label></td>
        </tr>
        <tr class="tr1">
          <td class="td1"><label>主题:</label></td>
          <td><label>{{seminar.topic}}</label></td>
        </tr>
        <tr class="tr0">
          <td class="td1"><label>课次序号:</label></td>
          <td><label>{{seminar.num}}</label></td>
        </tr>
        <tr class="tr1">
          <td class="td1"><label>要求:</label></td>
          <td><label>{{seminar.require}}</label></td>
        </tr>
        <tr class="tr0">
          <td class="td1"><label>课程情况:</label></td>
          <td>
            <label>{{seminar.status}}<el-button type="text" size="small" style="color:#66cccc;">{{seminar.handle}}</el-button></label>
          </td>
        </tr>
      </table>
      <div>
        <el-button type="success" class="btn" plain @click="startSeminar" style="margin-top: 30px">开始讨论课</el-button>
      </div>
      <div>
        <el-button type="success" class="btn1 btn" plain @click="updateInfo">修改讨论课信息</el-button>
      </div>
      <el-button type="info" size="mini" plain
                 style="float: right;margin-top: 5px">
        删除讨论课
      </el-button>
    </div>


  </div>
</template>

<script>
  export default {
    name: "OngoingSeminar",
    data(){
      return {
        seminar:{
          round:'第二轮',
          topic:'领域模型',
          num:'1',
          require:'界面导航图和所有界面原型设计课堂讨论每个小组15分钟',
          status:'正在进行',
          handle:'查看信息'
        }
      }
    },
    methods: {
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      updateInfo() {
        this.$router.push({path: '/teacher/UpdateSeminarInfo'});
      },
      startSeminar() {
        this.$router.push({path: '/teacher/StartSeminar'});
      }
    }

  }
</script>

<style scoped>
  .btn1 {
    margin-top: 5px;
  }
  .tr0{
    height:45px;
    background-color: whitesmoke;
  }
  .tr1{
    height:45px;
    background-color: mintcream;
  }

  .td1{
    width:30%;
  }

  .info{
    width: 100%;
    font-size: 13px;
  }


</style>

