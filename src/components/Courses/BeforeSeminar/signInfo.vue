<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD-讨论课</label>
          <el-dropdown trigger="click" >
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
          <a>1-1 业务流程.ppt</a>
        </li>
        <li>
          <a>第2组：</a>
          <a style="color: red;">1-4 未提交</a>
        </li>
        <li>
          <a>第3组：</a>
          <a style="color: #66CCCC" @click="open">{{info}}</a>
        </li>
        <li>
          <a>第4组：</a>
          <a>1-7 业务流程</a>
        </li>
        <li>
          <a>第5组：</a>
          <a style="color: red">1-3 未提交</a>
        </li>
        <li>
          <a>第6组：</a>
          <a>1-2 业务流程.ppt</a>
        </li>
      </ul>

    </div>
</template>

<script>
    export default {
        name: "signInfo",
      data(){
          return {
            info: '可报名',
            items:[
              {message: '1-1 业务流程.ppt'},
              {message: '1-4 未提交'},
              {message: '可报名'},
              {message: '1-7 业务流程'},
              {message: '1-3 未提交'},
              {message: '1-2 业务流程.ppt'}
            ]
          }
      },
      methods:{
        open() {
          this.$confirm('确定报名?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$message({
              type: 'success',
              message: '报名成功!'
            });
            this.info = '1-5 未提交';
            this.$axios({
              method:'POST',
              url:'/seminar/seminarId/class/classId/presentation',
              data:{
                //传给后端报名的次序
                //order:this.index
              }
            })
              .then()
              .catch(e=>{
                console.log(e)
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消报名'
            });
            this.info = '可报名';
          });
        },
        back(){
          this.$router.push({path:'/Courses/BeforeSeminar/BeforeSeminar'});
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
    text-align: left;
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

</style>
