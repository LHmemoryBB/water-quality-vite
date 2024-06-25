<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script  setup></script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  overflow-y: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgb(235, 245, 245);
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(65, 50, 50, 0.514);
}
</style>
