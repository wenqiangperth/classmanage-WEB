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

        <el-collapse >
          <el-collapse-item >
            <template slot="title">
              <div style="font-size: 17px"><i class="header-icon el-icon-search"></i>
                添加组员</div>
            </template>
            <div v-for="stu in Unteam" style="text-align: center;font-size: 16px;font-family: 微软雅黑;font-weight: bold;">
              <el-checkbox  name="type">{{stu.Na}}——{{stu.No}}</el-checkbox>
              <div class="line"/>
            </div>
          </el-collapse-item>
        </el-collapse>

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

  .line{
    height: 1px;
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
