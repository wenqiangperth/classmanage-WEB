<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnSeminarPage"></i>修改讨论课信息</div>
    </div>
    <div class="main">
      <div style="width: 100%;height: 15px"></div>
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
                  <el-select v-model="value1" placeholder="请选择">
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
        <el-button class="btn" type="success" @click="NewSuccess" plain>保存</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "UpdateSeminarInfo",
    data() {
      return {
        name: '业务流程分析',
        description: '',
        textarea1: '界面导航图和所有界面原型设计课堂讨论每个小组15分组',
        isVisible: true,
        startTime: '2018-12-02 08:19:53',
        endTime: '2018-12-06 08:19:53',
        signUpNum: 6,
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
        value: '默认',
        value1: '1'
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

  .box-card {
    width: 100%;
  }

</style>

