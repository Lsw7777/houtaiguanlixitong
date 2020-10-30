<template>
  <!-- 这里是根组件，最终会被渲染到index.html主页中 -->
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
    // name的作用：1 允许组件自身的递归调用，就是在当前组件中，调用组件自己
    //            2 当我们使用vue.js官方提供的调试工具调试时，可以看到组件的名称，更好地定位 
  }
</script>

<style>
</style>