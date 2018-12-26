<template>
    <div class="main" :style="note">
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
      <div class="divHeight"></div>

      <div style="opacity: 0.85">
        <ul id="Files">
          <li v-for="(item,key) in items" @click="open2(key)">
            <a>第{{item.teamOrder}}组：</a>
            <a v-if="item.pptName!==null" style="text-decoration: underline;color: green;">
              <i class="el-icon-document"></i>
              {{item.pptName}}
            </a>
            <a v-else style="color: red;">
              未提交ppt
            </a>
          </li>
        </ul>
      </div>
      <div style="height: 100px;"></div>
    </div>
</template>

<script>
    export default {
        name: "download",
      data(){
        return {
          seminarId:'',
          courseId:'',
          courseName:'',
          klassId:'',
          items:[],
          note:{
            backgroundImage:"url("+require("../../../assets/cartoon1.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%"
          },
        }
      },
      created(){
        //得到上个页面的seminarId
        let that = this;
        that.seminarId=that.$route.query.seminarId;
        that.courseId=that.$route.query.courseId;
        that.courseName=that.$route.query.courseName;
        that.klassId=that.$route.query.klassId;
        that.$axios({
          method:'GET',
          url:'/seminar/'+that.seminarId+'/class/'+that.klassId+'/attendance',
          headers:{
            'Authorization':window.localStorage['token']
          }
        })
          .then(res=>{
            console.log(res.data);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              that.items=res.data;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      methods:{
          back(){
            this.$router.push({
              path:'/Courses/Seminaring/Seminaring',
              name:'Seminaring',
              query:{
                seminarId:this.seminarId,
                courseId: this.courseId,
                courseName: this.courseName,
                klassId: this.klassId
              }
            })
          },
         open2(index) {
           let attendanceId=this.items[index].id;  //展示的id
           this.$confirm('确定下载?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
             center: true
          }).then(() => {
            this.$axios({
              method: 'GET',
              url:'attendance/'+attendanceId+'/powerpoint',
              responseType:'blob',
              headers:{
                'Authorization':window.localStorage['token']
              }
            })
              .then(res=>{
                // if(!res) {return}
                // debugger;
                // let url = window.URL.createObjectURL(res.data);
                // let link = document.createElement('a');
                // link.style.display = 'none';
                // link.href = url;
                // link.setAttribute('download', 'powerpoint.pptx');
                // document.body.appendChild(link);
                // link.click();
                if(res.status===200){
                  let aTag=document.createElement('a');
                  let blob=new Blob([res.data],{type:""});
                  aTag.download=this.items[index].pptUrl;
                  aTag.href=URL.createObjectURL(blob);
                  aTag.click();
                  URL.revokeObjectURL(blob);
                  this.$message({
                    type: 'success',
                    message: '下载成功!'
                  });
                }
              });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下载'
            });
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

  .el-icon-document{
    font-size: 20px;
  }

  ul {
    text-align: left;
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
</style>
