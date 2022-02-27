<script setup>
import { ref, reactive, nextTick, computed } from "vue";
const newEmail = reactive([])
const inputTagList = reactive([])
const hasTagInput = reactive([])
//ใส่ไว้ก่อน แก้ warning ดู console ยาก
const editValue = false
const newUsers =  reactive({name: '', email: '', status: ''})

if(JSON.parse(localStorage.getItem("users")) == null) localStorage.setItem("users", JSON.stringify([]))

let Users = reactive({
  users: JSON.parse(localStorage.getItem("users")),
  addUser(user) {
    this.users.push({
      name: user.name,
      email: user.email,
      status: user.email.length===0? 'Incomplete':'Active',
      tag: [],
      //? date: (hint)ไปสร้าง func ที่ return วันเวลาตามรูปแบบ ว/ด/ป แล้วเอามาเรียกตรงนี้
    });
    this.setLocalStorage()
  },
  removeUser(index) {
    // this.users.splice(this.users.findIndex((ele) => ele == user),1);
    this.users.splice(index,1);
    this.setLocalStorage()
  },
  checkUser(user) {
    const isNameEmpty = user.name.length === 0
    const isEmailEmpty = user.email.length === 0
    user.status = isNameEmpty || isEmailEmpty ? "incomplete" : "Active"
  },
  setEmail(event, user){
    console.log(event.target.parentNode)
    const inputEmail = event.target.value
    const isEmailCorrect = checkEmailPattern(inputEmail)
    isEmailCorrect ? user.email = inputEmail : alert(`Please enter a valid email`)
    event.target.value = ''
    this.checkUser(user)
    this.setLocalStorage()
  },
  addTag(event, user){
    user.tag.push(event.target.value)
    event.target.value = ''
    this.setLocalStorage()
  },
  setLocalStorage(){
    localStorage.setItem("users", JSON.stringify(this.users))
  },
})

const submit = () => {
  const isNameEmpty = newUsers.name.length === 0
  const isEmailEmpty = newUsers.email.length === 0
  const isEmailCorrect = checkEmailPattern(newUsers.email)
  if(isNameEmpty){
    alert(`Please enter at least your name.`)
  }
  else if(isEmailCorrect || isEmailEmpty) {
    Users.addUser(newUsers);
    newUsers.name = '';
    newUsers.email = '';
  }
  else if(!isEmailCorrect) {
    alert(`Please enter a valid email`)
    newUsers.email = '';
  }
};

const checkEmailPattern = (email) => {
  if (/\S+@\S+\.\S+/i.test(email)) {
    return true
  } else {
    return false
  }
};

const showTagInput = (index) => {
  hasTagInput[index] = '';
  nextTick(() => inputTagList[index].focus())
}

const test = (i) => {
  alert('This is Test : ' + i)
}
</script>

<template>
  <div class="bg-gray-700 min-h-screen">
    <!-- header -->
    <div class="bg-teal-600 h-16 flex justify-center items-center">
      <h2 class="text-3xl text-white">Student Management</h2>
    </div>

    <!-- content & aside -->
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="overflow-auto rounded-lg m-5">
          <table class="min-w-full">
            <thead class="bg-teal-500 uppercase">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs tracking-wider tex"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs tracking-wider"
                >
                  Tag
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs tracking-wider"
                >
                  Add date
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs tracking-wider"
                >
                  edit
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(user, i) in Users.users"
                :key="i"
                class="transition ease-in-out duration-300 hover:bg-gray-200 text-black"
              >
                <td class="px-6 py-2">
                  <div class="flex items-center">
                    <!-- <div class="flex-shrink-0 h-10 w-10"></div> -->
                    <div v-if="!editValue">
                      <span>{{ user.name }}</span>
                    </div>
                    <div v-if="editValue">
                      <input v-model="user.name" type="text" />
                    </div>
                  </div>
                </td>
                <td v-if="user.email.length !== 0" class="px-6 py-2">
                  {{ user.email }}
                </td>
                <td v-else class="px-6 py-2">
                  <input
                    class="bg-gray-300 rounded-md p-1 pl-3 w-full"
                    type="text"
                    placeholder="Input Email"
                    @keydown.enter="Users.setEmail($event, user)"
                  />
                </td>
                <!-- Tag -->
                <td class="px-6 py-2">
                  <button 
                    class="px-2 mx-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-blue-800" 
                    v-for="(tag, j) in user.tag"
                    @click=""
                  >
                    {{tag}}
                  </button>
                  <button class="btn px-2 mx-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-blue-800" 
                    v-if="hasTagInput[i]===undefined" 
                    @click="showTagInput(i)"
                    >+</button>
                  <input 
                    type="text" 
                    class="btn px-2 mx-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-blue-800" 
                    :ref="el => inputTagList[i] = el"
                    @keydown.enter="Users.addTag($event,user)"
                    v-else
                  />
                </td>
                <td class="px-6 py-2">
                  <span
                    :class="[
                      user.status == 'Active'
                        ? [
                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800',
                          ]
                        : [
                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800',
                          ],
                    ]"
                    >{{ user.status }}</span
                  >
                </td>
                <td class="px-6 py-2">12 / 01 / 2022</td>

                <!-- Edit Button -->
                <td class="px-6 py-2">
                  <button
                    class="btn-edit mr-2"
                    @click="Users.editUser(user.name)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button class="btn-del" @click="Users.removeUser(i)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>

              <!-- Add New User Data -->
              <tr>
                <td class="px-6 py-2">
                  <input
                    v-model="newUsers.name"
                    class="bg-gray-300 rounded-md p-1 pl-3 w-full text-black"
                    type="text"
                    placeholder="Input Text"
                    @keydown.enter="submit"
                  />
                </td>
                <td class="px-6 py-2">
                  <input
                    v-model="newUsers.email"
                    class="bg-gray-300 rounded-md p-1 pl-3 w-full text-black"
                    type="text"
                    placeholder="Input Email"
                    @keydown.enter="submit"
                  />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- sidebar -->
        <!-- <div class="bg-teal-500 p-10 sm:w-full lg:w-3/12">
                <h2>sidebar</h2>
                </div>-->
      </div>
    </div>

    <!-- footer -->
    <!-- <div class="p-10 bg-gray-500">
            <h2>footer</h2>
        </div>-->
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
