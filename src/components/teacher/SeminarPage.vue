<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i class="el-icon-back icon1 icon0" @click="returnCourseManage"></i>OOAD
        <el-dropdown class="plus" trigger="click">
          <i class="el-icon-plus icon0"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-bell" @click="returnHomePage">&nbsp;&nbsp;个人页</i></el-dropdown-item>
            <el-dropdown-item><i class="el-icon-back" @click="returnLogin">&nbsp;&nbsp;退 出</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="empty"></div>
    <div class="main">
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
        style="width: 100%;background-color:#f4f4f5;font-weight: bold">
      </el-tree>

      <div class="empty">
        <el-button class="button" type="info" size="small" plain
                   @click="gotoSeminar"
                   >正在进行的讨论课
        </el-button>
      </div>
      <div id="pop-box" class="pop-box" style="display:none">
        <el-card class="box-card">
          <div slot="header">
            <span>请选择要进入的讨论课</span>
          </div>
          <table style="width: 100%">
            <tr>
              <td style="width: 100%;text-align: center">
                <el-select v-model="value" placeholder="课程">
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
              <td style="width: 100%;text-align: center">
                <el-select v-model="value2" placeholder="班级">
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
              <td style="width: 100%;text-align: center">
                <el-select v-model="value3" placeholder="讨论课">
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
          <table style="width: 100%">
            <tr>
              <td style="width: 50%;text-align: center">
                <el-button plain type="success" size="small"
                           @click="gotoStartSeminar">确认
                </el-button>
              </td>
              <td style="width: 50%;text-align: center">
                <el-button type="info" plain size="small" @click="CancelPopBox">取消</el-button>
              </td>
            </tr>
          </table>
        </el-card>
      </div>
      <div class="new">
        <div>
          <el-button class="btn" type="success" plain @click="NewRound"><i class="el-icon-plus"
                                                                              style="font-weight: bolder"></i>&nbsp;&nbsp;新建轮次
          </el-button>
        </div>
        <div>
          <el-button class="btn" type="success" plain @click="NewSeminar"
                     style="margin-top: 10px"><i class="el-icon-plus" style="font-weight: bolder"></i>&nbsp;&nbsp;新建讨论课
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SeminarPage",
    data() {
      return {
        data: [{
          label: '第一轮',
          children: [{
            label: '该轮轮次设置',
          }, {
            label: '业务流程分析',
            children: [{
              label: '2016--1'
            }, {
              label: '2016--2'
            }, {
              label: '2016--3'
            }]
          }, {
            label: '领域模型设计',
            children: [{
              label: '2016--1'
            }, {
              label: '2016--2'
            }, {
              label: '2016--3'
            }]
          }]
        }, {
          label: '第二轮',
          children: [{
            label: '该轮轮次设置',
          },
            {
              label: '业务流程分析',
              children: [{
                label: '2016--1'
              }, {
                label: '2016--2'
              }, {
                label: '2016--3'
              }]
            },
            {
              label: '领域模型设计',
              children: [{
                label: '2016--1'
              }, {
                label: '2016--2'
              }, {
                label: '2016--3'
              }]
            }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        options: [
          {
            value: '选项1',
            label: 'OOAD'
          }, {
            value: '选项2',
            label: 'J2EE'
          }
        ],
        value: '',
        options2: [
          {
            value: '选项1',
            label: '2016--1'
          }, {
            value: '选项2',
            label: '2016--2'
          }
        ],
        value2: '',
        options3: [
          {
            value: '选项1',
            label: '界面'
          }, {
            value: '选项2',
            label: '模型'
          }
        ],
        value3: '',
        seminar: [{
          id: '1',
          name: '用例分析',
          course: 'OOAD',
          desc: '界面导航图，每组要求15分组'
        }]

      }
    },
    methods: {
      handleNodeClick(data) {
        if (data.label === '该轮轮次设置')
          this.$router.push({path: '/teacher/SetRound'});
        if (data.label === '2016--1')
          this.$router.push({path: '/teacher/BeforeSeminar'});
        if (data.label === '2016--2')
          this.$router.push({path: '/teacher/AfterSeminar'});
      },
      returnLogin() {
        this.$router.push({path: '/'});
      },
      returnHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      },
      NewRound() {
        //this.$router.push({path:'/teacher/SetRound'});
      },
      NewSeminar() {
        this.$router.push({path: '/teacher/NewSeminar'});
      },
      returnCourseManage() {
        this.$router.push({path: '/teacher/CourseManage'});
      },
      gotoSeminar() {
        var show = document.getElementById("pop-box");
        show.style.display = "block";
      },
      gotoStartSeminar() {
        this.$router.push({path: '/teacher/StartSeminar'});
      },
      CancelPopBox() {
        var show = document.getElementById("pop-box");
        show.style.display = "none";
      }

    }
  }
</script>

<style scoped>

  .empty {
    width: 100%;
    height: 30px;
  }

  .new {
    width: 100%;
    margin-top: 80px;
  }

  .button {
    float: right;
    margin-right: 5px;
    margin-top: 10px;
  }

  .pop-box {
    margin-top: 25px;
  }

</style>
