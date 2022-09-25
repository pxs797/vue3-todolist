<template>
  <playground>
    <div class="login shadow flex area">
      <h3 class="title">Your name</h3>
      <input type="text" class="input" v-model="username">
      <button class="button shadow" @click="toPath">submit</button>
    </div>
  </playground>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { getStorage, setStorage } from '../../utils'
const router = useRouter()

const username = ref<string>('')

function toPath(): void {
  if (!username.value) {
    alert('your name can not empyt')
    return
  }
  setStorage('token', username.value)
  const user = getStorage(username.value)
  if (!user) {
    setStorage(username.value, [])
  }
  router.push({
    name: 'todolist'
  })
}
</script>

<style scoped>
.login {
  flex-direction: column;
  width: 80%;
  max-width: 300px;
  height: 200px;
}
.title {
  color: #fff;
}
</style>
