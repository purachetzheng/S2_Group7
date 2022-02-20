<script setup>
import { ref,reactive } from 'vue'
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
    name: newUserName.value
  })
}
const delUser = (id) => {
  console.log(id)
  users.splice(users.findIndex(ele => ele.id == id),1)
}
</script>

<template>

  <div id="container">
    <div id="header">
      <input type="text" class="mr-2" v-model="newUserID" placeholder="id">
      <input type="text" class="mr-2" v-model="newUserName" placeholder="Name">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="addNew">+</button>
    </div>
    <div id="wrapper">
      <div id="content">
        <table class="table-auto">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,i) in users">
              <td>{{user.id}} </td>
              <td>{{user.name}} </td>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" @click="delUser(user.id)">-</button>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="navigation">
      <p><strong>2. Navigation Menu</strong></p>
      <h3>Styling Flex Container</h3>
      <ul>
        <li>flex-direction</li>
        <li>flex-wrap</li>
        <li>justify-content</li>
        <li>align-content</li>
        <li>align-items</li>
      </ul>
      <h3>Designing Flex Items</h3>
      <ul>
        <li>order</li>
        <li>align-self</li>
        <li>flex-grow</li>
        <li>flex-shrink</li>
        <li>flex-basis</li>
      </ul>
    </div>
    <div id="extra">
      <p><strong>3. Additional Stuff</strong></p>
      <h3>In this guide you will learn:</h3>
      <ul>
        <li>How to use CSS Flexbox to build modern layouts</li>
        <li>How to align items both vertically and horizontally</li>
        <li>How to order items within container</li>
        <li>And more</li>
      </ul>
    </div>
    <div id="footer"><p>Footer</p></div>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
div#header {
  position: relative;
  color: #292929;
  padding-left: 10px;
  background: #e0e0e0;
}

div#navigation {
  background: #7cb71c;
}

div#navigation li {
  list-style: none;
}

div#extra {
  background: #147fa9;
}

div#footer {
  background: #42444e;
  color: #fff;
}

div#footer p {
  padding: 20px 10px;
} 

div#content {
  float: left;
  width: 500px;
}

div#navigation {
  float: right;
  width: 200px;
}

div#extra {
  float: right;
  clear: right;
  width: 200px;
}

div#footer {
  clear: both;
  width: 100%;
}
</style>
