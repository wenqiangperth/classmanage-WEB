<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnLogin"></i>修改密码</div>
    </div>
    <div class="main">
      <div style="width:100%;height:15px"></div>
      <table class="table0">
        <tr style="width: 100%">
          <td class="td0">
            <el-input id="pass2" type="password" v-model="oldPassword" placeholder="原密码">
              <i slot="suffix" class="el-input__icon el-icon-view icon2 icon0" @click="showPassword2"></i>
            </el-input>
          </td>
        </tr>
        <tr style="width: 100%">
          <td class="td0">
              <el-input id="pass" type="password" v-model="newPassword" placeholder="新密码">
                <i slot="suffix" class="el-input__icon el-icon-view icon2 icon0" @click="showPassword"></i>
              </el-input>
          </td>
        </tr>
        <tr style="width: 100%">
          <td class="td0"></td>
        </tr>
        <tr style="width: 100%">
          <td class="td0"></td>
        </tr>
        <tr style="width: 100%">
          <td class="td0"></td>
        </tr>

      </table>
      <div class="footer">
        <el-button class="btn" type="success" plain @click="modifyPassword">确认修改</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Activate",
    data() {
      return {
        newPassword: '',
        oldPassword: '',
        isShow1: false,
        isShow2: false
      }
    },
    methods: {
      returnLogin() {
        this.$router.push({path: '/teacher/AccountManage'});
      },
      modifyPassword() {
        this.$axios({
          method: 'PUT',
          url: '/user/password',
          data: {
            oldPassword: this.oldPassword,
            password: this.newPassword
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.$router.push({
                path: '/teacher/AccountManage',
              });
            } else if (res.status === 400) {
              this.$message({
                type: 'error',
                message: '信息不合法！'
              });
            }
          })
          .catch(e => {
            console.log(e);
          })
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
