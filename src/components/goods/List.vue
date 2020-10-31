<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图区域 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <!-- 实现搜索商品功能，首先用v-model绑定下面的查询参数数据query，让输入内容作为参数发给服务器 -->
                    <!-- 然后绑定一个点击事件，调用获取列表的函数，服务器就根据参数传回搜索要求的数据 -->
                    <!-- 实现清空搜索功能  clearable @clear="getGoodsList" 点击后重新获取商品列表-->
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
                        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goAddpage">添加商品</el-button>
                    <!-- 绑定一个跳转到添加商品的页面 -->
                </el-col>
            </el-row>
            <!-- table表格区域 -->
            <el-table :data="goodslist" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
                <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
                <el-table-column label="创建时间" prop="add_time" width="140px">
                    <template slot-scope="scope">
                        {{scope.row.add_time | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                            @click="removeById(scope.row.goods_id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <!-- 123456可以选页 一般写在表格的后面，底部 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="total" background>
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            // data节点：私有数据节点，这里面的数据只能被本组件使用
            return {
                queryInfo: {
                    query: '',
                    // 查询参数对象，输入什么内容就匹配什么内容
                    pagenum: 1,
                    pagesize: 10

                },
                // 商品列表
                goodslist: [],
                // 总数据条数
                total: 0
            }
        },
        created() {
            this.getGoodsList()
            // 获取服务器数据第一步在生命周期函数created中调用 发起请求函数
        },
        // created生命周期函数
        methods: {
            // 事件处理函数节点
            // 获取服务器数据第二步，在methods中定义这个函数具体内容
            async getGoodsList() {
                const {
                    data: res
                    // data是服务器返回的数据对象，通过解构赋值将data中的数据赋值给res
                    // 这是通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量。
                } = await this.$http.get('goods', {
                    params: this.queryInfo
                    // 获取服务器数据第三步，需要向服务器提交三个参数，在data中的return中先定义好，减少请求的代码量
                    // axios.get('http://localhost:3000/axios', { params: { id: 789 }})
                    // 传统的get方式是  url  ?  的形式传递参数 axios.get('http://localhost:3000/axios?id=123')
                    // id=123 是要求传递的参数
                    // restful 形式传递参数直接写在/后面  axios.get('http://localhost:3000/axios/123')
                })

                if (res.meta.status !== 200) {
                    return this.$message.error('获取商品列表失败！')
                }

                this.$message.success('获取商品列表成功！')
                console.log(res.data)
                this.goodslist = res.data.goods
                // 将需要的数据放入return中
                this.total = res.data.total
            },

            handleSizeChange(newSize) {
                this.queryInfo.pagesize = newSize
                this.getGoodsList()
            },
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage
                this.getGoodsList()
            },
            async removeById(id) {
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该商品, 是否继续?',
                    '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).catch(err => err)

                if (confirmResult !== 'confirm') {
                    return this.$message.info('已经取消删除！')
                }

                const {
                    data: res
                    // 服务器返回的是promise，被解构赋值为data，也就是res
                } = await this.$http.delete(`goods/${id}`)

                if (res.meta.status !== 200) {
                    return this.$message.error('删除失败！')
                }

                this.$message.success('删除成功！')
                this.getGoodsList()
            },
            goAddpage() {
                this.$router.push('/goods/add')
            }
        }

    }
</script>

<style lang="less" scoped>
    // 样式节点
</style>