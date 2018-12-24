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

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{teamTitle}}</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作</el-button>
        </div>
        <div style="font-weight: bold">组长：{{leader.Na}}--{{leader.No}}</div>
        <div v-for="obj in members" class="text item">
          {{obj.Na}}--{{obj.No}}
          <i style="float: right; color: red" class="el-icon-error" @click="dele(obj.No)"></i>
        </div>
      </el-card>
      <div class="divHeight"></div>

      <div class="search">
        <el-input class="search-input" placeholder="输入学号/姓名" v-model="student"> <!--<i slot="prefix" class="iconfont icon-search" ></i>-->
          <el-button @click="searchStu" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <template>
        <el-table
          :data="Unteam"
          style="width: 100%">
          <el-table-column
            label="添加队友"
            fixed="left">
            <template slot-scope="scope">
              <el-checkbox text-color="red"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="Na"
            label="姓名"
            width="130">
          </el-table-column>
          <el-table-column
            prop="No"
            label="学号"
            width="130">
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
      <div class="divHeight"></div>

      <el-row>
        <el-button type="warning" size="small" @click="dialogFormVisible = true">提交审核</el-button>
      </el-row>
      <el-dialog
        title="成组特例申请"
        :visible.sync="dialogFormVisible"
        width="90%">
        <el-form :model="form">
          <el-form-item label="申请理由:" :label-width="formLabelWidth">
            <el-input v-model="reason" autocomplete="off" placeholder="单行输入"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="validate">sure</el-button>
        </div>
      </el-dialog>
      <div class="divHeight"></div>
      <el-row>
        <el-button type="danger">解散小组</el-button>
        <el-button type="primary">添加</el-button>
        <el-button type="success">保存</el-button>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "TeamManage",
      data(){
          return{
            teamId:'',    //记录用户所在小组的teamId并传给后端
            item:'',      //存放所有从后端传来的数据
            reason:'',    // 成组特例申请理由
            student:'',
            teamTitle:'1-1 武林盟主',
            leader:{ Na:'王强', No: '24320162201122' } ,
            members:[],
            Unteam:[],
            dialogFormVisible: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '80px'
          }
      },
      created(){
        let that = this;
        that.teamId=that.$route.query.teamId;
        that.$axios({
          method:'GET',
          url:'/team/'+that.teamId,
          headers:{
            'Authorization': window.localStorage['token']
          }
        })
          .then(res=>{
            if(res.status===200){
              console.log(res);
              that.item=res.data;
            }
            else if(res.status===404){
              alert("未找到！")
            }
          })
          .catch(e=>{
            console.log(e)
          })
      },
      methods:{
        searchStu(){
          let that=this;
          let j=0;
          let tableData=that.Unteam;
          for(let i in tableData){
            if(tableData[i].No===that.student||tableData[i].Na===that.student){
              that.Unteam=[];
              that.Unteam[j++]=tableData[i];
            }
          }
          if(that.student==='')
            that.Unteam = that.Unteam;
        },
        //删除组员
        dele(index){
          this.$confirm('此操作将删除您的队友, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            width:'50%',
            type: 'warning',
            center: true
          }).then(() => {
            this.$axios({
              method:'PUT',
              url:'team/'+this.$data.teamId+'/remove',
              params:{
                id:index,
                teamId:this.teamId
              }
            })
              .then(res=>{
                let data=res.data;
                if(data.status===204){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
                else{
                  alert("删除失败！")
                }
              })
              .catch(e=>{
                console.log(e)
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        // 提交审核
        validate(){
          this.reason='';
          this.$axios({
            method:'POST',
            url:'team/'+this.$data.teamId+'/teamvalidrequest',
            data:{
              teamId: this.teamId,
              leaderId:this.leader,
              reason:this.reason
            }
          })
            .then(res=>{
              if(res.status===201){
                alert("申请已提交成功");
              }else if(res.status===403){
                alert("用户权限不足");
              }else{
                alert("未找到该队伍");
              }
              this.dialogFormVisible=false;
            })
            .catch(e=>{
              console.log(e);
              this.dialogFormVisible=false;
            })
        }
      }
    }
</script>

<style scoped>
  .homeTitle{
    width: 100%;
    line-height: 70px;
    display: block;
    background-color: #5CACEE;
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
  
  .search button{
    color: #66cccc;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-top: 5px;
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    background-color: #66cccc;
  }

  .divHeight{
    display: block;
    height: 20px;
  }

</style>
