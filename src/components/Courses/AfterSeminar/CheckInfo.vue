<template>
  <div class="main" :style="note">
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

    <ul id="Files" style="opacity: 0.85">
      <li v-for="(team,key) in items">
        <a>第{{team.teamOrder}}组：</a>
        <i class="el-icon-document"></i>
        {{team.team.teamName}}
      </li>
    </ul>
    <div style="height: 280px;"></div>
  </div>
</template>

<script>
  export default {
    name: "download",
    data(){
      return {
        seminarId:'',
        attendanceId:'',
        items:[],
        note:{
          backgroundImage:"url("+require("../../../assets/cartoon1.jpg")+")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%"
        }
      }
    },
    created(){
      let that=this;
      that.seminarId=that.$route.query.seminarId;
      that.courseId=that.$route.query.courseId;
      that.courseName=that.$route.query.courseName;
      that.klassId=that.$route.query.klassId;

      that.$axios({
        method:'GET',
        url:'/seminar/'+that.seminarId+'/class/'+that.klassId+'/attendance',
        headers:{
          'Authorization':window.localStorage['token']
        }
      })
        .then(res=>{
          console.log(res);
          if(res.status===200){
            window.localStorage['token']=res.headers.authorization;
            that.items=res.data;            //需要返回此次讨论课的展示顺序和对应ID
          }
        })
        .catch(e=>{
          console.log(e)
        })
    },
    methods:{
      back(){
        this.$router.push({
          path:'/Courses/AfterSeminar/SeminarInfo',
          name:'SeminarInfo',
          query:{
            seminarId: this.seminarId,
            courseId: this.courseId,
            courseName: this.courseName,
            klassId: this.klassId
          }
        })
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
    background-color: #5CACEE;
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
    text-align: center;
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
