
<template>
    
  <div>
    <!--面包屑导航区 -->
    <!-- <el-bareadcrumb> 面包屑导航包裹的标签 该标签里面自带有插槽 也有写好的样式 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- :to="{path:'/home'}" 点击该位置要去到的地方（绑定） -->
      <el-breadcrumb-item :to="{ path: '/home' }"> 首页 </el-breadcrumb-item>
      <el-breadcrumb-item> 用户管理 </el-breadcrumb-item>
      <el-breadcrumb-item> 用户列表 </el-breadcrumb-item>
    </el-breadcrumb>

    <!--  面包屑后的卡片区域 -->
    <el-card class="box-card">
      <!-- 把一行的长度分为20份 -->
      <el-row :gutter="20">
        <!-- 占8份 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            :clearable="true"
            @clear="getUserList"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 4份 -->
        <el-col :span="4">
          <el-button @click="switch2" type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表渲染 element ui的表单使用 -->
      <!-- <el-table> 里面是自带有v-for循环的 -->

      <el-table :data="userlist" style="width: 100%">
        <!-- type="index" 指的是该序号排列按index来做 -->
        <el-table-column label="序号" type="index" width="80">
        </el-table-column>
        <!-- prop="UserName" 接收 userlist UserName的信息 -->
        <el-table-column label="用户名" prop="UserName" width="80">
        </el-table-column>
        <el-table-column label="手机" prop="Mobile" width="110">
        </el-table-column>
        <el-table-column label="邮箱" prop="Email" width="160">
        </el-table-column>
        <el-table-column label="角色" prop="RoleName" width="100">
        </el-table-column>
        <el-table-column label="状态" prop="Mgstate" width="100">
          <!-- slot-scope="scope" 粉碎作用域 提取当前行数据
          后面的scope是变量 -->
          <template slot-scope="scope">
            <!-- 开关选择器 -->
            <!-- scope.row.Mgstate这里的Mgstate是状态哪里的 -->
            <el-switch
              v-model="scope.row.MgState"
              active-color="#409EFF"
              inactive-color="#C0CCDA"
              @change="userStateChange(scope.row)"
            >
            </el-switch>
          </template>
          <!------------------------------------------------------------->
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 拿到本行的数据修改 -->
            <!-- @click="updateUserDialog(scope.row)" -->
            <el-button
              size="mini"
              type="success"
              @click="updateUserDialog(scope.row)"
              >修改</el-button
            >
            <el-button @click="deluser(scope.row.id)" type="danger" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- @size-change="handleSizeChange"每页的条数改变就会被调用 -->
      <!-- @current-change="handleCurrrntChange"当前页面改变就会被调用 -->
      <!-- :current-page="queryInfo.pagenum"当前的pagenum -->
      <!-- :page-sizes="[100, 200, 300, 400]" 可以选择每页都少条数据 -->
      <!-- :page-size="100"当前情况下每页100条 -->
      <!-- :total="400"数据总数 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrrntChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="queryInfo.pagesize"
        :total="total"
        layout="total,sizes, prev, pager, next,jumper"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户和用户信息"
      width="50%"
      :visible.sync="adduserdialogVisible"
      @close="addUserDialog"
    >
      <el-form
        ref="addFormRef"
        :rules="addFormRules"
        :model="addForm"
        lable-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"></span>
      <el-button @click="adduserdialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addUserEnter">确定</el-button>
    </el-dialog>
    <!-- 修改用户的dialog框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="updateUserDialogVisible"
      width="40%"
      @close="updateDialogClosed"
    >
      <el-form
        ref="updateFormRef"
        :rules="addFormRules"
        :model="updateForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="updateForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="updateForm.password" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateForm.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="updateForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterupdateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "User",
  props: [],
  components: {},
  data() {
    // 自定义校验手机号
    var checkmobile = (rule, value, callback) => {
      const regMobile = /^1[3456789]\d{9}$/;
      if (regMobile.test(value)) {
        // 合法手机
        callback();
      }
      callback(new Error("请输入合法的手机号"));
    };

    // 自定义验证邮箱号
    var checkEmail = (rule, value, callback) => {
      const regEmail =
        /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (regEmail.test(value)) {
        // 合法手机
        callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };

    return {
      // query:'' 是我们还可以传递其他信息 没有就不用写
      queryInfo: { id: 0, pagenum: 1, pagesize: 3, query: "" },
      userlist: [],
      total: 0,
      adduserdialogVisible: false,
      updateUserDialogVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        // pagenum:1,
        // pagesize:3
      },
      updateForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        id: "",
      },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度应该在3到5字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度应该在6到15字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkmobile, trigger: "blur" },
        ],
      },
    };
  }, //方法 函数写这里
  methods: {
    async getUserList() {
      const res = await this.$http.get("/api/users", {
        //   params 要传递的参数写在这个后面
        params: this.queryInfo,
      });
      console.log("111110", res);
      this.userlist = res.data.data;
      this.total = res.data.total;
    },
    // newsize该形参是改变当前页面显示条数，所要改变成的数值
    // 传进来动态改变pagesize
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      // 重新调用渲染
      this.getUserList();
    },
    handleCurrrntChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getUserList();
    },
    // 状态按钮的函数
    async userStateChange(userinfo) {
      const res = await this.$http.get("/api/userupdate", {
        params: userinfo,
      });
      console.log(res);
      if (res.data.code != 200) {
        this.$message.console.error("改变状态用户状态成功");
        return;
      }
      this.$message.success("用户状态已经改变成功" + res.data.newState);
    },
    async search() {
      const res = await this.$http.get("/api/search", {
        params: this.queryInfo,
      });
      console.log(res);
      this.userlist = res.data.data;
    },
    switch2() {
      this.adduserdialogVisible = true;
    },
    // 按下确定添加用户后 调用的函数  查看验证是否通过
    addUserEnter() {
      console.log("addUserEnte");
      // 这里是为了 在请求的参数中添加pagenum 和pagesize这两个参数（这是方法二）
      // 方法一是直接在addForm中添加 addForm看上面的data
      var pagenumval = this.queryInfo.pagenum;
      // 这里就把字符串pagenum赋值给变量pagenum（也可以说这里把pagenum变量变成了key=value形式）
      var pagenum = "pagenum";
      // 把变量pagenum添加到addForm数值中 并给予属性值pagenuvaluemval（key=value形式）
      this.addForm[pagenum] = pagenumval;

      var pagesizeval = this.queryInfo.pagesize;
      var pagesize = "pagesize";
      this.addForm[pagesize] = pagesizeval;

      console.log(this.$refs.addFormRef);
      // validate 这是  this.$refs.addFormRef中有的一个方法，能够检测表单是否验证成功
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.get("/api/adduser", {
            params: this.addForm,
          });
          console.log(res);
          this.userlist = res.data.data;
          this.total = res.data.total;
          this.adduserdialogVisible = false;
        } else {
          console.log("error 添加用户");
          return false;
        }
      });
    },
    // 添加用户后 对话框关闭的时 调用该函数 该函数会用本身自有的resetFields方法清空掉 我们添加时在input框输入的数据
    addUserDialog() {
      this.$refs.addFormRef.resetFields();
    },
    updateDialogClosed() {
      this.$refs.updateFormRef.resetFields();
    },
    // 修改用户时被调用的函数
    updateUserDialog(userinfo) {
      this.updateUserDialogVisible = true;
      // 下面是为了点击修改的时候，把原来的数据显示在input框中
      this.updateForm.id = userinfo.id;
      this.updateForm.username = userinfo.UserName;
      this.updateForm.email = userinfo.Email;
      this.updateForm.mobile = userinfo.Mobile;
      this.updateForm.password = userinfo.Password;
    },

    enterupdateUser() {
      var pagenumval = this.queryInfo.pagenum;
      var pagenum = "pagenum";
      this.addForm[pagenum] = pagenumval;

      var pagesizeval = this.queryInfo.pagesize;
      var pagesize = "pagesize";
      this.addForm[pagesize] = pagesizeval;

      this.$refs.updateFormRef.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.get("/api/deleteuser", {
            params: this.updateForm,
          });
          console.log("res", res);

          this.userList = res.data.data;
          this.total = res.data.total;
          this.updateUserDialogVisible = false;
        }
      });
    },
    // 删除函数时被调用的函数
    async deluser(id) {
      var res = await this.$confirm("确定永久删除该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => {
        alert("错误操作", err);
      });

      if (res != "confirm") {
        this.$message, info("已取消删除");
        return;
      }

      this.queryInfo.id = id
      const resdata = await this.$http.get("/api/deleteuser", {
        params: this.queryInfo
      });

   
      this.$message.info("删除成功");
      this.userList = resdata.data.data;
      this.total = resdata.data.total;
      this.getUserList();
    },
  }, //计算属性
  computed: {}, //侦听器
  watch: {}, //过滤器
  filters: {}, //以下是生命周期 //组件创建之前
  beforeCreate() {}, //组件创建之后
  created() {
    this.getUserList();
  }, //页面渲染之前
  beforeMount() {}, //页面渲染之后
  mounted() {}, //页面视图数据更新之前
  beforeUpdate() {}, //页面视图数据更新之后
  updated() {}, //页面销毁之前
  beforeDestroy() {}, //页面销毁之后
  destroyed() {},
};
</script>

<style  lang='scss'  scoped >
.el-card {
  margin-top: 25px;
  box-shadow: 0 1px 1px #353333;
}

.el-breadcrumb {
  font-size: 16px;
}
</style>