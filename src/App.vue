<script setup>
import { ref, reactive } from 'vue'
const users = reactive([
  {
    id: 1,
    name: 'tester1',
  },
  {
    id: 2,
    name: 'tester2',
  },
  {
    id: 3,
    name: 'tester3',
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

      <div class="bg-orange-500 p-10 sm:w-full lg:w-9/12">
        <h2>Table</h2>
        <!-- <table class="table-auto">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table> -->
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
