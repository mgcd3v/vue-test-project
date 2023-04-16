<template>
    <main id="user-detail">
        <form @submit.prevent="onFormSubmit">
            <p v-if="usersStore.message" :class="`mb-6 ${usersStore.message?.status === 200? 'success' : 'error'}`">{{ usersStore.message?.value }}</p>
            <div>
                <Input
                    type="email"
                    id="email"
                    label="Email"
                    is-required="true"
                    :disabled="!authStore.isLoggedIn"
                    v-model="form.email"
                />
            </div>
            <div>
                <Input
                    type="text"
                    id="name"
                    label="Name"
                    is-required="true"
                    :disabled="!authStore.isLoggedIn"
                    v-model="form.name"
                />
            </div>
            <div>
                <Input
                    type="text"
                    id="surname"
                    label="Surname"
                    is-required="true"
                    :disabled="!authStore.isLoggedIn"
                    v-model="form.surname"
                />
            </div>
            <div>
                <TextArea 
                    id="address"
                    label="Address"
                    :disabled="!authStore.isLoggedIn"
                    v-model="form.address"
                />
            </div>
            <div>
                <Input
                    type="text"
                    id="phonenumber"
                    label="Phone Number"
                    :disabled="!authStore.isLoggedIn"
                    v-model="form.phonenumber"
                />
            </div>
            <div>
                <Input
                    type="date"
                    id="date"
                    label="Date"
                    is-required="true"
                    :disabled="!authStore.isLoggedIn"
                    v-model="form.date"
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
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { 
    Button,
    FormButton,
    Input,
    TextArea
} from '@/components/ui'

import { 
    useAuthStore, 
    useUsersStore 
} from '@/stores'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()
const usersStore = useUsersStore()

const onLoad = async() => {
    usersStore.initializeMessage()

    if(route.params.id)
    {
        await usersStore.getSpecific(route.params.id)
    }
    else
    {
        usersStore.initializeItem()
    }
}

const onBackButtonClick = () => {
    router.push('/userlist');
}

const onFormSubmit = async() => {
    
    if(route.params.id)
    {
        await usersStore.update(route.params.id, form)
    }
    else
    {
        await usersStore.insert(form)
    }

    if(usersStore.message.status === 200 || usersStore.message.status === 201) {
        router.push('/userlist');
    }
}

await onLoad()

const form = reactive({
  email: usersStore.currentItem.email,
  name: usersStore.currentItem.name,
  surname: usersStore.currentItem.surname,
  address: usersStore.currentItem.address,
  phonenumber: usersStore.currentItem.phonenumber,
  date: usersStore.currentItem.date,
  password: usersStore.currentItem.password,
});
</script>