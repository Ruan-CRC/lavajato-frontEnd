<template>
  <div id="master">
    <div id="card">
      <div id="imgForm"><img src="@/assets/loginMain.webp" alt=""></div>
      <div id="form">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import 'style.scss';
</style>
