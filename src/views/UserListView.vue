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
import { useRouter } from 'vue-router'

import { Table } from '@/components/ui'

import { useUsersStore } from '@/stores'

const router = useRouter()

const usersStore = useUsersStore()

const headers = ['Id', 'Email', 'Full Name', 'Address', 'Phone Number', 'Date']

const onLoad = async() => {
    await usersStore.get()
}

const onCreateButtonClick = () => {
    router.push('/userdetail');
}

await onLoad()
</script>