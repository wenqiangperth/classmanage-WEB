<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnAccountManage"></i>修改密码
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="gotoSeminar"><i class="el-icon-service icon0"></i>&nbsp;&nbsp;讨论课</div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="returnLogin"><i class="el-icon-back icon0"></i>&nbsp;&nbsp;退 出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <table class="table0">
        <tr>
          <td class="td0">
            <p>&nbsp;&nbsp;&nbsp;发送验证码: <a href="mailto:qiuming@qq.com">qiuming@qq.com</a></p>
          </td>
        </tr>
        <tr>
          <td class="td0">
            <el-tooltip class="item" effect="dark" content="可包含字母、数字、下划线，长度不少于6位" placement="bottom">
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
          <td class="td0">
            <el-input class="input0" placeholder="填写验证码">
              <el-button slot="append" type="danger" plain>立即验证</el-button>
            </el-input>
          </td>
        </tr>

      </table>
      <div class="footer">
        <el-button class="btn1" type="success" @click="returnAccountManage">确认修改</el-button>
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
  .head {
    height: 70px;
    width: 100%;
    background-color: #CCFF99;
  }

  .title {
    display: block;
    text-align: center;
    line-height: 70px;
  }

  .icon1 {
    float: left;
    margin-left: 3%;
    line-height: 70px;
  }

  .plus {
    float: right;
    margin-right: 3%;
    line-height: 70px;
  }

  .icon0 {
    font-weight: bolder;
  }

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

  .btn1 {
    height: 36px;
    width: 100%;
    border: none;
    background-color: #66CCCC;
  }

  .main {
    width: 50%;
    margin: auto;
  }
  @media (max-width: 640px) {
    .main {
      width: 100%;
    }

  }

  .footer {
    width: 100%;
    margin-top: 180px;
  }

</style>
