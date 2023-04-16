<template>
  <main id="user-list">
    <Table 
        title="User List"
        :headers="headers"
        :rows="usersStore.orderedList"
        :add-action="{
            text: 'Add',
            onClick: onCreateButtonClick
        }"
        :edit-action="{
            text: 'Edit',
            id: 'id'
        }"
    />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Table from '@/components/ui/Table.vue'

import { useUsersStore } from '@/stores/users'

const router = useRouter()

const usersStore = useUsersStore()

const headers = ['Id', 'Email', 'Full Name', 'Address', 'Phone Number', 'Date']

const onCreateButtonClick = () => {
    router.push('/userdetail');
}

onMounted(async() => {
    await usersStore.get()
})

</script>