

<template>
    
  <div class="home">
       

    <!-- <el-container>这个标签容器，使用该标签有默认的样式已经被写好 -->
    <el-container>
      <el-header>
        <div>
         
          <span class="title">VANS后台管理系统</span>
        </div>
        <!-- type='success'已经封装好的样式 -->
        <el-button type="success" @click="exit">退出</el-button>
      </el-header>
      
      <el-container>
        <el-aside class="elaside" :width="isOpen ? '42px' : '200px'">
          <!-- 这里写一个 可以伸长缩短 asidebar的动画小按钮 -->
          <div @click="switchMenu" class="toggleBtn">
            <i :class="isOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
          </div>

          <!-- 左侧菜单区域 -->
          <!--
            1. menu中的属性是element封装好的一些效果
            2. class="el-menu-vertical-demo"菜单竖排显示 
            3. text-color='#fff'文字默认颜色 
            4. active-text-color='#fffd04b'选中后文字的高亮颜色 
            5. :unique-opened='true'点开某菜单,则其他菜单要关闭,一次只能打开一个菜单 
            6. :router='true'使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转  -->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#1a2933"
            text-color="#fff"
            active-text-color="#fffd04b"
            :unique-opened="true"
            :router="true"
          >
            <!-- 一级菜单 -->
            <!-- 循环也可以没有index  这里的key值绑定的值就可以是item里面的id  -->
            <!--  :index="item.id+'' ">因为要传的值是字符串,所以可以加 '' 变成字符串  -->
            <el-submenu
              v-for="item in menulist"
              :key="item.id"
              :index="item.id + ''"
            >
              <template slot="title">
                <!-- 前面的icon图标 -->
                <i :class="iconObj2[item.name]"></i>
                <span>{{ item.name }}</span>
              </template>

              <!--一级菜单下面的 二级菜单(是直接复制了一级菜单到这里) -->
              <!-- el-submenu 改成el-menu-item 就是有菜单标题后面的箭头  一般写在不在嵌套的菜单标题 -->
              <!-- :index="subitem.id + ''" 改成 :index="subitem.path" 因为我们要把绑定的index作为 path 进行路由跳转 跳转到我们想要去的页面-->
              <el-menu-item
                v-for="subitem in item.child"
                :key="subitem.id"
                :index="subitem.path"
              >
                <template slot="title">
                  <i :class="iconObj2[subitem.name]"></i>
                  <span>{{ subitem.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- main home页面下的路由(子路由)出口-->
        <el-main>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
      
  </div>
</template>

<script>
export default {
  name: "Home",
  props: [],
  components: {},
  data() {
    return {
      isOpen: false,

      menulist: [],

      // iconObj: {
      //   1: "iconfont icon-user",
      //   2: "iconfont icon-gengduo",
      //   3: "iconfont icon-shouye",
      //   4: "iconfont icon-yanzhengma1",
      //   5: "iconfont icon-shoucang",
      //   6: "iconfont icon-fenxiang1",
      // },

      // 用中文key给项目循环添加icon图标
      iconObj2: {
        用户管理: "iconfont icon-Management",
        员工管理: "iconfont icon-quanxianguanli",
        商品管理: "iconfont icon-shangpinguanli",
        订单管理: "iconfont icon-dingdanguanli",
        数据统计: "iconfont icon-shujutongji",
        用户列表: "iconfont icon-yonghuliebiao",
        员工列表: "iconfont icon-role-list",
        权限列表: "iconfont icon-permissions-list",
        商品列表: "iconfont icon-shangpinliebiao",
        分类参数: "iconfont icon-quanbu",
        商品分类: "iconfont icon-fenleigongnengleimu",
      },
    };
  }, //方法 函数写这里
  methods: {
    exit() {
      // 退出的同时，清除sessionStorage存储的token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getmenus() {
      const res = await this.$http.get("/api/menu");
      console.log("请求回来的数据", res.data);
      if (!res.status == "ok") {
        return;
      }
      this.menulist = res.data.data;
    },
    switchMenu() {
      this.isOpen = !this.isOpen;
    },
  }, //计算属性
  computed: {}, //侦听器
  watch: {}, //过滤器
  filters: {}, //以下是生命周期 //组件创建之前
  beforeCreate() {}, //组件创建之后
  created() {
    // 这里是,用户一到这个页面,就要调用getmenus方法请求数据
    this.getmenus();
  }, //页面渲染之前
  beforeMount() {}, //页面渲染之后
  mounted() {}, //页面视图数据更新之前
  beforeUpdate() {}, //页面视图数据更新之后
  updated() {}, //页面销毁之前
  beforeDestroy() {}, //页面销毁之后
  destroyed() {},
};
</script>


<style lang='scss' scoped>
.el-menu {
  border-right: none;
}

.title {
  color: white;
  font-size: 30px;
}
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #0c212b;
  height: 80px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header img {
  width: 60px;
  height: 60px;
  padding-right: 6px;
  border-radius: 50%;
}
.el-aside {
  background-color: #4e72b8;
  /* line-height: 400px; */
}
.el-main {
  background-color: #e9eef3;
  /* line-height: 400px; */
}

.iconfont {
  margin-right: 10px;
}

.toggleBtn {
  line-height: 24px;
  color: #fff;
  text-align: left;
  font-size: 18px;
  padding-left: 12px;
  cursor: pointer;
  background-color: #009ad6;
}

.elaside {
  transition: all 0.5s ease;
}
</style>
