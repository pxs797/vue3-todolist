<template>
  <div class="playground">
    <slot></slot>
  </div>
</template>

<style scoped>
.playground {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 60% 90%, pink, transparent 60%), radial-gradient(circle at 20px 20px, pink, transparent 25%) skyblue;
  overflow: hidden;
}
</style>
