<template>
  <div>
    <div id="head" class="head">
      <div class="title">
        <i class="el-icon-back icon1 icon0" @click="returnSeminarPage"></i>OOAD
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
      <div style="width: 100%;height: 15px"></div>
      <table class="info" cellspacing="0" style="font-family: 黑体;color: #616161">
        <tr class="tr0">
          <td class="td1"><label>轮次:</label></td>
          <td><label>第{{seminar.order}}轮</label></td>
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
            <label>{{seminar.status}}
              <el-button type="text" size="small" style="color:#66cccc;" @click="checkInfo">查看信息</el-button>
            </label>
          </td>
        </tr>
      </table>
      <div>
        <el-button type="success" class="btn" plain @click="startSeminar" style="margin-top: 160px">开始讨论课</el-button>
      </div>
      <!--
      <div>
        <el-button type="success" class="btn1 btn" plain @click="updateInfo">修改讨论课信息</el-button>
      </div>
      <el-button type="info" size="mini" plain
                 style="float: right;margin-top: 5px">
        删除讨论课
      </el-button>-->
    </div>


  </div>
</template>

<script>
  export default {
    name: "BeforeSeminar",
    data() {
      return {
        seminar: {
          seminarId: '',
          order: '2',
          topic: '领域模型',
          num: '1',
          require: '界面导航图和所有界面原型设计课堂讨论每个小组15分钟',
          status: '未开始',
        }
      }
    },
    created() {
      //此处先接收上个页面传入的seminarId
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/seminar/seminarId',
        headers: {
          'token': window.localStorage['token']
        },
        params: {
          seminarId: that.seminarId
        }
      })
        .then(res => {
          if (res.data.status === 200) {
            console.log(res.data.data);
            let data = res.data.data;
            that.order = data.order;
            that.topic = data.topic;
            that.status = data.status;
            // that.num=data.teamNumLimit;
          }
        })
        .catch(e => {
          console.log(e);
        })
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
      },
      returnSeminarPage() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      checkInfo() {
        this.$router.push({path: '/teacher/CheckInformation'});
      }
    }

  }
</script>

<style scoped>
  .btn1 {
    margin-top: 5px;
  }

  .tr0 {
    height: 45px;
    background-color: rgba(97, 97, 97, 0.05);
  }

  .tr1 {
    height: 45px;
    background-color: rgba(102, 204, 204, 0.05);
  }

  .td1 {
    width: 30%;
  }



</style>
