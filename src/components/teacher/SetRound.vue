<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnSeminarPage"></i>轮次设置</div>
    </div>
    <div class="main">
      <el-card class="box-card">
        <div slot="header">
          <span>讨论课:</span>
          <el-button type="success" size="small" plain style="float: right" @click="addSeminar"><i
            class="el-icon-plus icon0"></i>&nbsp;添加讨论课
          </el-button>
        </div>
        <table
          style="width: 100%;text-align: center"
          v-for="seminar in seminars">
          <tr>
            <td>{{seminar}}</td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <div slot="header">
          <span>成绩设置:</span>
        </div>
        <table style="width: 100%;">
          <tr>
            <td style="width: 50%;text-align: center">展示:</td>
            <td>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td style="width: 50%;text-align: center">提问:</td>
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
          <tr>
            <td style="width: 50%;text-align: center">报告:</td>
            <td>
              <el-select v-model="value3" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <div slot="header">
          <span>本轮讨论课报名次数:</span>
        </div>
        <table
          v-for="item in signUpNum"
          style="width: 100%"
        >
          <tr>
            <td style="width: 50%;text-align: center">{{item.value}}</td>
            <td>
              <el-input-number size="small" v-model="item.num"></el-input-number>
            </td>
          </tr>
        </table>
      </el-card>
      <div style="width: 100%;margin-top: 20px">
        <el-button class="btn" type="success" @click="SetSuccess">发布</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "SetRound",
    data() {
      return {
        seminars: [
          '领域模型设计',
          '业务流程分析'
        ],
        options: [{
          value: '选项1',
          label: '最高分'
        }, {
          value: '选项2',
          label: '平均分'
        }],
        value: '',
        options2: [{
          value: '选项1',
          label: '最高分'
        }, {
          value: '选项2',
          label: '平均分'
        }],
        value2: '',
        options3: [{
          value: '选项1',
          label: '最高分'
        }, {
          value: '选项2',
          label: '平均分'
        }],
        value3: '',
        signUpNum: [{
          value: '一班:',
          num: '1'
        }, {
          value: '二班:',
          num: '1'
        }, {
          value: '三班:',
          num: '1'
        }]
      }
    },
    methods: {
      returnSeminarPage() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      SetSuccess() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      addSeminar() {
        this.$router.push({path: '/teacher/NewSeminar'});
      }
    }
  }
</script>

<style scoped>
  .body0 {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 14px;
  }

  .head {
    height: 70px;
    width: 100%;
    background-color: #CCFF99;
  }

  .title {
    display: block;
    text-align: center;
    line-height: 70px;
  }

  .icon1 {
    float: left;
    margin-left: 3%;
    line-height: 70px;
  }

  .box-card {
    width: 100%;
  }

  .btn {
    height: 36px;
    width: 100%;
    border: none;
    background-color: #66CCCC;
    margin: auto;
  }

  .icon0 {
    font-weight: bolder;
  }

  .main {
    width: 50%;
    margin: auto;
  }
  @media (max-width: 640px) {
    .main {
      width: 100%;

    }
  }
</style>
