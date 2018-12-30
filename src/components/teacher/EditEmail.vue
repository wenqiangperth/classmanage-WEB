<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnAccountManage"></i>账户邮箱
      </div>
    </div>
    <div class="main">
      <el-form label-width="80px">
        <el-form-item></el-form-item>
        <el-form-item label="新e-mail:">
          <el-input v-model="email" placeholder="填写新邮箱"></el-input>
        </el-form-item>
      </el-form>

      <div class="footer">
        <el-button class="btn" type="success" @click="Confirm" plain>确认修改</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "EditEmail",
    data() {
      return {
        email: '',
      }
    },
    methods: {

      returnAccountManage() {
        this.$router.push({path: '/teacher/AccountManage'});
      },
      Confirm() {
        let that=this;
        that.$axios({
          method: 'PUT',
          url: '/user/email',
          data: {
            email: that.email
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              that.$message({
                type: 'success',
                message: '修改成功！'
              });
              that.$router.push({
                path: '/teacher/AccountManage',
              });
            } else if (res.status === 400) {
              that.$message({
                type: 'error',
                message: '信息不合法！'
              });
            }
          })
          .catch(e => {
            console.log(e);
          })
      }
    }
  }
</script>

<style scoped>

  .footer {
    width: 100%;
    margin-top: 360px;
  }


</style>
