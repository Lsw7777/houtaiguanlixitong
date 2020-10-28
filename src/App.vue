<template>
  <!-- 省略了html，body这些标签，但是f12还是能看到 -->
  <div id="app">
    <router-view></router-view>
    <!-- 路由占位符，由路由规则匹配到的组件将显示在这 -->
  </div>
</template>

<script>
export default {
  // export default 表示可以导出的文件，一个模块只能用一次
  name: 'app'
}
</script>

<style>
</style>
