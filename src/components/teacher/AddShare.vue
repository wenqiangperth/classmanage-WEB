<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnSharePage"></i>新增共享
      </div>
    </div>
    <div class="main">
      <div style="width: 100%;height:40px"></div>
      <el-card>
        <table>
          <tr>
            <td style="width: 30%;color:#66cccc">共享类型:</td>
            <td>
              <el-select v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td style="width: 30%;color:#66cccc">共享对象:</td>
            <td>
              <el-select v-model="value2" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>

        </table>
        <!--<el-button type="info" size="small" style="float: right;margin-top:10px;margin-bottom: 15px">新增对象</el-button>-->
      </el-card>
      <el-card class="pause" id="pause">
        <i class="el-icon-info icon0" style="color:#99CC00;font-size: 25px"></i>
        <br><br>
        <br>确认发送共享请求
        <br><br><br>
        <el-button type="text" style="float: right;color: #99CC00" @click="sendSuccess">
          SURE
        </el-button>
        <el-button type="text" style="float:right;margin-right: 5px;color:#99CC00" @click="cancelShare">CANCEL</el-button>
      </el-card>
      <el-button class="btn" type="success" plain style="margin-top: 20px" @click="successShare"> 确认共享</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SharePage",
    data() {
      return {
        options1: [{
          value: '选项1',
          label: '共享讨论课',
        }, {
          value: '选项2',
          label: '共享分组',
        }],
        value1: '',
        options2: [{
          value: '选项1',
          label: 'J2EE**老师',
        }, {
          value: '选项2',
          label: '.Net**老师',
        }],
        value2: '',
        options3: [{
          value: '选项1',
          label: '软件工程**老师',
        }, {
          value: '选项2',
          label: 'OOAD**老师',
        }],
        value3: ''
      }
    },
    methods: {

      returnSharePage() {
        this.$router.push({path: '/teacher/SharePage'});
      },
      successShare() {
        var share=document.getElementById("pause");
        share.style.display="block";
      },
      cancelShare(){
        var share=document.getElementById("pause");
        share.style.display="none";
      },
      sendSuccess(){
        this.$notify.success({
          title: 'Info',
          message: '共享请求发送成功',
          showClose: false
        });
        var share=document.getElementById("pause");
        share.style.display="none";
        this.$router.push({path:'/teacher/SharePage'});
      }
    }
  }
</script>

<style scoped>
  .pause {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    margin: auto;
    width: 70%;
    height: 200px;
    text-align: center;
    font-size: 14px;
    display: none;
  }

</style>
<style>


</style>

