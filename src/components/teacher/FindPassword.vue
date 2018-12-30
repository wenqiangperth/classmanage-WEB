<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="Back"></i>找回密码</div>

    </div>
    <div class="main">
      <div style="width: 100%;height: 25px"></div>
      <table class="table0">
        <tr style="width: 100%">
          <td class="td0">
          <el-input class="input0" type="text" placeholder="学号/教工号" v-model="account"></el-input>
        </td></tr>

        <tr style="width: 100%">
          <td class="td0"></td>
        </tr>
        <tr style="width: 100%">
          <td class="td0"></td>
        </tr>
        <tr style="width: 100%">
          <td class="td0"><el-button class="btn" type="success" @click="SetPassword" plain>找回密码</el-button></td>
        </tr>
      </table>
    </div>


  </div>
</template>

<script>
    export default {
        name: "FindPassword",
      data() {
        return {
          account: ''
        }
      },
        methods:{
          SetPassword(){
            this.$axios({
              method: 'GET',
              url: '/user/password',
              params: {
                account: this.account
              }
            }).then(res => {
              if (res.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '密码已成功发送至邮箱'
                });
                this.$router.push({path: '/'});
              }
            }).catch(e => {
              console.log(e);
            })
            this.$router.push({path: '/teacher/SetPassword'})
          },
          Back() {
            this.$router.go(-1);
          }
        }
    }
</script>

<style scoped>


</style>
