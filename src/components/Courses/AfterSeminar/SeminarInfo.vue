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
      <div>
        <img src="../../../assets/2.jpg" style="border-radius: 50px"/>
      </div>

      <div style="opacity: 0.85">
        <div class="intro"
             style="height: 50px; background-color: #F0F0F0; display: block">
          <label style="text-align: left; line-height: 50px">
            轮次：
          </label>
          <label style="text-align: center">
            第{{order}}轮
          </label>
        </div>

        <div class="intro"
             style="height: 50px; background-color: #fff; display: block">
          <label style="text-align: left; line-height: 50px">
            主题：
          </label>
          <label style="text-align: center">
            {{topic}}
          </label>
        </div>

        <!--<div class="intro"-->
             <!--style="height: 50px; background-color: #F0F0F0; display: block">-->
          <!--<label style="text-align: left; line-height: 50px">-->
            <!--介绍：-->
          <!--</label>-->
          <!--<a style="text-align: center;" @click="check">-->
            <!--{{intro}}-->
          <!--</a>-->
        <!--</div>-->

        <div class="intro"
             style="height: 50px; background-color: #f0f0f0; display: block">
          <label style="text-align: left; line-height: 50px">
            课次序号：
          </label>
          <label style="text-align: center">
            第{{seminarSerial}}次
          </label>
        </div>

        <div class="intro"
             style="height: 50px; background-color: #fff; display: block">
          <label style="text-align: left; line-height: 50px">
            课程情况：
          </label>
          <label style="text-align: center; color: #5CACEE">
            已完成
          </label>
        </div>

        <div class="intro"
             style="height: 50px; background-color: #f0f0f0; display: block">
          <label style="text-align: left; line-height: 50px">
            讨论课材料：
          </label>
          <a style="text-align: center; color: #66CCCC;text-decoration: underline" @click="check">
            查看信息
          </a>
        </div>
        <el-button @click="openIntro" style="width:100%; height: 50px;text-decoration: underline">点此查看讨论课介绍</el-button>
      </div>
      <div style="height: 250px;"></div>
    </div>
</template>

<script>
    export default {
        name: "SeminarInfo",
      data(){
        return {
          seminarId:'',
          courseId:'',
          courseName:'',
          klassId:'',
          intro:'',
          order:'',
          topic:'',
          teamNumLimit:'',
          seminarSerial:'',
          note:{
            backgroundImage:"url("+require("../../../assets/backpic.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          }
        }
      },
      created(){
        let that=this;
        that.courseId=that.$route.query.courseId;
        that.courseName=that.$route.query.courseName;
        that.klassId=that.$route.query.klassId;
        //在此处需要先接收上个页面传入的seminarId
        this.seminarId=this.$route.query.seminarId;
        this.$axios({
          method:'GET',
          url:'/seminar/'+this.seminarId,
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              this.order=res.data.roundSerial;
              this.topic=res.data.seminarName;
              this.teamNumLimit=res.data.teamNumLimit;
              this.seminarSerial=res.data.seminarSerial;
              this.intro=res.data.introduction;
            }
          })
          .catch(e=>{
            console.log(e)
          })
      },
      methods:{
          back(){
            this.$router.push({
              path:'/Courses/TotalSeminars',
              name:'TotalSeminars',
              query:{
                courseId: this.courseId,
                courseName: this.courseName,
                klassId: this.klassId
              }
            })
          },
        check(){
            this.$router.push({
              path:'/Courses/AfterSeminar/CheckInfo',
              name:'CheckInfo',
              query:{
                seminarId: this.seminarId,
                courseId: this.courseId,
                courseName: this.courseName,
                klassId: this.klassId
              }
            })
        },
        openIntro(){
          const h = this.$createElement;
          this.$notify({
            title: '讨论课介绍',
            message: h('i', { style: 'color: teal'}, this.intro),
            duration:7000
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
    height: 20px;
    display: block;
    color: #fff;
  }

</style>
