<template>
    <div>
      <header class="home-title">
        <div class="homeTitle">
          <i class="el-icon-arrow-left"></i>
          <label>OOAD </label>
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

      <el-tag style="float: right">{{klass}}</el-tag>

      <template>
        <el-table
          :data="tableData2"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="Na"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="No"
            label="学号"
            width="140">
          </el-table-column>
        </el-table>
      </template>

      <div class="withdraw">
        <el-button type="danger" @click="open" plain>退出小组</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "WithDraw",
      methods:{
          tableRowClassName({row,rowIndex}){
            if (rowIndex === 0) {
              return 'success-row';
            }
            return '';
          },
          open() {
            this.$confirm('确定退出小组, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.$axios({
                method:'PUT',
                url:'/team/teamId/remove',
                params:{
                  id:window.localStorage['userId']
                }
              }).then(res=>{
                let data=res.data;
                if(data.status===204){
                  this.$message({
                    type: 'success',
                    message: '退出成功!'
                  });
                  this.$router.push({path:'/Courses/MyTeam/TeamInfo'});

                }else{
                  alert("退出失败，请重新尝试！")
                }
              })
                .catch(e=>{console.log(e)})
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已放弃退出'
              });
            });
          }
      },
      data(){
          return{
            klass: '2016-(1)',
            tableData2:[
              { Na:'王强',No: '24320162201122'} ,
              { Na:'赵某',No:'24320162200000' },
              { Na:'高某',No:'24232001213213' },
              { Na:'方某',No:'24323425233232' },
              { Na:'叶某',No:'24329753973845' }
            ]
          }
      }
    }
</script>

<style >
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #CCFF99;
    border-radius: 5px;
  }

  .el-icon-arrow-left{
    transform: translateX(-500%);
  }

  .homeTitle label{
    font-style: normal;
    font-size: 25px;
  }

  .el-icon-plus{
    font-size: 25px;
    color: grey;
    font-weight: bold;
    transform: translateX(340%);
  }
  .el-dropDown{
    transform: translateX(90%);
  }

  .el-table .success-row {
    background: #66cccc;
  }

  .withdraw{
    margin: 40px 0 0 0;
    width: 100%;
  }
</style>
