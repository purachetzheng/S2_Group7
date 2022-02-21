<script setup>
import { ref, reactive } from 'vue';
const users = reactive([
    {
        id: 1,
        name: 'Phumin Chumphu',
        email: 'chumphu.phumin@gmail.com',
        status: 'Active',
    },
    {
        id: 2,
        name: 'Purachet Zheng',
        email: 'zheng.purachet@gmail.com',
        status: 'Active',
    },
    {
        id: 3,
        name: 'Yuttasart Prajaksuwan',
        email: 'oat.yuttasart@gmail.com',
        status: 'Active',
    },
]);
const newUserID = ref('');
const newUserName = ref('');
const addNew = () => {
    users.push({
        id: newUserID.value,
        name: newUserName.value,
    });
};
const delUser = (id) => {
    console.log(id);
    users.splice(
        users.findIndex((ele) => ele.id == id),
        1
    );
};
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
                                class="transition ease-in-out duration-300 hover:bg-gray-200"
                                v-for="(user, i) in users"
                            >
                                <td class="px-6 py-2">
                                    <div class="flex items-center">
                                        <!-- <div class="flex-shrink-0 h-10 w-10">
                                        <img
                                            class="h-10 w-10 rounded-full"
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                            alt=""
                                        />
                                    </div> -->
                                        <div class="">
                                            {{ user.name }}
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-2">{{ user.email }}</td>
                                <td class="px-6 py-2">
                                    <span
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                    >
                                        {{ user.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-2">12 / 01 / 2022</td>
                                <td class="px-6 py-2">
                                    <button
                                        class="btn-edit mr-2"
                                        @click="delUser(user.id)"
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
                                    <button
                                        class="btn-del"
                                        @click="delUser(user.id)"
                                    >
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
                            <tr>
                                <td class="px-6 py-2">
                                    <input
                                        class="bg-gray-300 rounded-md p-1 pl-3 w-full"
                                        type="text"
                                        placeholder="Input Text"
                                    />
                                </td>
                                <td class="px-6 py-2">
                                    <input
                                        class="bg-gray-300 rounded-md p-1 pl-3 w-full"
                                        type="text"
                                        placeholder="Input Email"
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
            </div> -->
            </div>
        </div>

        <!-- footer -->
        <!-- <div class="p-10 bg-gray-500">
            <h2>footer</h2>
        </div> -->
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>
