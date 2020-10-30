<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- :to 路由跳转对象，同 vue-router 的 to -->
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-table :data="rightsList" border stripe>
                <!-- :data="rightsList" 绑定下面data中的rightsList:[]中的数据 -->
                <!-- 用prop属性来对应对象中的键名即可填入数据，如prop="authName" 将数据写入具体表格-->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                        <el-tag type="warning" v-else>三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    // 在使用组件化的项目中使用的是如下形式，其实这就是一个VUE实例
    export default {
        data() {
            //   这里的data是一个函数，return就是把里面的数据源返回给data本身
            // 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件
            return {
                rightsList: []
                //                 authName: "获取角色详情"
                //                 id: 139
                //                 level: "2"
                //                 path: "roles"
                //                 pid: 111
                //                 这是服务器传输来的实际数据
            }
        },
        //  created:在实例创建完成后被立即调用，在模板渲染成html前调用，通常用来初始化某些属性值。
        // mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
        // 以上两个都属于生命周期钩子，钩子的 this 指向调用它的 Vue 实例
        // methods:{} 中的方法都需要主动去触发，比如点击click之类的。
        // computed:{} 计算属性，对数据进行一定的操作
        // created(){}、mounted(){} 里面的代码都是自动去执行的，即vue生命周期到了哪一步就直接去执行对应钩子函数里面的代码了，无需手动去执行
        // created中主要放初始化获取数据之类，mounted()中挂载到具体的DOM节点
        // 所有的方法都应该在methods里定义，然后在created或者mounted里 使用this调用方法，用这种方式实现初始化
        created() {
            this.getRightsList()
            // 获取权限，在这用this调用了这个函数来获取了数据，上面的data中的rightlist才能响应到数据
            // data是一个函数，里面的this指向vue实例
        },
        methods: {
            // 在methods里定义具体方法，在created里面调用，获取权限列表
            async getRightsList() {
                const {
                    data: res
                    //  2 -从this.$http.get中返回一个数据对象，内容为data，重命名为res
                } = await this.$http.get('rights/list')
                // 1 -通过 this.$http.get发起请求

                // 添加await之后 当前的await 返回结果之后才会执行后面的代码
                // async/await使得异步代码看起来像同步代码，不需要写.then
                // async后面的函数会隐式的返回一个promise，该promise的resolve值就是函数return的值
                if (res.meta.status !== 200) {
                    // 3 -判断这次请求是否失败，如果返回值不是200，则失败
                    return this.$message.error('获取权限列表失败！')
                    // this.$message是element ui 提供的一个提示的组件
                    // 这里的return返回一个值，同时退出函数，所以如果return后面被执行则直接退出函数，下面的函数就不会执行了
                }
                this.rightsList = res.data
                // 通过这里赋值，使上面的rightList: []中拥有了服务器传输的数据
                // 如果上面的if(){}不执行,则执行此处，else可以省略
                console.log(this.rightsList)
                // 打印一下，可以在F12中确认一下

            }
        }
    }
</script>
<style lang="less" scoped>

</style>