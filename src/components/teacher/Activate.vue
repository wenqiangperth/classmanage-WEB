<template>
    <div id="activate">
      <div id="head" class="head">
        <div class="title"><i class="el-icon-back icon1 icon0" @click="returnLogin"></i>课堂管理系统登录</div>

      </div>
      <div class="main">
          <table class="table0">
            <tr><td class="td0"></td></tr>

            <tr><td class="td0">
              <div class="bottom">
                <el-tooltip class="item" effect="dark" content="可包含字母、数字、下划线，长度不少于6位" placement="bottom">
                  <el-input id="pass" type="password" placeholder="输入密码">
                    <i slot="suffix" class="el-input__icon el-icon-view icon2 icon0" @click="showPassword"></i>
                  </el-input>
                </el-tooltip>
              </div>
            </td></tr>
            <tr><td class="td0">
              <el-input id="pass2" type="password" placeholder="确认密码">
                <i slot="suffix" class="el-input__icon el-icon-view icon2 icon0" @click="showPassword2"></i>
              </el-input>
            </td></tr>
            <tr><td class="td0">
              <p>&nbsp;&nbsp;&nbsp;发送验证码: <a href="mailto:qiuming@qq.com">qiuming@qq.com</a></p>
            </td></tr>
            <tr><td class="td0">
              <el-input class="input0" placeholder="验证码"><el-button slot="append" type="danger" plain>发送验证码</el-button></el-input>
            </td></tr>
            <tr><td class="td0"></td></tr>
            <tr><td class="td0"></td></tr>
            <tr>
              <td class="td0"><el-button class="btn" type="success" @click="returnLogin">确认提交</el-button></td>
            </tr>
          </table>
      </div>



    </div>
</template>

<script>
    export default {
        name: "activate",
        data(){
          return{
            input: '',
            isShow1: false,
            isShow2: false
          }
        },
        methods:{
          returnLogin(){
            this.$router.push({path:'/'});
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
  .table0{
    width:50%;
    margin:auto;
  }

  .td0{
    width:100%;
    height:45px;
  }
  .td0 p{
    font-size: 12px;
  }
  .td0 a{
    text-decoration: none;
    color: #66CCCC;
  }
  .btn{
    height:36px;
    width:50%;
    border: none;
    background-color: #66CCCC;
    margin: auto;
  }
</style>
