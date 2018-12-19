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
      <div style="height: 20px;background-color: #fff"></div>

      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="小组名" prop="name" >
          <el-input v-model="ruleForm.name" placeholder="untitled"></el-input>
        </el-form-item>
        <el-form-item label="选择班级" prop="region">
          <el-select v-model="ruleForm.region" placeholder="2016-（1）">
            <el-option label="2016-（1）" value="2016-（1）"></el-option>
            <el-option label="2016-（2）" value="2016-（2）"></el-option>
            <el-option label="2016-（3）" value="2016-（3）"></el-option>
            <el-option label="2016-（4）" value="2016-（4）"></el-option>
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
                <el-checkbox text-color="red"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="Na"
              label="姓名"
              width="130">
            </el-table-column>
            <el-table-column
              prop="No"
              label="学号"
              width="130">
            </el-table-column>
          </el-table>
        </template>
        <el-pagination
          layout="prev, pager, next"
          :total="100">
        </el-pagination>

      </el-form>

      <div class="login-input">
        <a @click="submitForm('ruleForm')">确认提交</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "MakeTeam",
      data() {
        return {
          student:'',
          ruleForm: {
            name: '',
            region: '',
            type:[]
          },
          rules: {
            name: [
              { required: true, message: '请输入小组名', trigger: 'blur' },
              { min: 3, message: '长度不能小于三个字符', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '班级名不能为空', trigger: 'change' }
            ]
          },
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
          },{
            Na: '我是5号',
            No: '44444444444'
          },{
            Na: '我是6号',
            No: '44444444444'
          }]
        };
      },
      methods:{
          back(){
            this.$router.push({path:'/Courses/MyTeam/TeamInfo'})
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
          },
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
