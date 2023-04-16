<template>
    <div class="login-form">
        <form v-if="authStore.isLoggedIn === false" @submit="onFormSubmit" @submit.prevent>
            <div>
                <Input
                    type="email"
                    id="email"
                    label="Email"
                    is-required="true"
                    :value="authStore.credential.email"
                    @setValue="setValue($event)"
                />
            </div>
            <div>
                <Input
                    type="password"
                    id="password"
                    label="Password"
                    is-required="true"
                    :value="authStore.credential.password"
                    @setValue="setValue($event)"
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
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Button from '../components/ui/Button.vue'
import FormButton from '../components/ui/FormButton.vue'
import Input from '../components/ui/Input.vue'
import TextArea from '../components/ui/TextArea.vue'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const setValue = ({prop, value}) => {
    authStore.setCredential(prop, value)
}

const onLogoutButtonClick = async() => {
    await authStore.logout()
}

const onFormSubmit = async() => {
    await authStore.login()

    if(authStore.isLoggedIn === true) {
        await authStore.getMe()
    }
}

onMounted(async() => {
    authStore.initializeCredential()
})
</script>