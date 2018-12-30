<template>
    <div class="body0">
      <div class="head">
        <div class="title">
          <i class="el-icon-back icon1 icon0" @click="returnHomePage"></i>待  办
        </div>
      </div>
      <div class="main">
        <el-collapse>
          <el-collapse-item v-for="(item,index) in teamShares" :key="index" v-if="item.status===null">
            <template slot="title">
              <i class="el-icon-time el-icon0"></i>收到{{item.subCourseName}}--{{item.subCourseTeacherName}}老师的共享分组请求
            </template>
            <div style="width: 100%;height:45px">
              <i class="el-icon-check icon" @click="acceptShare(index)"></i>
              <i class="el-icon-close icon2" @click="refuseShare(index)"></i>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse>
          <el-collapse-item v-for="(item,index1) in teamValid" v-if="item.status===null">
            <template slot="title">
              <i class="el-icon-time el-icon0"></i>收到{{item.team.teamName}}的组队合法请求:{{item.reason}}
            </template>
            <div style="width: 100%;height:45px">
              <i class="el-icon-check icon" @click="acceptAppli(index1)"></i>
              <i class="el-icon-close icon2" @click="refuseAppli(index1)"></i>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Backlog",
      data() {
        return {
          teacherId: 0,
          teamShares: [],
          teamValid: []
        }
      },
      created() {
        this.teacherId = this.$route.params.teacherId;
        let that = this;
        that.$axios({
          method: 'GET',
          url: '/request/teamshare',
          params: {
            teacherId: that.teacherId
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              console.log("共享组队申请");
              console.log(res.data);
              that.teamShares = res.data;
            }
          }).catch(e => {
          console.log(e);
        });
        that.$axios({
          method: 'GET',
          url: '/request/teamvalid',
          params: {
            teacherId: that.teacherId
          },
          headers: {
            'Authorization': window.localStorage['token']
          }
        })
          .then(res => {
            if (res.status === 200) {
              window.localStorage['token'] = res.headers.authorization;
              console.log("组队合法申请");
              console.log(res.data);
              that.teamValid = res.data;
            }
          }).catch(e => {
          console.log(e);
        })
      },
      methods:{
          returnHomePage(){
            this.$router.push({path:'/teacher/HomePage'});
          },
        acceptShare(index) {
          this.$axios({
            method: 'PUT',
            url: '/request/teamshare/' + this.teamShares[index].id,
            data: {
              status: 1
            },
            headers: {
              'Authorization': window.localStorage['token']
            }
          })
            .then(res => {
              if (res.status === 200) {
                window.localStorage['token'] = res.headers.authorization;
                this.$message({
                  type: 'success',
                  message: '您已接受共享分组'
                });
                this.$axios({
                  method: 'GET',
                  url: '/request/teamshare',
                  params: {
                    teacherId: this.teacherId
                  },
                  headers: {
                    'Authorization': window.localStorage['token']
                  }
                })
                  .then(res => {
                    if (res.status === 200) {
                      window.localStorage['token'] = res.headers.authorization;
                      console.log("共享组队申请");
                      console.log(res.data);
                      this.teamShares = res.data;
                    }
                  }).catch(e => {
                  console.log(e);
                })
              }
            }).catch(e => {
            console.log(e);
          })
        },
        refuseShare(index) {
          this.$axios({
            method: 'PUT',
            url: '/request/teamshare/' + this.teamShares[index].id,
            data: {
              status: 0
            },
            headers: {
              'Authorization': window.localStorage['token']
            }
          })
            .then(res => {
              if (res.status === 200) {
                window.localStorage['token'] = res.headers.authorization;
                this.$message({
                  type: 'success',
                  message: '您已拒绝接受共享'
                })
              }
            }).catch(e => {
            console.log(e);
          })
        },
        acceptAppli(index){

          this.$axios({
            method:'PUT',
            url:'/request/teamvalid/'+ this.teamValid[index].id,
            headers:{
              'Authorization':window.localStorage['token']
            },
            data:{
              status: 1
            }
          }).then(res=>{
            console.log(res);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              this.$message({
                type:'success',
                message:'您已接收该申请！'
              })
            }
          }).catch(e=>{console.log(e);})
        },
        refuseAppli(index){
          this.$axios({
            method:'PUT',
            url:'/request/teamvalid/'+ this.teamValid[index].id,
            headers:{
              'Authorization':window.localStorage['token']
            },
            data:{
              status: 0
            }
          }).then(res=>{
            console.log(res);
            if(res.status===200){
              window.localStorage['token']=res.headers.authorization;
              this.$message({
                type:'info',
                message:'您已拒绝该申请！'
              })
            }
          }).catch(e=>{console.log(e);})
        },
      }
    }
</script>

<style scoped>

.icon {
  font-weight: bolder;
  font-size: 25px;
  float: left;
  line-height: 45px;
  margin-left: 60px;
  color: #66cccc;
}

.icon2 {
  font-weight: bolder;
  font-size: 25px;
  float: right;
  line-height: 45px;
  margin-right: 60px;
  color: #616161;
}
</style>
