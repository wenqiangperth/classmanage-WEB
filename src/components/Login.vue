<template>
  <div class="body">
    <div id="head" class="login_head">
      <div class="title"><i class="el-icon-close icon1"></i>课堂管理系统登录</div>

    </div>
    <div class="login_main">
      <form>
        <table class="table0">
          <tr>
            <td class="td0"></td>
          </tr>
          <tr>
            <td class="td0">
              <el-input class="input0" type="text" placeholder="学号/教工号/管理员账号" v-model="id"></el-input>
            </td>
          </tr>
          <tr>
            <td class="td0">
              <div class="bottom">
                <el-tooltip class="item" effect="dark" content="可包含字母、数字、下划线，长度不少于6位" placement="bottom">
                  <el-input class="input0" id="pass" type="password" placeholder="输入密码"
                            suffix-icon="el-icon-view" v-model="password"></el-input>
                </el-tooltip>
              </div>
            </td>
          </tr>
          <tr>
            <td class="td0"></td>
          </tr>
          <tr>
            <td class="td0">
              <el-button class="btn" type="success" @click="Login">登录</el-button>
            </td>
          </tr>
          <tr>
            <td class="td0"><a @click="FindPassword" class="find_pass">忘记密码</a></td>
          </tr>

        </table>
      </form>
    </div>
    <div class="footer">
      <p>默认密码为123456</p>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        id: '',
        password: ''
      }
    },
    methods: {
      Login() {
        let _this = this;
        _this.$axios({
          method: 'post',
          url: '/Login',
          data: {
            accountNumber: _this.id,
            password: _this.password
          }
        })
          .then( response => {
            if (response.data === '登录成功') {
              _this.$router.push({
                path: '/teacher/HomePage',
                name: 'HomePage',
                query: {
                  password: response
                }
              })
            } else {

            }
          }).catch(error => {
          console.log(error);
        });
      },
      FindPassword() {
        this.$router.push({path: '/teacher/FindPassword'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .login_head {
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

  .table0 {
    width: 30%;
    margin: auto;
  }

  @media (max-width: 640px) {
    .table0 {
      width: 100%;
    }
  }

  .td0 {
    width: 100%;
    height: 45px;


  }

  .btn {
    height: 36px;
    width: 100%;
    border: none;
    background-color: #66CCCC;
  }

  .find_pass {
    float: right;
    font-size: 12px;
    text-decoration: none;
  }

  .footer {
    position: fixed;
    height: 60px;
    width: 100%;
    bottom: 5px;
  }

  .footer p {
    text-align: center;
    line-height: 60px;
    color: black;
    font-size: 12px;
  }


</style>
