<template>
    <div class="login-form">
        <form v-if="authStore.isLoggedIn === false" @submit="onFormSubmit" @submit.prevent>
            <div>
                <Input
                    type="email"
                    id="email"
                    label="Email"
                    is-required="true"
                    v-model="form.email"
                />
            </div>
            <div>
                <Input
                    type="password"
                    id="password"
                    label="Password"
                    is-required="true"
                    v-model="form.password"
                />
            </div>
            <div class="actions">
                <FormButton 
                    text="Login"
                />
            </div>
            <p v-if="authStore.message" :class="`${authStore.message?.status === 200? 'success' : 'error'}`">{{ authStore.message?.value }}</p>
        </form>

        <Button 
            v-if="authStore.isLoggedIn === true"
            text="Logout"
            @click="onLogoutButtonClick"
        />
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import {
    Button,
    FormButton,
    Input
} from '@/components/ui'

import { useAuthStore } from '@/stores'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: ''
});

const onLoad = () => {
    authStore.initializeMessage()
    authStore.initializeCredential()
}

const onLogoutButtonClick = async() => {
    await authStore.logout()
}

const onFormSubmit = async() => {
    await authStore.login(form)

    if(authStore.isLoggedIn === true) {
        await authStore.getMe()
    }
}

onLoad()
</script>