<script setup>
import { ref, reactive } from "vue";
let newEmail = reactive([]);
class User {
  constructor(name = "", email = "") {
    this._name = name;
    this._email = email;
    this._status = "";
    this._tag = [];
    this.checkUser();
  }
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
    this.checkUser();
  }
  get email() {
    return this._email;
  }
  set email(email) {
    if (checkEmailPattern(email)) {
      this._email = email
      this.checkUser()
    } else {
      if(email.length !== 0) alert(`please enter email`)
    }
  }
  get status() {
    return this._status;
  }
  set status(status) {
    this._status = status;
  }
  get tag() {
    return this._tag;
  }
  // addTag(tag){
  //     this._tag.push(tag)
  // }
  // delTag(tag){
  //     this._tag.splice(
  //         Users.users.findIndex(ele => ele.name == name),
  //         1
  //     )
  // }
  checkUser() {
    if (this.name === "" || this.email === "") {
      this.status = "Incomplete";
    } else {
      this.status = "Active";
    }
  }
}

const newUserName = ref("");
const newUserEmail = ref("");
let newUsers = new User();

let Users = reactive({
  users: [],
  addUser(user) {
    if(checkEmailPattern(user.email) || user.email.length === 0){
      Users.users.push(user);
    }
  },
  delUser(name) {
    Users.users.splice(
      Users.users.findIndex((ele) => ele.name == name),
      1
    );
  },
  findUser(index, e) {
    console.log(Users.users.find((ele, i) => i == index));
    console.log(e);
    return Users.users.find((ele, i) => i == index);
    // console.log('user_'+index)
    // console.log(user_5.value)
  },
  checkUser(index) {
    if (Users.findUser(index).name == "" || Users.findUser(index).email == "") {
      Users.findUser.status = "incomplete";
    } else {
      Users.findUser.status = "Active";
    }
  },
});

const submit = () => {
  console.log("s");
  if (newUserEmail.value != "" || newUserName.value != "") {
    newUsers.name = newUserName.value;
    newUsers.email = newUserEmail.value;
    Users.addUser(newUsers);
    newUsers = new User();
    if(checkEmailPattern(newUserEmail.value)) newUserName.value = "";
    newUserEmail.value = "";
  }
};

//new way make code look better
const checkEmailPattern = (email) => {
  if (/([^\W]+)@([^\W]+).([^\W]+)/i.test(email)) {
    return true
  } else {
    return false
  }
};

//old way to change(hard code)
// const checkEmailPattern = (i, email) => {
//   if (/([^\W]+)@([^\W]+).([^\W]+)/i.test(email)) {
//     Users.findUser(i).email = newEmail[i];
//   } else {
//     newEmail[i] = "";
//     alert(`please enter email`);
//   }
// };

//* dummy
let user1 = new User("TestDummy1", "TestDummy@t1.com");
let user2 = new User("TestDummy2", "TestDummy@t2.com");
let user3 = new User("TestDummy3", "TestDummy@t3.com");
let user4 = new User("TestDummy4", "TestDummy@t4.com");
let user5 = new User("TestDummy5", "TestDummy@t5.com");
let user6 = new User("TestDummy6");
let user7 = new User("TestDummy7");
Users.addUser(user1);
Users.addUser(user2);
Users.addUser(user3);
Users.addUser(user4);
Users.addUser(user5);
Users.addUser(user6);
Users.addUser(user7);
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
                class="transition ease-in-out duration-300 hover:bg-gray-200"
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
                <td v-if="user.status == 'Active'" class="px-6 py-2">
                  {{ user.email }}
                </td>
                <td v-else class="px-6 py-2">
                  <input
                    v-model="newEmail[i]"
                    class="bg-gray-300 rounded-md p-1 pl-3 w-full"
                    type="text"
                    placeholder="Input Email"
                    @keydown.enter="user.email=newEmail[i]"
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
                  <button class="btn-del" @click="Users.delUser(user.name)">
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
                    v-model="newUserName"
                    class="bg-gray-300 rounded-md p-1 pl-3 w-full"
                    type="text"
                    placeholder="Input Text"
                    @keydown.enter="submit"
                  />
                </td>
                <td class="px-6 py-2">
                  <input
                    v-model="newUserEmail"
                    class="bg-gray-300 rounded-md p-1 pl-3 w-full"
                    type="text"
                    placeholder="Input Email"
                    @keydown.enter="submit"
                  />
                </td>
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
