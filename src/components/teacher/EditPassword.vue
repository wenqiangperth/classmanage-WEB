<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnAccountManage"></i>修改密码
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar">&nbsp;&nbsp;讨论课</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-back" @click="returnLogin">&nbsp;&nbsp;退 出</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div style="width:100%;height:15px"></div>
      <table class="table0">
        <tr>
          <td class="td0">
            <el-tooltip class="item" effect="dark" content="密码长度8-32位，须包含数字字母符号至少两种或以上" placement="bottom">
              <el-input id="pass" type="password" placeholder="新密码">
                <i slot="suffix" class="el-input__icon el-icon-view icon2 icon0" @click="showPassword"></i>
              </el-input>
            </el-tooltip>
          </td>
        </tr>
        <tr>
          <td class="td0">
            <el-input id="pass2" type="password" placeholder="确认密码">
              <i slot="suffix" class="el-input__icon el-icon-view icon2 icon0" @click="showPassword2"></i>
            </el-input>
          </td>
        </tr>
        <tr>
          <td class="td0"></td>
        </tr>
        <tr>
          <td class="td0"></td>
        </tr>
        <tr>
          <td class="td0"></td>
        </tr>

      </table>
      <div class="footer">
        <el-button class="btn" type="success" plain @click="returnAccountManage">确认修改</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "editPassword",
    data() {
      return {
        isShow1: false,
        isShow2: false
      }
    },
    methods: {
      returnLogin() {
        this.$router.push({path: '/'});
      },
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      returnAccountManage() {
        this.$router.push({path: '/teacher/AccountManage'});
      },
      showPassword() {
        this.isShow1 = !this.isShow1;
        var pass = document.getElementById("pass");
        if (this.isShow1) {
          pass.type = "text";
        } else {
          pass.type = "password";
        }
      },
      showPassword2() {
        this.isShow2 = !this.isShow2;
        var pass2 = document.getElementById("pass2");
        if (this.isShow2) {
          pass2.type = "text";
        } else {
          pass2.type = "password";
        }
      }
    }

  }
</script>

<style scoped>

  .table0 {
    width: 100%;
    margin: auto;
  }

  .td0 {
    width: 100%;
    height: 45px;
  }

  .td0 p {
    font-size: 12px;
  }

  .td0 a {
    text-decoration: none;
    color: #66CCCC;
  }

  .footer {
    width: 100%;
    margin-top: 180px;
  }

</style>
