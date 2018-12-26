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
      <div class="main" style="opacity: 0.85;">
        <el-form style="margin-top: 30px" :inline="true" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="小组名" prop="name" >
            <el-input v-model="name" placeholder="untitled"></el-input>
          </el-form-item>
          <el-form-item label="选择班级" prop="region">
            <el-select v-model="classId" placeholder="2016-1">
              <el-option v-for="klass in classInfo"
                         :label="klass.grade+'-'+klass.klassSerial"
                         :value="klass.id">

              </el-option>

            </el-select>
          </el-form-item>

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
        </el-form>

        <div class="login-input">
          <a @click="submitForm('ruleForm')">确认提交</a>
        </div>
      </div>
      <div style="height: 200px;"></div>
    </div>
</template>

<script>
    export default {
        name: "MakeTeam",
      data() {
        return {
          name:'',
          courseId:'',
          classId:'',
          leader:[{id:'',name:''}],
          members: [{id:'',studentName:''}],
          student:'',
          classInfo:'',
          ruleForm: {
            name: '',
            classId: '',
            members:[]
          },
          rules: {
            name: [
              { required: true, message: '请输入小组名', trigger: 'blur' },
              { min: 3, message: '长度不能小于三个字符', trigger: 'blur' }
            ],
            classId: [
              { required: true, message: '班级名不能为空', trigger: 'change' }
            ]
          },
          Unteam:[],       //未组队学生学号、姓名
          note:{
            backgroundImage:"url("+require("../../../assets/backpic.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          },
          i:0,
        };
      },
      created(){
          //query获得上一页面的courseId
          let that = this;
          that.courseId = that.$route.query.courseId;
          console.log(that.courseId);
          that.$axios({
            method:'GET',
            url:'/course/'+that.courseId+'/noTeam',
            headers:{
              'Authorization':window.localStorage['token']
            }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                window.localStorage['token']=res.headers.authorization;
                this.Unteam=res.data;
              }
            })
            .catch(e=>{console.log(e)})

          that.$axios({
            method:'GET',
            url:'/course/'+that.courseId+'/class',
            headers:{
              'Authorization':window.localStorage['token']
            }
          })
            .then(res=>{
              console.log(res);
              if(res.status===200){
                this.classInfo=res.data;
              }
            })
            .catch(e=>{
              console.log(e);
            })

        //获得创建小组人的信息（组长）
          that.$axios({
            method:'GET',
            url:'/user/information',
            headers:{
              'Authorization': window.localStorage['token']
            }
          }).then(res=>{
            console.log(res);
            if(res.status===200){
              this.leader.id=res.data.id;
              this.leader.name=res.data.name;
            }
          }).catch(e=>{console.log(e)})
      },
      methods:{
          back(){
            this.$router.push({
              path:'/Courses/MyTeam/TeamInfo',
              name:'TeamInfo',
              query:{
                courseId: this.courseId
              }
            })
          },
          submitForm(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
            this.$axios({
              method:'POST',
              url:'course/'+this.$data.courseId+'/class/'+this.$data.classId+'/team',
              headers:{
                'Authorization':window.localStorage['token']
              },
              data:{
                name:this.name,
                courseId:this.courseId,
                classId:this.classId,
                leader:this.leader,
                members:this.members,
              }
            })
              .then(res=>{
                console.log(res);
                if(res.status===200){
                  this.$message({
                    type:'success',
                    message:'创建小组成功！'
                  })
                }
                else{
                  alert("创建失败！请重新创建！");
                }
              })
              .catch(e=>{
                console.log(e)
              })
          },
          searchStu(){
            let that=this;
            let j=0;
            let tableData=that.Unteam;
            for(let i in tableData){
              if(tableData[i].account===that.student||tableData[i].studentName===that.student){
                that.Unteam=[];
                that.Unteam[j++]=tableData[i];
              }
            }
            if(that.student==='')
              that.Unteam = that.Unteam;
          },

        handleEdit(index, row){
          console.log(row.id);
          if(this.i>5){
            this.$message({
              type:'error',
              message:'小组人数不得超过6人！'
            })
          }
          if(this.i<=5){
            this.$confirm('确定添加'+row.studentName, '提示', {
              confirmButtonText: '取消',
              cancelButtonText: '确定',
              type: 'warning',
              center: true
            }).then(() => {
              this.$message({
                type: 'info',
                message: '已取消添加!'
              });
            }).catch(() => {
              this.$message({
                type: 'success',
                message: '添加成功'
              });
              this.members[this.i].id=row.id;
              this.members[this.i].studentName=row.studentName;
              this.i=this.i+1;
              console.log('看这里'+this.i);
              console.log('组员：')
              console.log(this.members);
            });
          }
        },

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

  .search button{
    color: #66cccc;
  }
</style>
