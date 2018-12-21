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

    <ul id="Files">
      <li v-for="(value,key) in items" @click="open2(key)">
        <a>第{{key+1}}组：</a>
        <i class="el-icon-document"></i>
        {{value.message}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "download",
    data(){
      return {
        attendanceId:'',
        items:[
          {message: '1-1'},
          {message: '1-2'},
          {message: '1-3'},
          {message: '1-4'},
          {message: '1-5'},
          {message: '1-6'}
        ]}
    },
    created(){
      let that = this;
      //先获取展示的Id,展示顺序

      that.$axios({
        method:'GET',
        url:'/attendance/attendanceId/report',
        params:{
          attendanceId: that.attendanceId
        }
      })
        .then(res=>{
          if(res.data.status===200){
            let data = res.data.data;
            that.items=data.order; //需要返回此次讨论课的展示顺序和对应ID
          }
        })
        .catch(e=>{
          console.log(e)
        })
    },
    methods:{
      back(){
        this.$router.push({path:'/Courses/AfterSeminar/SeminarInfo'})
      },
      open2(key) {
        let that = this;
        console.log(key);

        this.$confirm('确定下载?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            that.$axios({
              method:'GET',
              url:'/attendance/attendanceId/report',
              params:{
                attendanceId:key
              }
            })
              .then(res=>{
                if(res.data.status===200){
                  //返回文件成功
                  this.$message({
                    type: 'success',
                    message: '下载成功!'
                  });
                }
              })
              .catch(e=>{
                console.log(e)
              })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下载'
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

  .el-icon-document{
    font-size: 20px;
  }

  ul {
    text-align: left;
    font-size: 20px;
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
