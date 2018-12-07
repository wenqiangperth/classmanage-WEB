<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnSeminarPage"></i>新建讨论课</div>
    </div>
    <div class="main">
      <el-card class="box-card">
        <table style="width: 100%">
          <tr>
            <td style="width: 28%">主题</td>
            <td>
              <el-input v-model="name">
                <i slot="suffix" class="el-input__icon el-icon-edit icon0"></i>
              </el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 28%">要求</td>
            <td>
              <el-input class="textArea"
                        type="textarea"
                        placeholder="讨论课详情"
                        :autosize="{ minRows: 2, maxRows: 9}"
                        v-model="textarea1">
              </el-input>
            </td>
          </tr>
          <tr style="height:50px">
            <td style="width: 28%">次序号:</td>
            <td style="text-align: right">
              <el-input-number size="mini" v-model="orderNum"></el-input-number>
            </td>
          </tr>
          <tr>
            <td style="width: 28%;height: 50px">是否可见:</td>
            <td style="text-align: right">
              <el-switch
                v-model="isVisible"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </td>
          </tr>
        </table>
      </el-card>
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            &nbsp;&nbsp;<i class="header-icon el-icon-info icon0"></i>&nbsp;&nbsp;2016--1
          </template>
          <el-card class="box-card">
            <table
              style="width:100%">
              <tr>
                <td style="width: 28%">报名开始:</td>
                <td style="text-align: right">
                  <el-date-picker
                    v-model="startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    style="width:100%">
                  </el-date-picker>
                </td>
              </tr>
              <tr>
                <td style="width: 28%">报名截止:</td>
                <td style="text-align: right">
                  <el-date-picker
                    v-model="endTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    style="width: 100%">
                  </el-date-picker>
                </td>
              </tr>
              <tr>
                <td style="width: 28%">报名组数:</td>
                <td style="text-align: right">
                  <el-input-number size="mini" v-model="signUpNum"></el-input-number>
                </td>
              </tr>
              <tr>
                <td style="width: 28%">报名顺序:</td>
                <td style="text-align: right">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in signUpOrder"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td style="width: 28%">所属round:</td>
                <td style="text-align: right">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in rounds"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </td>
              </tr>
            </table>
          </el-card>
        </el-collapse-item>
      </el-collapse>

      <div style="width: 100%;margin-top: 20px">
        <el-button class="btn" type="success" @click="NewSuccess">发布</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "NewSeminar",
    data() {
      return {
        name: '',
        description: '',
        textarea1: '',
        isVisible: true,
        startTime: '',
        endTime: '',
        signUpNum: 1,
        orderNum: 1,
        signUpOrder: [{
          value: '选项1',
          label: '自定'
        },
          {
            value: '选项2',
            label: '默认'
          }],
        rounds: [{
          value: '选项1',
          label: '无(默认新建)'
        }, {
          value: '选项2',
          label: '第一轮'
        }],
        value: ''
      }
    },
    methods: {
      returnSeminarPage() {
        this.$router.push({path: '/teacher/SeminarPage'});
      },
      NewSuccess() {
        this.$router.push({path: '/teacher/seminarPage'});
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

  .icon0 {
    font-weight: bolder;
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
