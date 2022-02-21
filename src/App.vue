<script setup>
import { ref, reactive } from 'vue'
const users = reactive([
  {
    id: 1,
    name: 'tester1',
    email: 'tester@t1',
    status: 'Active'
  },
  {
    id: 2,
    name: 'tester2',
    email: 'tester@t2',
    status: 'Active'
  },
  {
    id: 3,
    name: 'tester3',
    email: 'tester@t3',
    status: 'Active'
  },
])
const newUserID = ref('')
const newUserName = ref('')
const addNew = () => {
  users.push({
    id: newUserID.value,
    name: newUserName.value,
  })
}
const delUser = (id) => {
  console.log(id)
  users.splice(
    users.findIndex((ele) => ele.id == id),
    1
  )
}
</script>

<template>
  <div id="container" class="bg-gray-600 my-0 mx-auto">
    <!-- header -->
    <div class="bg-green-600 h-16 flex justify-center items-center">
      <h2 class="text-4xl text-green-100">head</h2>
    </div>

    <!-- content & aside -->
    <div class="lg:flex h-full item-center item-stretch">
      <div class="bg-orange-500 p-10 sm:w-full lg:w-9/12 flex flex-col">
        <table class="min-w-full divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left">Name</th>
              <th scope="col" class="px-6 py-3 text-left">Email</th>
              <th scope="col" class="px-6 py-3 text-left">Status</th>
              <th scope="col" class="px-6 py-3 text-left">Add date</th>
              <th scope="col" class="px-6 py-3 text-left">test</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, i) in users">
              <td class="px-6 py-3">{{user.name}}</td>
              <td class="px-6 py-3">{{user.email}}</td>
              <td class="px-6 py-3">{{user.status}}</td>
              <td class="px-6 py-3">11/11/11</td>
              <td class="px-6 py-3"><button class="btn-simple" @click="delUser(user.id)">-</button></td>
              
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-teal-500 p-10 sm:w-full lg:w-3/12">
        <h2>sidebar</h2>
      </div>
    </div>
    <!-- footer -->
    <div class="p-10">
      <h2>footer</h2>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
