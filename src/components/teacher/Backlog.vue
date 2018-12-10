<template>
    <div class="body0">
      <div class="head">
        <div class="title">
          <i class="el-icon-back icon1 icon0" @click="returnHomePage"></i>待  办
        </div>
      </div>
      <div class="main">
        <table class="table0">
          <tr>
            <td class="td0" style="text-align: left">
              <label @click="handleRequest"><i class="el-icon-warning icon00"></i>来自J2EE-张老师的共享分组请求</label>
            </td>
          </tr>
        </table>
        <el-button type="info" plain @click="checkHistory"
                  style="float: right;margin-top: 15px">历史消息</el-button>
        <div id="history" class="history" style="width: 100%;display: none">
          <table class="table0">
            <tr>
              <td class="td0" style="text-align: left">
                <label @click="handleRequest"><i class="el-icon-success"></i>来自J2EE-张老师的共享分组请求</label>
              </td>
            </tr>
            <tr>
              <td class="td0" style="text-align: left">
                <label @click="handleRequest"><i class="el-icon-error"></i>来自J2EE-张老师的共享分组请求</label>
              </td>
            </tr>
          </table>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Backlog",
      methods:{
          returnHomePage(){
            this.$router.push({path:'/teacher/HomePage'});
          },
        handleRequest(){
            this.$router.push({path:'/teacher/SharePage'});
        },
        checkHistory(){
            var history=document.getElementById("history");
            if(history.style.display==="none")
              history.style.display="block";
            else if(history.style.display==="block")
              history.style.display="none";
        }
      }
    }
</script>

<style scoped>
.icon00{
  color: red;
  font-size:20px;
}
</style>
