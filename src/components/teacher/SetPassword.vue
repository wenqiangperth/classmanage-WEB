<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnFindPassword"></i>密码设置</div>

    </div>
    <div class="main">
      <table class="table0">
        <tr>
          <td class="td0"></td>
        </tr>
        <tr><td class="td0">
          <div class="bottom">
            <el-tooltip class="item" effect="dark" content="可包含字母、数字、下划线，长度不少于6位" placement="bottom">
              <el-input class="input0" type="password" placeholder="输入密码" suffix-icon="el-icon-view"></el-input>
            </el-tooltip>
          </div>
        </td></tr>
        <tr><td class="td0">
          <el-input class="input0" type="password" placeholder="确认密码"></el-input>
        </td></tr>
        <tr>
          <td class="td0"></td>
        </tr>
        <tr>
          <td class="td0"></td>
        </tr>
        <tr>
          <td class="td0"><el-button class="btn" type="success" @click="Login" plain>确认提交</el-button></td>
        </tr>

      </table>
    </div>


  </div>
</template>

<script>
    export default {
      name: "SetPassword",
      methods:{
        returnFindPassword(){
          this.$router.push({path:'/teacher/FindPassword'});
        },
        Login(){
          this.$router.push({path:'/'});
        }
      }
    }
</script>

<style scoped>

</style>
