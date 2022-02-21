<script setup>
import { ref, reactive } from 'vue'
class user {
  constructor(name = '', email = '') {
    this._name = name
    this._email = email
    this._status = 'Active'
    this._tag = []
  }
  get name() {
    return this._name
  }
  set name(name) {
    this._name = name
  }
  get email() {
    return this._email
  }
  set email(email) {
    this._email = email
  }
}

const newUserName = ref('')
const newUserEmail= ref('')
let newUsers = new user()

let Users = reactive({
  users: [],
  addUser(user) {
    Users.users.push(user)
  },
  delUser(id) {
    Users.users.splice(
      Users.users.findIndex((ele) => ele.id == id),
      1
    )
  },
})

let user1 = new user('tester1', 'tester@t1')
let user2 = new user('tester2', 'tester@t2')
let user3 = new user('tester3', 'tester@t3')
let user4 = new user('tester4', 'tester@t4')
let user5 = new user('tester5', 'tester@t5')
Users.addUser(user1)
Users.addUser(user2)
Users.addUser(user3)
Users.addUser(user4)
Users.addUser(user5)
const summit = () => {
  console.log('s')
  newUsers.name = newUserName.value
  newUsers.email = newUserEmail.value
  Users.addUser(newUsers)
  newUsers = new user()
}
// const addNew = () => {
//   users.push({
//     id: newUserID.value,
//     name: newUserName.value,
//   })
// }

const test = () => {
  console.log('test')
}
</script>

<template>
  <div id="container" class="bg-gray-600 my-0 mx-auto">
    <!-- header -->
    <div class="bg-green-600 h-16 flex justify-center items-center">
      <h2 class="text-4xl text-green-100">head</h2>
      <input type="text" class="mr-2" v-model="newUserName" placeholder="Name" />
      <input
        type="text"
        class="mr-2"
        v-model="newUserEmail"
        placeholder="Email"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        @click="addNew"
      >
        +
      </button>
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
              <th scope="col" class="px-6 py-3 text-left">Tag</th>
              <th scope="col" class="px-6 py-3 text-left">test</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, i) in Users.users">
              <td class="px-6 py-3">{{ user.name }}</td>
              <td class="px-6 py-3">{{ user.email }}</td>
              <td class="px-6 py-3">{{ user.status }}</td>
              <td class="px-6 py-3">11/11/11</td>
              <td class="px-6 py-3">Tag</td>
              <td class="px-6 py-3">
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  @click="Users.delUser(user.id)"
                >
                  -
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" @keydown.enter="summit" v-model="newUserName" />
              </td>
              <td>
                <input type="text" @keydown.enter="summit" v-model="newUserEmail"/>
              </td>
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
