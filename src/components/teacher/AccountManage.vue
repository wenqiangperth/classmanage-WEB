<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnHomePage"></i>账户与设置
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="gotoHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-service" @click="gotoSeminar"></i>&nbsp;&nbsp;讨论课</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-back" @click="returnLogin"></i>&nbsp;&nbsp;退 出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="main">
      <div style="width:100%;height:25px"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="姓名">
          <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="教工号">
          <el-input v-model="formLabelAlign.account" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formLabelAlign.email">
            <i slot="suffix" class="el-input__icon el-icon-edit icon0" @click="editEmail"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="账户密码">
          <el-input v-model="formLabelAlign.password" type="password" id="pass">
            <i slot="suffix" class="el-input__icon el-icon-edit icon0" @click="editPassword"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button class="btn" type="success" @click="returnHomePage" plain>确认修改</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "AccountManage",
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '邱老师',
          account: '123456789',
          email: '12345678@xmu.edu.cn',
          password: '111111',
          interval: '',
          isShow: false
        }
      }
    },
    methods: {
      returnHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      showPassword() {
        this.isShow = !this.isShow;
        var pass = document.getElementById("pass");
        if (this.isShow) {
          pass.type = "text";
        } else {
          pass.type = "password";
        }
      },
      returnLogin() {
        this.$router.push({path: '/'});
      },
      gotoSeminar() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      editPassword() {
        this.$router.push({path: '/teacher/EditPassword'})
      },
      editEmail() {
        this.$router.push({path: '/teacher/EditEmail'});
      }
    }
  }
</script>

<style scoped>

  .footer {
    width: 100%;
    margin-top: 80px;
  }

</style>
