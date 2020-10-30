<template>

    <el-container class="home_container">
        <!-- 这是头部区域 -->
        <el-header class="home_header">
            <div class="home_icon">
                <img src="../assets/home.jpg" alt="">
                <span>电商后台管理系统</span>
            </div>

            <el-button type="danger" @click="logout">退出</el-button>
            <!-- 实现退出功能 -->
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '230px'">
                <div class="toggle-button" @click="toggleCollapse">&lt; &gt;</div>
                <!-- 侧边栏菜单区域  unique-opened 是否只保持同时只能有一个子菜单的展开 默认代表true-->
                <!-- active-text-color 当前激活菜单的文字颜色 collapse-transition是否开启折叠动画-->
                <!-- router开启路由，下面的菜单点击就可以跳转到指定内容 -->
                <el-menu background-color="#e4f5ef" text-color="black" active-text-color="#40a9ff" unique-opened
                    :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
                    <!-- 这是一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{item.authName}}</span>
                        </template>

                        <!-- 二级菜单 -->
                        <!-- :index="'/' + subItem.path" 路由的跳转页面 -->
                        <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                            @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>

                    </el-submenu>

                </el-menu>
            </el-aside>
            <!-- 右侧主体 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                // 左侧菜单数据
                menulist: [],
                iconsObj: {
                    '125': 'el-icon-user-solid',
                    '103': 'el-icon-s-tools',
                    '101': 'el-icon-shopping-bag-1',
                    '102': 'el-icon-notebook-2',
                    '145': 'el-icon-platform-eleme'
                },
                // 是否折叠
                isCollapse: false,
                // 被激活的链接地址
                activePath: ''
            }
        },
        created() {
            this.getMenuList()
            this.activePath = window.sessionStorage.getItem('activePath')
        },
        methods: {
            logout() {
                // 1. 清空token
                window.sessionStorage.clear();
                // 2. 跳转到指定页面
                this.$router.push('/login');

            }, // 获取所有的菜单
            async getMenuList() {
                const {
                    data: res
                } = await this.$http.get('menus')
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.menulist = res.data
                console.log(res)
            },
            // 点击按钮，切换菜单的折叠与展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
            },
            // 保存链接的激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
                this.activePath = activePath
            }
        }

    }
</script>

<style lang="less" scoped>
    .home_container {
        height: 100%;
    }

    .home_header {
        padding-left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 140px !important;
        background-color: #bbe6d6;

        .home_icon {
            display: flex;
            align-items: center;
        }

        img {
            border-radius: 50%;
            height: 126px;
        }



        span {
            margin-left: 75px;
            color: #ffffff;
            font-size: 36px;
        }
    }

    .el-aside {
        background-color: #e4f5ef;

        .el-menu {
            border-right: none;
        }
    }

    .el-submenu span {
        font-size: 18px;
    }


    .el-main {
        background-color: #c8ebdf;
    }

    .toggle-button {
        color: black;
        text-align: center;
        font-size: 21px;
        height: 40px;
        line-height: 40px;
        background-color: rgb(168, 219, 200);
        cursor: pointer
    }
</style>