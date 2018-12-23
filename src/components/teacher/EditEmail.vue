<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnAccountManage"></i>账户邮箱
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
      <el-form label-width="80px">
        <el-form-item></el-form-item>
        <el-form-item label="新e-mail:">
          <el-tooltip class="item" effect="dark" content="邮箱格式如：user@host.domainnames" placement="bottom">
            <el-input v-model="email" placeholder="填写新邮箱">
            </el-input>
          </el-tooltip>
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
        email: ''
      }
    },
    methods: {
      returnLogin() {
        this.$router.push({path: '/'});
      },
      returnAccountManage() {
        this.$router.push({path: '/teacher/AccountManage'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      gotoHomePage(){
        this.$router.push({path:'/teacher/HomePage'});
      },
      Confirm() {
        this.$axios({
          method: 'PUT',
          url: 'user/email',
          params: {
            email: this.email
          }
        })
          .then(res => {
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.$router.push({path: '/teacher/AccountManage'});
            } else if (res.data.status === 400) {
              this.$message({
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
