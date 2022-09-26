<template>
  <playground>
    <div class="logout" @click="logout">logout</div>
    <div class="todolist shadow flex area">
      <h1 class="title">{{ title }} TODOS</h1>
      <input
        type="text"
        v-model="todo"
        class="input"
        @keydown.enter="addTodo"
        placeholder="enter to confirm"
      >
      <ul class="todos">
        <li class="todo flex" v-for="(item, index) in _todos" :key="index">
          <input
            class="checkbox"
            type="checkbox"
            v-model="item.done"
            :name="item.name"
            :id="index + 'todo'"
            @change="saveTodos"
          >
          <span :style="{ textDecoration: item.done ? 'line-through' : 'none' }">{{ item.name }}</span>
          <div class="del" @click="delTodo(index)">✕</div>
        </li>
      </ul>
      <footer class="footer flex" v-if="todos.length">
        <input
          class="checkbox"
          type="checkbox"
          v-model="allDone"
          @change="handleAllDone"
        >
        <ul class="options flex">
          <li
            v-for="(item, index) in options"
            :key="index"
            :style="{
              border: activeOptionIndex === index ? '2px solid #fff' : 'none'
            }"
            @click="activeOptionIndex = index"
          >
            {{ item.name }}
          </li>
        </ul>
        <span style="margin-left: auto; cursor: pointer;" @click="clearTodos">clear</span>
      </footer>
    </div>
  </playground>
</template>

<script setup lang="ts">
import { getStorage } from '../../utils'
import { ref, computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { removeStorage, setStorage } from '../../utils'
type Todo = {
  name: string,
  done: boolean
}
type Options = {
  name: string
}
const username:string = getStorage('token') || ''
const title = username.toLocaleUpperCase()
const stroageTodos:any = getStorage(username)
const todos = ref<Todo[]>(JSON.parse(stroageTodos) || [])
const todo = ref<string>('')
const allDone = ref<boolean>(false)
const activeOptionIndex = ref<number>(0)
const options = ref<Options[]>([
  { name: 'all' },
  { name: 'active' },
  { name: 'completed' }
])
const router = useRouter()
const _todos = computed(() => {
  switch (activeOptionIndex.value) {
    case 0:
      return todos.value
    case 1:
      return todos.value.filter(todo =>  todo.done === false )
    case 2:
      return todos.value.filter(todo => todo.done === true)
    default:
      return todos.value
  }
})
function addTodo() {
  if (!todo.value) {
    alert('todo can not empty')
    return
  }
  todos.value.push({ name: todo.value, done: false })
  todo.value = ''
  saveTodos()
}
function saveTodos() {
  setStorage(username, todos.value)
}
function handleAllDone() {
  todos.value.forEach(todo => {
    todo.done = allDone.value
  });
}
function clearTodos() {
  todos.value = []
  saveTodos()
}
function delTodo(index:number) {
  _todos.value.splice(index, 1)
  saveTodos()
}
function logout() {
  removeStorage('token')
  router.push({
    name: 'login'
  })
}
</script>

<style scoped>
.logout {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 4px;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
}
.todolist {
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  max-width: 500px;
  min-height: 300px;
  max-height: 80%;
  padding: 20px 0;
}
.title {
  color: #fff;
  margin-bottom: 10px;
}
.input {
  margin: 0 auto;
}
.input::placeholder {
  color: #fff;
  opacity: .5;
}
.todos {
  width: 70%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.todo {
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #fff;
  color: #fff;
}
.del {
  margin-left: auto;
  display: none;
  cursor: pointer;
}
.todo:hover .del {
  display: block;
}
.checkbox {
  position: relative;
  height: 50%;
  aspect-ratio: 1 / 1;
  border-radius: 5px;
  margin-right: 15px;
  appearance: none;
  background: #fff;
}
.checkbox:checked::before {
  content: '✓';
  position: absolute;
  top: 25%;
  left: 25%;
  height: 50%;
  aspect-ratio: 1 / 1;
}
.footer {
  justify-content: flex-start;
  width: 70%;
  height: 50px;
  color: #fff;
}
.options li {
  display: block;
  padding: 0 6px;
  margin-left: 10px;
  border-radius: 3px;
}
</style>
