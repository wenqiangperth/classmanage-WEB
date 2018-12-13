<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left"></i>
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

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>


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
      <div class="divHeight"></div>

      <el-row>
        <el-button type="danger">解散小组</el-button>
        <el-button type="primary">添加</el-button>
        <el-button type="success">保存</el-button>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "TeamManage",
      data(){
          return{
            student:'',
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
          }
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
  
  .search button{
    color: #66cccc;
  }

  .text {
    font-size: 14px;
  }

  .item {
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
  }

  .divHeight{
    display: block;
    height: 20px;
  }
</style>
