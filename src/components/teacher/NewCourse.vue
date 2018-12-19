<template>
  <div class="body0">
    <div id="head" class="head">
      <div class="title"><i class="el-icon-close icon1 icon0" @click="returnCourseManage"></i>新建课程</div>
    </div>
    <div class="main">
      <el-card class="box-card">
        <table style="width: 100%">
          <tr>
            <td style="width: 28%">课程名称</td>
            <td>
              <el-input v-model="course.name">
                <i slot="suffix" class="el-input__icon el-icon-edit icon0"></i>
              </el-input>
            </td>
          </tr>
          <tr>
            <td style="width: 28%">课程要求</td>
            <td>
              <el-input class="textArea"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 6}"
                        v-model="course.description">
              </el-input>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <span>成绩计算规则</span>
        <table
          v-for="(item,index) in course.tableData1"
          :key="index"
          style="width: 100%">
          <tr class="tr0">
            <td class="td0">{{item.make_up}}</td>
            <td>
              <el-input size="mini" v-model="item.percentage" style="width: 45px"></el-input><label>%</label>
            </td>
          </tr>
        </table>
      </el-card>
      <el-card class="box-card">
        <table
          style="width: 100%">
          <tr>
            <td style="width:30%">小组人数:</td>
            <td>
              <el-input placeholder="下限" v-model="course.minNum"></el-input>
            </td>
            <td>
              <el-input placeholder="上限" v-model="course.maxNum"></el-input>
            </td>
          </tr>
        </table>
        <table
          style="width:100%">
          <tr>
            <td style="width: 28%">组队开始:</td>
            <td style="text-align: right">
              <el-date-picker
                v-model="course.startTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width:100%">
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td style="width: 28%">组队截止:</td>
            <td style="text-align: right">
              <el-date-picker
                v-model="course.endTime"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 100%">
              </el-date-picker>
            </td>
          </tr>
          <tr style="height: 40px">
            <td style="width: 28%">组员性别:</td>
            <td style="text-align: right">
              <el-switch
                v-model="course.isGenderRequired"
                active-color="#66cccc"
                inactive-color="#cccccc"
                >
              </el-switch>
            </td>
          </tr>
        </table>
        <div id="table1" style="width: 100%;">
          <table
            style="width: 100%;">
            <tr>
              <td style="width:30%">男生人数:</td>
              <td>
                <el-input placeholder="下限" v-model="course.minBoyNum"></el-input>
              </td>
              <td>
                <el-input placeholder="上限" v-model="course.maxBoyNum"></el-input>
              </td>
            </tr>
          </table>
        </div>
        <div id="table2" style="width: 100%;">
          <table
            style="width: 100%;">
            <tr>
              <td style="width:30%">女生人数:</td>
              <td>
                <el-input placeholder="下限" v-model="course.minGirlNum"></el-input>
              </td>
              <td>
                <el-input placeholder="上限" v-model="course.maxGirlNum"></el-input>
              </td>
            </tr>
          </table>
        </div>


        <table style="width: 100%;">
          <tr style="height: 40px">
            <td style="width:40%;"><label>是否根据星座分组:</label></td>
            <td style="text-align: right">
              <el-switch
                v-model="course.isGroupByConstellation"
                active-color="#66cccc"
                inactive-color="#cccccc"
              >
              </el-switch>
            </td>
          </tr>
        </table>
        <el-table :data="data0">
          <el-table-column prop="name" label="冲突课程">
            <template slot-scope="scope">
              <el-select v-model="data0[scope.$index]" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="info" size="small" style="float: right;margin-top: 5px;margin-bottom: 5px" @click="addObject">新增对象</el-button>


      </el-card>
      <div style="width: 100%;margin-top: 20px">
        <el-button class="btn" type="success" plain @click="NewSuccess">发布</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "NewCourse",
    data() {
      return {
        course: {
          name: '',
          description: '',
          tableData1: [{
            make_up: '课堂展示',
            percentage: '10',
          },
            {
              make_up: '课堂提问',
              percentage: '20',
            },
            {
              make_up: '书面报告',
              percentage: '30',
            }],
          startTime: '',
          endTime: '',
          minNum: '',
          maxNum: '',
          isGenderRequired:false,
          isGroupByConstellation:false,
          minBoyNum:'',
          minGirlNum:'',
          maxBoyNum:'',
          maxGirlNum:''
        },
        options3: [{
          value: '选项1',
          label: '软件工程**老师',
        }, {
          value: '选项2',
          label: 'OOAD**老师',
        }],
        data0: [],
      }
    },
    methods: {
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      NewSuccess() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      addObject(){
        this.data0.push({});
      }
      /*displayTable(temp){
        if(temp){
          var table1=document.getElementById("table1");
          var table2=document.getElementById("table2");
          table1.style.display="block";
          table2.style.display="block";
        }else{
          let table3=document.getElementById("table1");
          let table4=document.getElementById("table2");
          table3.style.display="none";
          table4.style.display="none";
        }}
*/

    }
  }
</script>

<style scoped>

  .box-card {
    width: 100%;
  }

  .td0 {
    width: 50%;
    text-align: center;
    height:35px;
  }

</style>
