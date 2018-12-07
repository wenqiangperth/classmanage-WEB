<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnAccountManage"></i>账户邮箱
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
      <el-form label-width="80px">
        <el-form-item></el-form-item>
        <el-form-item label="e-mail:">
          <el-input placeholder="填写邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码:">
          <el-input placeholder="填写验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" plain
                     style="background-color: #f8e9e9;border-color:#ff9999;color:#ff6666"
          >立即验证
          </el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button class="btn1" type="success" @click="returnAccountManage">确认修改</el-button>
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

  .icon0 {
    font-weight: bolder;
  }
  .plus {
    float: right;
    margin-right: 3%;
    line-height: 70px;
  }

  .btn {
    float: right;
  }

  .footer {
    width: 100%;
    margin-top: 190px;
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
</style>
