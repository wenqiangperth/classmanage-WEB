<template>
    <div :style="note">
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

      <div class="main" style="opacity: 0.8;">
        <el-tag type="success" style="font-size:16px;float: right;margin-bottom: 30px">
          {{tableData.klassSerial}}-{{tableData.teamSerial}}: {{tableData.teamName}}
        </el-tag>

        <el-tag type="success" style="width:100%;background-color: transparent;font-size: 18px">
          组长：{{leader.leaderName}}
        </el-tag>

        <template>
          <el-table
            :data="tableData.students"
            style="width: 100%;"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="index"
              width="100">
            </el-table-column>
            <el-table-column
              prop="studentName"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="account"
              label="学号"
              width="140">
            </el-table-column>
          </el-table>
        </template>

        <div class="withdraw">
          <el-button type="danger" @click="withdraw" plain>退出小组</el-button>
        </div>

      </div>
      <div style="height: 200px;"></div>
    </div>
</template>

<script>
    export default {
        name: "WithDraw",
      data(){
        return{
          teamId:'',
          courseId:'',
          klass: '2016-(1)',
          leader:[{leaderName:'',account:''}],
          tableData:[],
          note:{
            backgroundImage:"url("+require("../../../assets/sky.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          },
          userId:'',
        }
      },
      created(){
        // this.teamId=this.$route.query.teamId;
        this.courseId=this.$route.query.courseId;
        console.log(this.teamId);
        this.$axios({
          method:'GET',
          url:'course/'+this.courseId+'/myteam',
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
          console.log(res);
          if(res.status===200){
            this.tableData=res.data;
            this.checkLeader();
          }
        })
          .catch(e=>{
            console.log(e);
          })

        this.$axios({
          method:'GET',
          url:'/user/information',
          headers:{
            'Authorization':window.localStorage['token']
          }
        }).then(res=>{
          console.log(res);
          if(res.status===200){
            this.userId=res.data.id;
            console.log('userId为： '+this.userId);
          }
        }).catch(e=>{console.log(e);})
      },
      methods:{
          tableRowClassName({row,rowIndex}){
            if (rowIndex === 0) {
              return 'success-row';
            }
            return '';
          },
          withdraw() {
            console.log(this.userId);
            this.$confirm('确定退出小组, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.$axios({
                method:'PUT',
                url:'/team/'+this.$data.tableData.id+'/remove',
                headers:{
                  'Authorization':window.localStorage['token']
                },
                data:{
                  id:this.userId
                }
              }).then(res=>{
                console.log(res);
                if(res.status===200){
                  this.$message({
                    type: 'success',
                    message: '退出成功!'
                  });
                  this.$router.push({
                    path:'/Courses/MyTeam/TeamInfo',
                    query:{
                      courseId:this.courseId
                    }
                  });

                }else{
                  alert("退出失败，请重新尝试！")
                }
              })
                .catch(e=>{console.log(e)})
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已放弃退出'
              });
            });
          },
          back(){
            this.$router.push({
              path:'/Courses/MyTeam/TeamInfo',
              name:'TeamInfo',
              query:{
                courseId: this.courseId
              }
            })
          },
          checkLeader(){
            for(let i=0;i<this.tableData.students.length;i++){
              if(this.tableData.leaderId===this.tableData.students[i].id){
                this.leader.leaderName=this.tableData.students[i].studentName;
                this.leader.account=this.tableData.students[i].account;
              }
            }
            console.log(this.leader.leaderName);
          }
      }

    }
</script>

<style >
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #5CACEE;
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

  /*.el-table .success-row {*/
    /*background: #66cccc;*/
    /*border-radius: 3px;*/
  /*}*/

  .withdraw{
    margin: 40px 0 0 0;
    width: 100%;
  }
</style>
