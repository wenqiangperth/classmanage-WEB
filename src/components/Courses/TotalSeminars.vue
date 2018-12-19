<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left" @click="back"></i>
          <label>OOAD 2016(1)</label>
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
      <div>
        <img src="../../assets/user.png" style="border-radius: 50px">
      </div>

      <div class="main">
        <el-collapse>
          <el-collapse-item v-for="(items,index) in courses"
                            :key="index">
            <template slot="title">
              <div style="font-weight: bold; font-size: 15px;font-family: 微软雅黑">
                &nbsp;&nbsp;<i class="iconfont icon-kecheng"></i>&nbsp;&nbsp;
                {{items.order}}
              </div>
            </template>
            <div style="width: 100%">
              <div v-for="cou in items.item">
                <el-button class="btn" type="info" plain  @click="AfterSeminar">
                  <i class="iconfont icon-chengjiguanli"></i>&nbsp;&nbsp;
                  {{cou}}
                </el-button>
              </div>
              <!--
              <div>
                <el-button class="btn" type="info" plain @click="present">
                  <i class="iconfont icon-zudui"></i>&nbsp;&nbsp;
                  {{items.item[1]}}
                </el-button>
              </div>
              <div>
                <el-button class="btn" type="info" plain @click="BeforeSeminar">
                  <i class="iconfont icon-xinxi"></i>&nbsp;&nbsp;
                  {{items.item[2]}}
                </el-button>
              </div>
              -->
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

    </div>
</template>

<script>
    export default {
        name: "TotalSeminars",
      data() {
        return {
          courseId:'',
          roundId:'',
          courses: [
            {
              order: '第一轮',
              item: [
                '业务流程分析',
                '领域模型设计',
                'myBatis'
              ]
            }/*,
            {
              name: '第二轮',
              item: [
                '代码检查',
                '对象模型设计',
                '用例分析'
              ]
            }
          */
          ]
        };
      },
      created(){
        let that=this;
        that.courseId=that.$route.query.courseId;
        console.log("传过来的courseId  "+that.courseId);
        that.$axios({
          method:'GET',
          url:'/course/courseId/round',
          headers:{
            'token':window.localStorage['token']
          },
          params:{
            courseId:that.courseId
          }
        })
          .then(res=>{
            if(res.data.status===200){
              let i=0;
              that.courses[i++].order=res.data.data[i++].order;
            }
            else if(res.data.status===404){
              alert("未找到课程");
            }
            else{
              alert("错误的ID格式");
            }
          })
          .catch(e=>{
            console.log(e)
          })

        for(let j=0;j<that.courses.length;j++){
          that.roundId=that.courses[j].order;
          that.$axios({
            method:'GET',
            url:'/round/roundId/seminar',
            headers:{
              'token':window.localStorage['token']
            },
            params:{
              roundId:that.roundId
            }
          })
            .then(res=>{
              if(res.data.status===200){
                let m=0;
                that.courses[j].item[m++]=res.data.data[m++].topic;
              }
              else if(res.data.status===404){
                alert(j+"轮未找到讨论课");
              }
              else{
                alert("错误的ID格式");
              }
            })
            .catch(e=>{
              console.log(e)
            })
        }
        //检测courses有无成功得到轮次和轮次下的讨论课
        console.log(this.courses[0].item);
      },
      methods: {
        back(){
          this.$router.push({path:'/Courses/CoursePage'});
        },
        BeforeSeminar(){
          this.$router.push({path:'/Courses/BeforeSeminar/BeforeSeminar'});
        },
        present(){
          this.$router.push({path:'/Courses/Seminaring/Seminaring'});
        },
        AfterSeminar(){
          this.$router.push({path:'/Courses/AfterSeminar/SeminarInfo'})
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
    transform: translateX(200%);
  }
  .el-dropDown{
    transform: translateX(70%);
  }

  .btn {
    width: 100%;
    background-color: #66CCCC;
    color: #fff;
    font-size: 16px;
  }



</style>
