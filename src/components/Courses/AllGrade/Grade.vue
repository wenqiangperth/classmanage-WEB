<template>
  <div>
    <header class="home-title">
      <div class="homeTitle">
        <i class="el-icon-arrow-left" @click="back"></i>
        <label>OOAD </label>
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
    <div class="pic">
      <img src="../../../assets/2.jpg">
    </div>

    <div class="main">
      <el-collapse>
        <el-collapse-item v-for="(rounds,index) in courses"
                          :key="index">
          <template slot="title">
            <div style="font-weight: bold; font-size: 15px;font-family: 微软雅黑">
              <i class="iconfont icon-chengjiguanli"></i>
              {{rounds.name}}
            </div>
          </template>
          <div style="width: 100%">
            <div v-for="seminar in rounds.item">
              <el-button class="btn" type="info" plain @click="dialogTableVisible = true">
                <i class="el-icon-document"></i>
                {{seminar}}
              </el-button>
            </div>
            <!--<div>-->
              <!--<el-button class="btn" type="info" plain >-->
                <!--<i class="iconfont icon-zudui"></i>-->
                <!--{{items.item[1]}}-->
              <!--</el-button>-->
            <!--</div>-->
            <!--<div>-->
              <!--<el-button class="btn" type="info" plain >-->
                <!--<i class="iconfont icon-xinxi"></i>-->
                <!--{{items.item[2]}}-->
              <!--</el-button>-->
            <!--</div>-->
          </div>
        </el-collapse-item>
      </el-collapse>
      <div>
        <el-dialog
          title="成绩"
          :visible.sync="dialogTableVisible"
          width="90%">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="项目"
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              label="成绩"
              width="180"
              align="center">
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>

    </div>

  </div>
</template>

<script>
    export default {
      name: "Grade",
      data() {
        return {
          grade:'3.3333',
          tableData: [{
            date: 'ppt',
            name: '5.0'
          }, {
            date: '书面报告',
            name: '4.5'
          }, {
            date: '提问',
            name: '5.0'
          }, {
            date: '总成绩',
            name: '4.8'
          }],
          courses: [
            {
              name: '第一轮',
              item: [
                '业务流程分析',
                '领域模型设计',
                'myBatis'
              ]
            },
            {
              name: '第二轮',
              item: [
                '代码检查',
                '对象模型设计',
                '用例分析'
              ]
            }
          ],
          dialogTableVisible: false
        };
      },
      created(){
        //根据roundId获得队伍轮次的成绩
        this.$axios({
          method:'GET',
          url:'round/'+this.$data.roundId+'/team/'+this.$data.teamId+'/roundscore',
        })
          .then(res=>{
            if(res.status===200){

            }
          })
          .catch(e=>{
            console.log(e);
          })

        //按讨论课ID查找队伍讨论课的成绩
        this.$axios({
          method:'GET',
          url:'seminar/'+this.$data.seminarId+'/team/'+this.$data.teamId+'/seminarscore'
        })
          .then(res=>{
            if(res.status===200){

            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      methods: {
        handleCommand(command) {
          if (command === "course")
            this.$router.push({
              path: '/Courses/CoursePage'
            })
        },
        back(){
          this.$router.push({path:'/Courses/MyCourse'})
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
    opacity: 0.8;
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

  .pic img{
    margin: 20px 0 15px 0;
    border-radius: 50px;
  }

  .btn {
    width: 100%;
    background-color: #66CCCC;
    color: #fff;
    font-size: 16px;
  }
</style>
