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
        <el-form-item label="e-mail:">
          <el-input placeholder="填写邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码:">
          <el-input placeholder="填写验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn1" type="info" plain
          >立即验证
          </el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button class="btn" type="success" @click="returnAccountManage" plain>确认修改</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "EditEmail",
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
      }
    }
  }
</script>

<style scoped>
  .btn1 {
    float: right;
  }

  .footer {
    width: 100%;
    margin-top: 190px;
  }

</style>
