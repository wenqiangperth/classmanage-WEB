<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnHomePage"></i>账户与设置
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar"></i>&nbsp;&nbsp;讨论课</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div style="width:100%;height:25px"></div>
      <table class="info" cellspacing="0">
        <tr class="tr0">
          <td><label>姓名</label></td>
          <td><label>{{teacher_account.name}}</label></td>
        </tr>
        <tr class="tr1">
          <td><label>教工号</label></td>
          <td><label>{{teacher_account.account}}</label></td>
        </tr>
        <tr class="tr0">
          <td><label>联系方式</label></td>
          <td>
            <label style="height:45px;line-height: 45px">{{teacher_account.email}}<i class="el-input__icon el-icon-edit icon0" @click="editEmail"></i></label>
          </td>
        </tr>
        <tr class="tr1">
          <td><label>账户密码</label></td>
          <td>
            <label></label>
            <i class="el-input__icon el-icon-edit icon0" @click="editPassword"></i>
          </td>
        </tr>
        <tr class="tr0">
          <td><label>管理员邮箱</label></td>
          <td><label>{{teacher_account.manager_email}}</label></td>
        </tr>
      </table>
      <div class="footer">
        <el-button class="btn" type="success" @click="returnLogin" plain>退出登录</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "AccountManage",
    data() {
      return {
        labelPosition: 'right',
        teacher_account: {
          name: '邱老师',
          account: '123456789',
          email: '12345678@xmu.edu.cn',
          password: '111111',
          interval: '',
          isShow: false,
          manager_email:'654321@163.com'
        }
      }
    },
    methods: {
      returnHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      showPassword() {
        this.isShow = !this.isShow;
        var pass = document.getElementById("pass");
        if (this.isShow) {
          pass.type = "text";
        } else {
          pass.type = "password";
        }
      },
      returnLogin() {
        this.$router.push({path: '/'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      editPassword() {
        this.$router.push({path: '/teacher/EditPassword'})
      },
      editEmail() {
        this.$router.push({path: '/teacher/EditEmail'});
      }
    }
  }
</script>

<style scoped>

  .tr0{
    height:45px;
    background-color: whitesmoke;
  }
  .tr1{
    height:45px;
    background-color: mintcream;
  }
  .footer {
    width: 100%;
    margin-top: 180px;
  }
  .info{
    width: 100%;
    font-size: 14px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB",Arial,sans-serif;
  }
  .el-icon-edit{
    float:right;
    margin-right: 5px;
  }

</style>
