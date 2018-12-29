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
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{myTeam.klassSerial}}-{{myTeam.teamSerial}}:{{myTeam.teamName}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作</el-button>
          </div>
          <div style="font-weight: bold">组长：{{leader.name}}--{{leader.account}}</div>
          <div v-for="member in myTeam.students" class="text item">
            {{member.studentName}}--{{member.account}}
            <i style="float: right; color: red" class="el-icon-error" @click="dele(member.id)"></i>
          </div>
        </el-card>
        <div class="divHeight"></div>

        <div class="search">
          <el-input class="search-input" placeholder="输入学号/姓名" v-model="student"> <!--<i slot="prefix" class="iconfont icon-search" ></i>-->
            <el-button @click="searchStu" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <template>
          <el-table
            :data="Unteam"
            style="width: 100%">
            <el-table-column
              label="添加队友"
              fixed="left">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">添加</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="studentName"
              label="姓名"
              width="130">
            </el-table-column>
            <el-table-column
              prop="account"
              label="学号"
              width="130">
            </el-table-column>
          </el-table>
        </template>
        <div class="divHeight"></div>

        <el-row>
          <el-button type="danger" @click="dismiss">解散小组</el-button>
          <el-button type="warning" @click="dialogFormVisible = true">提交审核</el-button>
        </el-row>
        <el-dialog
          title="成组特例申请"
          :visible.sync="dialogFormVisible"
          width="90%">
          <el-form :model="form">
            <el-form-item label="申请理由:" :label-width="formLabelWidth">
              <el-input v-model="reason" autocomplete="off" placeholder="单行输入"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">cancel</el-button>
            <el-button type="primary" @click="validate">sure</el-button>
          </div>
        </el-dialog>
        <div class="divHeight"></div>
        <!--<el-row>-->
          <!--&lt;!&ndash;<el-button type="success">保存</el-button>&ndash;&gt;-->
        <!--</el-row>-->
        <div style="height: 50px"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TeamManage",
      data(){
          return{
            courseId:'',
            teamId:'',    //记录用户所在小组的teamId并传给后端
            myTeam:[],      //存放所有从后端传来的数据
            reason:'',    // 成组特例申请理由
            student:'',
            teamTitle:'1-1 武林盟主',
            leader:[] ,
            members:[],
            Unteam:[],
            dialogFormVisible: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '80px',
            note:{
              backgroundImage:"url("+require("../../../assets/sky.jpg")+")",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            },
          }
      },
      created(){
        let that = this;
        that.courseId=that.$route.query.courseId;

        that.$axios({
          method:'GET',
          url:'/course/'+that.courseId+'/noTeam',
          headers:{
            'Authorization':window.localStorage['token']
          }
        }).then(res=>{
            console.log(res);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              this.Unteam=res.data;
            }
          }).catch(e=>{console.log(e)});

        this.$axios({
          method:'GET',
          url:'/course/'+that.courseId+'/myteam',
          headers:{
            'Authorization':window.localStorage['token']
          }
        }).then(res=>{
            console.log(res);
            if(res.status===200){
              this.teamId=res.data.id;
              console.log('传来的teamId:'+this.teamId);
              that.$axios({
                method:'GET',
                url:'/team/'+this.teamId,
                headers:{
                  'Authorization': window.localStorage['token']
                }
              })
                .then(res=>{
                  console.log(res);
                  if(res.status===200){
                    that.myTeam=res.data;
                  }
                  else if(res.status===404){
                    alert("未找到！")
                  }
                })
                .catch(e=>{
                  console.log(e)
                })
            }
          }).catch(e=>{
            console.log(e);
          });

        that.$axios({
          method:'GET',
          url:'/user/information',
          headers:{
            'Authorization':window.localStorage['token']
          }
        }).then(res=>{
          console.log(res);
          if(res.status===200){
            this.leader=res.data;
          }
        });

      },
      methods:{
        searchStu(){
          let that=this;
          let j=0;
          let tableData=that.Unteam;
          for(let i in tableData){
            if(tableData[i].No===that.student||tableData[i].Na===that.student){
              that.Unteam=[];
              that.Unteam[j++]=tableData[i];
            }
          }
          if(that.student==='')
            that.Unteam = that.Unteam;
        },
        //删除组员
        dele(index){
          console.log('删除的是谁'+index);
          if(index===this.myTeam.leaderId){
            this.$message({
              type:'error',
              message:'组长无法执行自删除操作，可以选择解散小组。'
            })
          }
          else{
            this.$confirm('此操作将删除您的队友, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              width:'50%',
              type: 'warning',
              center: true
            }).then(() => {
              this.$axios({
                method:'PUT',
                url:'/team/'+this.$data.teamId+'/remove',
                headers:{
                  'Authorization':window.localStorage['token']
                },
                data:{
                  id:index
                }
              })
                .then(res=>{
                  console.log(res);
                  if(res.status===200){
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  }
                  else{
                    alert("删除失败！")
                  }
                })
                .catch(e=>{
                  console.log(e)
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        },
        // 提交审核
        validate(){
          this.$axios({
            method:'POST',
            url:'/team/'+this.$data.teamId+'/teamvalidrequest',
            headers:{
              'Authorization':window.localStorage['token']
            },
            data:{
              courseId: this.courseId,
              //classId: this.myTeam.klassId,
              teamId: this.teamId,
              //leaderId:this.leader.id,
              reason:this.reason,
            }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
               this.$message({
                 type:'success',
                 message:'您的申请已提交'
               })
              }else if(res.status===403){
                alert("用户权限不足");
              }else{
                alert("未找到该队伍");
              }
              this.dialogFormVisible=false;
            })
            .catch(e=>{
              console.log(e);
              this.dialogFormVisible=false;
            })
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
        handleEdit(index, row){
            console.log(row.id);
            this.$confirm('确定添加'+row.studentName, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.myTeam.students.length++;
              console.log('现在人数'+this.myTeam.students.length);
              if(this.myTeam.students.length<6||this.myTeam.students.length===6){
              //给后端发送请求，判断添加此人合不合法
                console.log('发给后端');
                this.$axios({
                  method:'PUT',
                  url:'/team/'+this.$data.teamId+'/add',
                  headers:{
                    'Authorization':window.localStorage['token']
                  },
                  data:{
                    id:row.id
                  }
                }).then((res)=>{
                  window.localStorage['token']=res.headers.authorization;
                  console.log(res);
                  if(res.status===200){

                  }
                })
                  .catch(e=>{
                    console.log(e);
                })
              }
              else if(this.myTeam.students.length===7){
                this.$message({type:'error', message:'组队人数不得超过6人！'});
                this.myTeam.students.length--;
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消添加'
              })
            })
        },
        dismiss(){
          this.$confirm('此操作将解散您的队伍, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            width:'50%',
            type: 'warning',
            center: true
          }).then(()=>{
            this.$axios({
            method:'DELETE',
            url:'/team/'+this.$data.teamId,
            headers:{
              'Authorization':window.localStorage['token']
            }
          }).then(res=>{
            console.log(res);
            window.localStorage['token']=res.headers.authorization;
            if(res.status===200){
              this.$message({type:'success',message:'解散小组成功！'})
              this.$router.push({
                path:'/Courses/MyTeam/TeamInfo',
                name:'TeamInfo',
                query:{
                  courseId: this.courseId
                }
              })
            }
          }).catch(e=>{console.log(e);})})

        },//解散小组
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
  
  .search button{
    color: #66cccc;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-top: 5px;
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    background-color: #66cccc;
  }

  .divHeight{
    display: block;
    height: 20px;
  }

</style>
