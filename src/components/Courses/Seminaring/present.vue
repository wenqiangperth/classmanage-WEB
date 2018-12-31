<template>
    <div >
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
      <div class="main" style="opacity: 0.85;">
        <div class="title">
          {{seminarName}}
        </div>
        <div >
          <el-tag style="font-size: larger;float: left" type="success" v-if="isShow===true">
            <i class="el-icon-loading" v-if="isShow===true"></i>
            <a>{{SeminaringInfo[index].team.teamName}}</a>
          </el-tag>
          <el-tag style="font-size: larger;float: right" type="info">
            <i class="el-icon-phone-outline"></i>
            当前已有{{questionNum}}人提问
          </el-tag>
        </div>
        <div class="divHeight"></div>

        <ul id="Files">
          <li v-for="item in SeminaringInfo">
            <i class="el-icon-star-on"></i>
            {{item.team.teamSerial}}:{{item.team.teamName}}
            <el-tag style="float: right">展示顺序：{{item.teamOrder}}</el-tag>
          </li>
        </ul>

        <div class="question">
          <a @click="open">Q & A</a>
        </div>

      </div>

  </div>
</template>

<script>
    export default {
        name: "present",
      data(){
        return{
          userId: 219,
          seminarId:'',
          courseId:'',
          courseName:'',
          klassId:'',
          seminarName:'',
          klassSeminarId: '',
          SeminaringInfo:[],
          teamId: '',
          ws: null,
          SeminarTitle: '业务流程分析',
          isShow: false,
          questionNum: 0,
          webserver: '',
          index: -1,
          note:{
            backgroundImage:"url("+require("../../../assets/sky.jpg")+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }
        }
      },
      created(){

          let that = this;
          that.seminarId=that.$route.query.seminarId;
          that.courseId=that.$route.query.courseId;
          that.courseName=that.$route.query.courseName;
          that.klassId=that.$route.query.klassId;
          that.seminarName=that.$route.query.seminarName;
          that.teamId = that.$route.query.teamId;
          that.klassSeminarId = that.$route.query.klassSeminarId;
          that.$axios({
            method:'GET',
            url:'/seminar/'+that.seminarId+'/class/'+that.klassId+'/attendance',
            headers:{
              'Authorization':window.localStorage['token']
            }
          })
            .then(res=>{
              console.log('获得所得所有attendance:');
              console.log(res);
              if(res.status===200){
                that.SeminaringInfo = res.data;
                for (let i = 0; i < that.SeminaringInfo.length; i++) {
                  if (that.SeminaringInfo[i].isPresent === 1)
                    that.index = i;
                }
                console.log('当前展示顺序index:' + that.index);
                that.$axios({
                  method: 'GET',
                  url: '/seminar/' + that.SeminaringInfo[0].klassSeminarId + '/attendance/' + that.SeminaringInfo[that.index].id + '/questionnumber',
                  headers: {
                    'Authorization': window.localStorage['token']
                  }
                }).then(res => {
                  window.localStorage['token'] = res.headers.authorization;
                  console.log("当前提问人数：");
                  console.log(res);
                  that.questionNum = res.data;
                }).catch(e => {
                  console.log(e)
                })
              }
            })
            .catch(e=>{
              console.log(e)
            });

        // this.$axios({
        //   method:'GET',
        //   url:'/course/'+this.courseId+'/myTeam',
        //   headers:{
        //     'Authorization':window.localStorage['token']
        //   }
        // })
        //   .then(res=>{
        //     console.log(res);
        //     if(res.status===200){
        //       this.teamId=res.data.id;
        //       console.log('传来的teamId'+this.teamId);
        //     }
        //   })
        //   .catch(e=>{
        //     console.log(e);
        //   })

        that.initWebSocket();
        console.log("teamId:" + this.teamId);
      },
      methods:{
        threadPoxi() {  // 实际调用的方法
          //参数
          const agentData = "mymessage";
          //若是ws开启状态
          if (this.websock.readyState === this.websock.OPEN) {
            this.websocketsend(agentData)
          }
          // 若是 正在开启状态，则等待300毫秒
          else if (this.websock.readyState === this.websock.CONNECTING) {
            let that = this;//保存当前对象this
            setTimeout(function () {
              that.websocketsend(agentData)
            }, 300);
          }
          // 若未开启 ，则等待500毫秒
          else {
            this.initWebSocket();
            let that = this;//保存当前对象this
            setTimeout(function () {
              that.websocketsend(agentData)
            }, 500);
          }
        },
        initWebSocket() { //初始化weosocket
          this.$axios({
            method: 'GET',
            url: '/seminar/' + this.$data.klassSeminarId + '/enterseminar',
            headers: {
              'Authorization': window.localStorage['token']
            }
          })
            .then(res => {
              if (res.status === 200) {
                this.webserver = res.data;
                let that = this;
                that.ws = new WebSocket(that.webserver);
                that.ws.onopen = function (evt) {
                  console.log("连接成功");
                };
                that.ws.onmessage = that.websocketonmessage;
                that.ws.onclose = that.websocketclose;
              }
            })
            .catch(e => {
              console.log(e)
            })
        },
        websocketonmessage(e) { //数据接收
          //const message = JSON.parse(e.data);
          let that = this;
          let message = e.data;
          console.log(message);
          console.log("传来的消息是：" + message);
          if (message === "下一组展示") {
            console.log("dfsfs");
            that.isShow = true;
            that.index++;
            that.questionNum = 0;
          } else if (message === "提问") {
            that.questionNum++;
          } else if (message === "抽取提问") {
            that.questionNum--;
          } else if (message === "请您开始提问") {
            this.$message({
              type: 'success',
              message: '请您开始提问'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '很遗憾，您未被选中，请您耐心等待！'
            })
          }

        },
        websocketsend(agentData) {//数据发送
          this.ws.send(agentData);
        },
        websocketclose(e) {  //关闭
          console.log("connection closed (" + e.code + ")");
        },

        back() {
            this.$router.push({
              path: '/Courses/Seminaring/Seminaring',
              name: 'Seminaring',
              query: {
                seminarId: this.seminarId,
                courseId: this.courseId,
                courseName: this.courseName,
                klassId: this.klassId,
                teamId: this.teamId,
                klassSeminarId: this.klassSeminarId
              }
            })
          },
         open() {
           let that = this;
           // if(that.teamId===that.SeminaringInfo[that.index].teamId){
           //   this.$message({
           //     type:error,
           //     message:'当前展示组为您的小组，您暂时无法提问！'
           //   })
           // }
           if (this.index === -1) {
             this.$message({
               type: 'error',
               message: '讨论课尚未开始，无法发起提问！'
             })
           } else {
             that.$axios({
               method: 'POST',
               url: '/seminar/' + that.SeminaringInfo[0].klassSeminarId + '/attendance/' + that.SeminaringInfo[that.index].id + '/team/' + this.teamId + '/question',
               headers: {
                 'Authorization': window.localStorage['token']
               }
             })
               .then(res => {
                 console.log(res);
                 if (res.status === 200) {
                   that.$message({
                     type: 'info',
                     message: res.data
                   });
                   if (res.data === "报名提问成功") {
                     that.ws.send("提问")
                   }
                 }
               })
               .catch(e => {
                 console.log(e);
               })
           }
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
    margin: 20px 0 10px 0;
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
    float: left;
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
