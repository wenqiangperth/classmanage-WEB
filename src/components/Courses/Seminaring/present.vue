<template>
    <div>
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
      <div class="title">
        {{SeminarTitle}}
      </div>
      <div class="Seminar">
        <el-tag style="font-size: larger" type="success">
          <i class="el-icon-loading"></i>
          {{order}}</el-tag>
      </div>
      <div class="divHeight"></div>

      <ul id="Files">
        <li v-for="item in items">
          <i class="el-icon-star-on"></i>
          {{item.message}}
        </li>
      </ul>

      <div class="question">
      <a @click="open">Q & A</a>
    </div>


  </div>
</template>

<script>
    export default {
        name: "present",
      data(){
        return{
          SeminarTitle: '业务流程分析',
          order: '1-3',
          items: [
            {message:'1-1'},
            {message:'1-3'},
            {message:'1-5'},
            {message:'1-2'},
            {message:'1-6'},
            {message:'1-4'}
          ]
        }
      },
      created(){
          let that = this;
          that.$axios({
            method:'GET',
            url:'/seminar/seminarId/class/classId/presentation?status=present',
            headers:{
              'token':window.localStorage['token']
            }
          })
            .then(res=>{
              let data=res.data.data;
              that.order=data.order;
              that.items=data.item;
            })
            .catch(e=>{
              console.log(e)
            })
      },
      methods:{
          back(){
            this.$router.push({path:'/Courses/Seminaring/Seminaring'})
          },
         open() {
           this.$axios({
             method:'POST',
             url:'seminar/seminarId/class/classId/question',
             headers:{
               'token':window.localStorage['token']
             },
             data:{
               userId:window.localStorage['userId']
             }
           })
             .then(res=>{
               if(res.status===200){
                 //提问报名成功
                 let data=res.data.data;
                 this.account=data.account;
                 this.name=data.name;
                 this.$alert('请<br/><strong>{{this.name}}1-3: 赵四同学</strong>' +
                   '</br><strong>{{this.account}}24320162202825</strong></br>提问', '提问成功', {
                   confirmButtonText: '确定',
                   dangerouslyUseHTMLString: true,
                   type: 'success',
                   center: true,
                   callback: action => {
                     this.$message({
                       type: 'info',
                       message: `action: ${ action }`
                     });
                   }
                 })
               }
             })
             .catch()
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

  .title{
    margin: 20px 0 0 0;
    height: 20px;
    line-height: 20px;
    font-size: 24px;
    font-family: 华文琥珀;
    display: block;
    color: #66CCCC;

  }


  ul {
    text-align: center;
    font-size: 20px;
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

  .Seminar{
    float: right;
  }

  .question{
    display: block;
    width: 100%;
    margin: 30px 0 0 0;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background-color: #66CCCC;
    font-size: 19px;
    font-weight: bold;
    letter-spacing: 3px;
    border-radius: 25px;
  }
</style>
