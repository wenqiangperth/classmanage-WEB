<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD-讨论课</label>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-plus"></i>
            </span>
            <el-dropdown-menu class="el-dropDown" slot="dropdown">
              <el-dropdown-item command="per">
                <i class="el-icon-menu"></i>
                个人页
              </el-dropdown-item>
              <el-dropdown-item command="course">
                <i class="el-icon-star-on"></i>
                讨论课
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <div class="divHeight"></div>
      <!--
            <ul id="Files">
              <li v-for="(value,key) in items" >
                <a id="order">第{{key+1}}组：</a>
                <a id="info">{{value.message}}</a>
              </li>
            </ul>
       -->
      <ul id="Files">
        <li>
          <a>第1组：</a>
          <a>1-1 </a>
        </li>
        <li>
          <a>第2组：</a>
          <a style="color: #66CCCC;text-decoration: underline" @click="open">可报名</a>
        </li>
        <li>
          <a>第3组：</a>
          <a style="color: #66CCCC;text-decoration: underline" @click="open">可报名</a>
        </li>
        <li>
          <a>第4组：</a>
          <a>1-5</a>
        </li>
        <li>
          <a>第5组：</a>
          <a style="color: #66CCCC;text-decoration: underline" @click="open">可报名</a>
        </li>
        <li>
          <a>第6组：</a>
          <a>1-7</a>
        </li>
      </ul>

      <div class="cancel">
        <a @click="open2">取消报名</a>
      </div>

    </div>
</template>

<script>
    export default {
        name: "ChangeSign2",
      methods:{
          back(){
            this.$router.push({path:'/Courses/BeforeSeminar/ChangeSign'});
          },
        open() {
            this.$confirm('确认报名?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '报名成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消报名'
              });
            });
        },
        open2() {
          this.$confirm('确认取消报名?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '取消报名成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消报名失败！'
            });
          });
        }
      }
    }
</script>

<style scoped>
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #CCFF99;
    border-radius: 5px;
  }

  .el-icon-arrow-left{
    transform: translateX(-380%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(250%);
  }
  .el-dropDown{
    transform: translateX(70%);
  }

  .divHeight{
    display: block;
    color: #fff;
    height: 50px;
  }

  ul {
    font-size: 20px;
    text-align: center;
  }

  ul,li{
    list-style-type: none;
    margin: 0;
    padding: 0;
    line-height: 60px;
  }

  ul li:nth-child(odd){
    background: #F0F0F0;
  }

  .cancel{
    display: block;
    margin: 30px 15px 0 15px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background-color: red;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: 3px;
    border-radius: 25px;
  }
</style>
