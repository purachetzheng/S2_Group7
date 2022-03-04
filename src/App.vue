<script setup>
import { computed, reactive, nextTick } from 'vue';
// const newEmail = reactive([])
const inputTagList = reactive([])
const hasTagInput = reactive([])
const hasEditName = reactive([])
const editNameList = reactive([])
const editEmail = reactive([])
const newUsers = reactive({ name: '', email: '', status: '' })
const hasMouseTag = reactive({ x: -1, y: -1 })
const editEmailList = reactive([])

if (JSON.parse(localStorage.getItem('users')) == null) localStorage.setItem('users', JSON.stringify([]));

let Users = reactive({
  users: JSON.parse(localStorage.getItem('users')),
  addUser(user) {
    this.users.push({
      name: user.name,
      email: user.email,
      status: user.email.length === 0 ? 'Incomplete' : 'Active',
      tag: [],
      date: new Date().toLocaleString('th-TH')
    });
    // this.setLocalStorage();
  },
  removeUser(index) {
    // this.users.splice(this.users.findIndex((ele) => ele == user),1);
    this.users.splice(index, 1);
    // this.setLocalStorage();
  },
  checkUser(user) {
    const isNameEmpty = user.name.length === 0;
    const isEmailEmpty = user.email.length === 0;
    user.status = isNameEmpty || isEmailEmpty ? 'incomplete' : 'Active';
  },
  setEmail(event, user) {
    const inputEmail = event.target.value;
    const isEmailCorrect = checkEmailPattern(inputEmail);
    isEmailCorrect ? (user.email = inputEmail) : alert(`Please enter a valid email`);
    event.target.value = '';
    this.checkUser(user);
    // this.setLocalStorage();
  },
  addTag(event, user) {
    user.tag.push(event.target.value);
    event.target.value = '';
    // this.setLocalStorage();
  },
  removeTag(user, index) {
    user.tag.splice(index, 1);
    // this.setLocalStorage();
  },
  setLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  },
  setUserName(event, user, index){
    const inputName = event.target.value;
    const isNameEmpty = inputName.length === 0;
    if(!isNameEmpty){
      user.name = inputName;
      hasEditName[index] = false; 
      // this.setLocalStorage()
    }
  }
});

const amountUsers = computed(() => Users.users.length);
const autoSetLocalStorage = computed(()=> Users.setLocalStorage())

const submit = () => {
  const isNameEmpty = newUsers.name.length === 0;
  const isEmailEmpty = newUsers.email.length === 0;
  const isEmailCorrect = checkEmailPattern(newUsers.email);
  if (isNameEmpty) {
    alert(`Please enter at least your name.`);
  } else if (isEmailCorrect || isEmailEmpty) {
    Users.addUser(newUsers);
    newUsers.name = '';
    newUsers.email = '';
  } else if (!isEmailCorrect) {
    alert(`Please enter a valid email`);
    newUsers.email = '';
  }
};

const checkEmailPattern = (email, mode) => {
  if (/\S+@\S+\.\S+/i.test(email)) {
    return true;
  } else {
    if(mode) alert('Please enter a valid email')
    return false;
  }
};

const showTagInput = (index) => {
  hasTagInput[index] = '';
  nextTick(() => inputTagList[index].focus());
};

const showNameInput = (user, index) => {
  hasEditName[index] = true;
  nextTick(() => editNameList[index].value = user.name);
}

const checkDate = (user) => {
  const userTime = user.date.match(/\d{2}:\d{2}:\d{2}/i)[0];
  const userDate = user.date.match(/(\d{1,2})[/](\d{1,2})[/](\d{4})/i)[0];
  const today = new Date().toLocaleDateString('th-TH')
  return userDate === today ? userTime : userDate;
}

</script>

<template>
  <!-- แก้ error ที่ func autoSetLocalStorage() ไม่มีใครเรียก -->
  <input type="hidden" @click="autoSetLocalStorage">
  <div class="bg-gray-700 min-h-screen">
    <!-- Header -->
    <div class="bg-teal-600 h-16 flex justify-center items-center">
      <h2 class="text-3xl text-white">User Management</h2>
      <div class="bg-teal-600 text-white absolute right-6">Amount of Users : {{ amountUsers }}</div>
    </div>

    <!-- Content Table -->
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="overflow-auto rounded-lg m-5">
          <table class="md:table-fixed md:w-full sm:min-w-full sm:table-fixed">
            <thead class="bg-teal-500 uppercase">
              <tr>
                <th scope="col" class="w-1/5 px-6 py-3 text-left text-xs tracking-wider text-white">Name</th>
                <th scope="col" class="w-1/5 px-6 py-3 text-left text-xs tracking-wider text-white">Email</th>
                <th scope="col" class="w-auto px-6 py-3 text-left text-xs tracking-wider text-white">Tag</th>
                <th scope="col" class="w-28 px-6 py-3 text-left text-xs tracking-wider text-white">Status</th>
                <th scope="col" class="w-40 px-6 py-3 text-left text-xs tracking-wider text-white">Add Date</th>
                <th scope="col" class="w-40 px-6 py-3 text-left text-xs tracking-wider text-white">Edit</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- Name -->
              <tr v-for="(user, i) in Users.users" :key="i" class="transition ease-in-out duration-300 hover:bg-gray-200 text-black">
                <td class="px-6 py-2">
                  <div class="flex items-center">
                    <!-- <div class="flex-shrink-0 h-10 w-10"></div> -->
                    <div v-if="!hasEditName[i]" @dblclick="showNameInput(user, i)">
                      <span>{{ user.name }}</span>
                    </div>
                    <div v-else>
                      <input
                        :ref="el => editNameList[i] = el"
                        class="bg-gray-300 rounded-md p-1 pl-3 w-full text-black"
                        type="text"
                        placeholder="Input Name"
                        @keyup.enter="user.name.length > 0 ? Users.setUserName($event, user, i) : ''"
                        
                      />
                    </div>
                  </div>
                </td>
                <!-- Email -->
                <td v-if="user.email.length !== 0 && !editEmail[i]" class="px-6 py-2" @dblclick="editEmail[i] = true">
                  {{ user.email }}
                </td>
                <!-- หลังจาก dblclick จะขึ้น input สำหรับแก้ไข -->
                <td v-else-if="editEmail[i]" class="px-6 py-2">
                  <input
                    :ref="el => editEmailList[i] = el"
                    v-model="user.email"
                    class="bg-gray-300 rounded-md p-1 pl-3 w-full"
                    type="text"
                    placeholder="Input Email"
                    @keydown.enter="Users.setEmail($event, user)"
                    @keyup.enter="checkEmailPattern(user.email) ? editEmail[i] = false : ''"
                  />
                </td>
                <td v-else class="px-6 py-2">
                  <input
                    :ref="(el) => (editEmailList[i] = el)"
                    class="bg-gray-300 rounded-md p-1 pl-3 w-full"
                    type="text"
                    placeholder="Input Email"
                    @keydown.enter="Users.setEmail($event, user)"
                  />
                </td>
                
                <!-- Tag -->
                <td class="px-6 py-2">
                  <button
                    v-for="(tag, j) in user.tag"
                    :key="j"
                    class="px-2 mx-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-blue-800"
                    @mouseenter="
                      hasMouseTag.x = i;
                      hasMouseTag.y = j;
                    "
                    @mouseleave="
                      hasMouseTag.x = -1;
                      hasMouseTag.y = -1;
                    "
                  >
                    {{ tag }}
                    <svg
                      v-show="hasMouseTag.x == i && hasMouseTag.y == j"
                      class="my-auto -mr-1 h-4 w-4 text-red-700"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      @click="Users.removeTag(user, j)"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <!-- <svg class="absolute right-1 top-0.5 h-4 w-4 text-red-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg> -->
                  </button>
                  <button
                    v-if="hasTagInput[i] === undefined"
                    class="btn px-2 mx-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-blue-800"
                    @click="showTagInput(i)"
                  >
                    +
                  </button>
                  <input
                    v-else
                    :ref="(el) => (inputTagList[i] = el)"
                    type="text"
                    class="btn px-2 mx-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-blue-800"
                    @keydown.enter="Users.addTag($event, user)"
                  />
                </td>

                <!-- Status -->
                <td class="px-6 py-2">
                  <span
                    :class="[
                      user.status == 'Active'
                        ? ['px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800']
                        : ['px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'],
                    ]"
                    >{{ user.status }}</span
                  >
                </td>

                <!-- Date -->
                <td class="px-6 py-2">{{ checkDate(user) }}</td>

                <!-- Edit Button -->
                <td class="px-6 py-2">
                  <!-- <button class="btn-edit mr-2" @click="Users.editUser(user.name)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button> -->
                  <button class="btn-del" @click="Users.removeUser(i)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
                <td colspan="4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
