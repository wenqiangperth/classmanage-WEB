<template>
    <div :style="note">
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD-讨论课</label>
          <el-dropdown trigger="click">
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
      <div class="main" style="opacity: 0.85">
          <el-tag >本次最大报名组数：{{maxTeam}}</el-tag>
          <ul id="Files">
            <!--<li v-for="(num,index) in maxTeam">-->
            <!--<a>第{{num}}组 <i class="el-icon-caret-right"></i></a>-->
            <!--<a v-for="team in seminarInfo">-->
            <!--<a v-if="team.teamOrder===num">-->
            <!--<i class="el-icon-document"></i>-->
            <!--{{team.team.teamName}}:-->
            <!--<a v-if="team.pptName!==null" style="text-decoration: underline;color: #5CACEE;">-->
            <!--{{team.pptName}}-->
            <!--</a>-->
            <!--<a v-else>-->
            <!--未提交-->
            <!--</a>-->
            <!--</a>-->
            <!--<a v-else>可报名</a>-->
            <!--</a>-->
            <!--</li>-->
            <li v-for="(team,index) in seminarInfo">
              <a>第{{team.teamOrder}}组 <i class="el-icon-caret-right"></i></a>
              {{team.team.teamName}}
              <a v-if="team.pptName!==null" style="text-decoration: underline;color: #5CACEE;">
                {{team.pptName}}.ppt
              </a>
              <a v-else>
                未提交
              </a>
            </li>
          </ul>

        <div class="cancel" style="background-color: red;">
          <a @click="delete2">取消报名</a>
        </div>
        <!--<div class="cancel" style="background-color: #5CACEE;">-->
          <!--<a @click="sign">修改报名</a>-->
        <!--</div>-->
      </div>
      <div style="height: 200px;"></div>
    </div>
</template>

<script>
    export default {
        name: "ChangeSign2",
      data(){
          return{
            seminarId:'',
            courseId:'',
            courseName:'',
            klassId:'',
            teamId:'',
            maxTeam:'',
            seminarInfo:[],
            attendanceId:'',
            note:{
              backgroundImage:"url("+require("../../../assets/backpic.jpg")+")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%"
            },
          }
      },
      created(){
        let that = this;
        that.seminarId=that.$route.query.seminarId;
        that.courseId=that.$route.query.courseId;
        that.courseName=that.$route.query.courseName;
        that.klassId=that.$route.query.klassId;
        that.teamId=that.$route.query.teamId;
        that.$axios({
          method:'GET',
          url:'/seminar/'+that.seminarId+'/class/'+that.klassId+'/attendance',
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log('这里有attendanceId?');
            console.log(res);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              this.seminarInfo=res.data;

              for(let i=0;i<this.seminarInfo.length;i++){
                if(this.teamId===this.seminarInfo[i].teamId)
                  this.attendanceId=this.seminarInfo[i].id;
              }
              console.log('attendanec为'+this.attendanceId);
              if(that.maxTeam===res.data.length){
                this.$message({
                  type:'warning',
                  message:'当前讨论课已报满'
                })
              }
            }
          })
          .catch(e=>{
            console.log(e);
          });

        that.$axios({
          method:'GET',
          url:'/seminar/'+that.seminarId,
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              that.maxTeam=res.data.maxTeam;
            }
          })
          .catch(e=>{
            console.log(e)
          })
      },
      methods:{
        back(){
            this.$router.push({
              path:'/Courses/BeforeSeminar/ChangeSign',
              name:'ChangeSign',
              query:{
                seminarId:this.seminarId,
                courseId: this.courseId,
                courseName: this.courseName,
                klassId: this.klassId
              }
            });
          },
        sign(){
          if(this.maxTeam===this.seminarInfo.length){
            this.$message({
              type:'error',
              message:'该次讨论课已报满，无法进行修改报名操作！！！'
            })
          }else{
            this.$prompt('请输入修改后的展示顺序', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPlaceholder:'请输入未被报名的展示顺序',
              center:true,
              inputValidator: (value)=>{
                if((value<=this.maxTeam&&value>0&&(value%1===0))||value==='')
                  return true;
                else return false},
            }).then(({ value }) => {
              let teamOrder=value;
              this.$axios({
                method:'POST',
                url:'/seminar/'+this.$data.seminarId+'/class/'+this.$data.klassId+'/attendance',
                headers:{
                  'Authorization':window.localStorage['token']
                },
                data:{
                  teamOrder: teamOrder,
                }
              })
                .then(res=>{
                  console.log(res);
                  if(res.status===200){
                    this.$message({
                      type: 'success',
                      message: '你的展示顺序: ' + value
                    });
                    this.$router.push({
                      path:'/Courses/TotalSeminars',    //报名成功进入可修改报名界面
                      name:'TotalSeminars',
                      query:{
                        seminarId:this.seminarId,
                        courseId: this.courseId,
                        courseName: this.courseName,
                        klassId: this.klassId
                      }
                    })
                  }
                  else{
                    this.$message({
                      type:'error',
                      message:'报名失败，请重新修改您的报名顺序'
                    })
                  }
                })
                .catch(e=>{
                  console.log(e);
                })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });
            });
          }

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
        delete2() {
          this.$confirm('确认取消报名?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center:true,
          }).then(() => {
            //首先获得attendanceId????????????????????????????????????????????????


            this.$axios({
              method:'DELETE',
              url:'/attendance/'+this.$data.attendanceId,
              headers:{
                'Authorization':window.localStorage['token']
              }
            })
              .then(res=>{
                console.log(res);
                if(res.status===200){
                  window.localStorage['token']=res.headers.authorization;
                  this.$message({
                    type: 'success',
                    message: '取消报名成功!'
                  });
                  this.$router.push({
                    path:'/Courses/TotalSeminars',    //报名成功进入可修改报名界面
                    name:'TotalSeminars',
                    query:{
                      seminarId:this.seminarId,
                      courseId: this.courseId,
                      courseName: this.courseName,
                      klassId: this.klassId
                    }
                  })
                }else if(res.status===403){
                  this.$message({
                    type: 'error',
                    message: '只能取消自己的报名!'
                  });
                }else{
                  this.$message({
                    type: 'error',
                    message: '不存在该报名!'
                  });
                }
              })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已放弃取消报名！'
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
    width:80%;
    display: block;
    margin: 30px auto;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: 3px;
    border-radius: 25px;
  }
</style>
