<template>
  <div class="layout">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: url("../src/assets/img/bg6.jpg");
  background-position: center top;
  background-size: cover;
  font-family: Arial, Helvetica, sans-serif;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 1200px;
    height: 800px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 2;
    box-sizing: border-box;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      -webkit-filter: blur(10px);
      -moz-filter: blur(10px);
      -ms-filter: blur(10px);
      -o-filter: blur(10px);
      filter: blur(10px);
      z-index: -3;
      margin: -30px;
      background-image: url("../src/assets/img/bg6.jpg");
      background-position: center top;
      background-size: cover;
      background-attachment: fixed;
    }
  }
}
</style>