<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD </label>
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

      <el-collapse v-model="activeName" class="team" accordion>
        <el-collapse-item v-for="item in teams">
          <template slot="title">
            <div style="font-size: 17px"><i class="header-icon el-icon-search"></i>
               {{item.title}}   {{item.name}}</div>
          </template>
          <div style="text-align: left;font-size: 16px;font-family: 幼圆">
            <div style="background-color: #66cccc;font-weight: bold">组长：{{item.leader.Na}}——{{item.leader.No}}</div>
            <div v-for="mem in item.member">组员：{{mem.Na}}——{{mem.No}}</div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div class="pic"><img style="border-radius: 50px" src="../../../assets/1.jpg"></div>

      <el-collapse v-model="activeName2">
        <el-collapse-item>
          <template slot="title">
            <div style="font-size: 17px"><i class="header-icon el-icon-search"></i>
              未组队学生</div>
          </template>
          <div v-for="ren in Unteam" style="text-align: left;font-size: 16px;font-family: 幼圆">
            {{ren.Na}}——{{ren.No}}
            <div class="line"/>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div class="login-input">
        <a @click="MakeTeam">创建小组</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TeamInfo",
      data(){
        return{
          courseId:'',
          activeName: '1',
          activeName2: '2',
          teams:[{
            title: '1-1',
            name: 'HHHA',
            leader: {Na:'直线',No:'24320162201111'},
            member: [{Na:'赵四',No:'24320262209999'},
              {Na:'五强',No:'24320162209980'}]
          },{
            title: '2-2',
            name: 'W3C',
            leader: {Na:'射线',No:'24320162202222'},
            member: [{Na:'赵强',No:'24320262209999'},
              {Na:'华融',No:'24320162209980'},
              {Na:'cilil',No:'24320176668290'}]
          },{
            title: '3-2',
            name: 'HelloWorld',
            leader: {Na:'小宝',No:'24320162200000'},
            member: [{Na:'三鹿',No:'24320262209119'},
              {Na:'初年',No:'24320162200890'},
              {Na:'lilzoo',No:'24320176663333'}]
          }],
          Unteam:[{
            Na: '我是1号',
            No: '11111111111'
          },{
            Na: '我是2号',
            No: '22222222222'
          },{
            Na: '我是3号',
            No: '33333333333'
          },{
            Na: '我是4号',
            No: '44444444444'
          }]
        };
      },
      created(){
          let that = this;
          that.$axios({
            methos:'GET',
            url:'course/courseId/team',
            params:{
              courseId: that.courseId
            }
          })
            .then(res=>{
              if(res.data.status===200){
                let data=res.data;
                console.log(data);
                that.teams = data.team;
              }
              else if(res.data.status===404){
                alert("未找到未组队学生！")
              }
            })
            .catch(e=>{
              console.log(e)
            })

          that.$axios({
            method:'GET',
            url:'course/courseId/noTeam',
            params:{
              courseId: that.courseId
            }
          })
            .then(res=>{
              if(res.data.status===200){
                let data=res.data;
                console.log(data);
                that.Unteam = data.noTeam;
              }
              else if(res.data.status===404){
                alert("未找到未组队学生！")
              }
            })
            .catch(e=>{
              console.log(e)
            })
      },
      methods:{
          back(){
            this.$router.push({path:'/Courses/MyCourse'})
          },
          MakeTeam(){
            this.$router.push({path:'/Courses/MyTeam/MakeTeam'})
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
    transform: translateX(-500%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(340%);
  }
  .el-dropDown{
    transform: translateX(90%);
  }

  .pic{
    margin: 10px 0 10px 0;
  }

  .line{
    height: 2px;
    background-color: #66cccc;
  }

  .login-input{
    margin:40px 30px 15px 30px;
    border:1px solid #66CCCC;
    border-radius:25px;
  }

  .login-input a{
    display: block;
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 17px;
    letter-spacing: 5px;
    border-radius: 25px;
  }
</style>
