<template>
    <div>
        <!-- 实现退出功能 -->
        <el-button type="danger" @click="logout">退出</el-button>
    </div>
</template>

<script>
    export default {
        methods: {
            logout() {
                // 1. 清空token
                window.sessionStorage.clear();
                // 2. 跳转到指定页面
                this.$router.push('/login');

            }
        }

    }
</script>

<style lang="stylus" scoped>

</style>