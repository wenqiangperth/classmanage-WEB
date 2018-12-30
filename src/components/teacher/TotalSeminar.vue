<template>
  <div>
    <div id="head" class="head">
      <div class="title"><i>&nbsp;</i>讨论课
      </div>
    </div>

    <div class="main">
      <div class="empty"></div>
      <div style="width: 100%" v-for="(items,index) in courses" :key="index">
        <div class="div0" @click="gotoCourseSeminar(index)">
          <i class="iconfont icon-kecheng" style="margin-left: 10px"></i>&nbsp;&nbsp;{{items.courseName}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TotalSeminar",
    data() {
      return {
        courses: [],
      }
    },
    created() {
      let that = this;
      that.$axios({
        method: 'GET',
        url: '/course',
        headers: {
          'Authorization': window.localStorage['token']
        }
      })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data);
            that.courses = res.data;
            window.localStorage['token'] = res.headers.authorization;
          }
        }).catch(e => {
        console.log(e);
      })
    },
    methods: {
      gotoCourseSeminar(index) {
        this.$router.push(
          {
            path: '/teacher/SeminarPage',
            name: 'SeminarPage',
            params: {
              course: this.courses[index]
            }
          }
        )
      },
      gotoHomePage() {
        this.$router.push({path: '/teacher/HomePage'});
      }
    }
  }
</script>

<style scoped>

  .empty {
    width: 100%;
    height: 30px;
  }

  .div0 {
    font-weight: bold;
    color: #616161;
    text-align: left;
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: rgba(102, 204, 204, 0.2);
    border-radius: 8px;
  }

</style>


