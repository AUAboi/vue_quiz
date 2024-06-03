<script setup>
import QuestionForm from "@/components/admin/QuestionForm";
import QuestionTable from "@/components/admin/QuestionTable";
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import { useSnackStore } from "@/store/snack";


const users = ref([]);

const getUsers = () => {
    axios.get("api/users/all").then((response) => {
        users.value = response.data;
    });
};

const form = reactive({
    file: null
})

const submit = () => {
    let f = new FormData()
    f.append('file', form.file)
    axios
        .post("api/users-import", f)
        .then((res) => {
            form.file = null
            getUsers()

            snackStore.snack({
                text: res.data,
                delay: 1000,
            });

        })
        .catch((error) => {
            if (error.response.data.errors) {
                snackStore.snack({
                    text: error.response.data.message,
                    delay: 1000,
                });
            }
        });
};
const snackStore = useSnackStore();

const deleteEntry = async (id) => {
    await axios.delete(`api/user/${id}`);
    snackStore.snack({
        text: "Deleted Successfully",
        delay: 500,
    });
    getUsers()
};

onMounted(() => {
    getUsers();
});
</script>

<template>
    <div>
        <h3 class="text-center my-10 text-2xl">
            Teacher Portal
        </h3>
        <router-link class="text-center block underline text-blue-500" to="/admin">Manage Questions</router-link>

        <div class="flex flex-col gap-5 items-center my-10">
            <p>Upload users in bulk</p>
            <input type="file" @change="e => form.file = e.target.files[0]">

            <button @click.prevent="submit"
                class="text-white w-fit bg-sky-900 border-0 py-2 px-8 focus:outline-none disabled:cursor-not-allowed">
                Submit
            </button>
        </div>
        <div class="bg-white rounded-md shadow overflow-x-auto mx-4">
            <table class="w-full whitespace-nowrap">
                <tr class="bg-gray-800">
                    <th class="px-16 py-2">
                        <span class="text-gray-300">Id</span>
                    </th>
                    <th class="px-16 py-2">
                        <span class="text-gray-300">Question</span>
                    </th>


                    <th colspan="5" class="px-16 py-2">
                        <span class="text-gray-300">Option</span>
                    </th>

                    <th class="px-16 py-2">
                        <span class="text-gray-300">Action</span>
                    </th>
                </tr>
                <tr v-for="user in users" :key="user.id" class="bg-white border-4 border-gray-200">
                    <td class="px-16 py-2 flex flex-row items-center">
                        <span class="text-center ml-2 font-semibold">{{ user.id }}</span>
                    </td>
                    <td class="px-16 py-2">
                        <span class="text-center ml-2 font-semibold">{{
                            user.name
                        }}</span>
                    </td>

                    <td class="px-16 py-2">
                        <button @click="deleteEntry(user.id)"
                            class="bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">
                            DELETE
                        </button>
                    </td>
                </tr>
                <tr v-if="users.length === 0">
                    <td class="border-t px-6 py-4" colspan="4">No entry found.</td>
                </tr>
            </table>
        </div>
    </div>
</template>
