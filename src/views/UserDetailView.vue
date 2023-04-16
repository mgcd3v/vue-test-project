<template>
  <main id="user-detail">
    <form @submit="onFormSubmit" @submit.prevent>
        <p v-if="usersStore.message" :class="`mb-6 ${usersStore.message?.status === 200? 'success' : 'error'}`">{{ usersStore.message?.value }}</p>
        <div>
            <Input
                type="email"
                id="email"
                label="Email"
                is-required="true"
                :disabled="!authStore.isLoggedIn"
                :value="usersStore.currentItem.email"
                @setValue="setValue($event)"
            />
        </div>
        <div>
            <Input
                type="text"
                id="name"
                label="Name"
                is-required="true"
                :disabled="!authStore.isLoggedIn"
                :value="usersStore.currentItem.name"
                @setValue="setValue($event)"
            />
        </div>
        <div>
            <Input
                type="text"
                id="surname"
                label="Surname"
                is-required="true"
                :disabled="!authStore.isLoggedIn"
                :value="usersStore.currentItem.surname"
                @setValue="setValue($event)"
            />
        </div>
        <div>
            <TextArea 
                id="address"
                label="Address"
                :disabled="!authStore.isLoggedIn"
                :value="usersStore.currentItem.address"
                @setValue="setValue($event)"
            />
        </div>
        <div>
            <Input
                type="text"
                id="phonenumber"
                label="Phone Number"
                :disabled="!authStore.isLoggedIn"
                :value="usersStore.currentItem.phonenumber"
                @setValue="setValue($event)"
            />
        </div>
        <div>
            <Input
                type="date"
                id="date"
                label="Date"
                is-required="true"
                :disabled="!authStore.isLoggedIn"
                :value="usersStore.currentItem.date"
                @setValue="setValue($event)"
            />
        </div>
        <div class="actions">
            <Button
                text="Back"
                @click="onBackButtonClick"
            />
            <FormButton 
                text="Save"
                :disabled="!authStore.isLoggedIn"
            />
        </div>
    </form>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Button from '../components/ui/Button.vue'
import FormButton from '../components/ui/FormButton.vue'
import Input from '../components/ui/Input.vue'
import TextArea from '../components/ui/TextArea.vue'

import { useAuthStore } from '@/stores/auth'
import { useUsersStore } from '@/stores/users'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()
const usersStore = useUsersStore()

const setValue = ({prop, value}) => {
    usersStore.setItem(prop, value)
}

const onBackButtonClick = () => {
    router.push('/userlist');
}

const onFormSubmit = async() => {
    
    if(route.params.id)
    {
        await usersStore.update(route.params.id)
    }
    else
    {
        await usersStore.insert()
    }

    if(usersStore.message.status === 200 || usersStore.message.status === 201) {
        router.push('/userlist');
    }
}

onMounted(async() => {
    usersStore.initializeMessage()

    if(route.params.id)
    {
        await usersStore.getSpecific(route.params.id)
    }
    else
    {
        usersStore.initializeItem()
    }
})
</script>