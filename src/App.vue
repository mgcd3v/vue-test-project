<template>
  <div>
    <header>
      <div class="wrapper">
        <LoginForm />
        <ToggleTheme />
      </div>
    </header>
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <template #default>
          <component :is="Component" :key="$route.path"></component>
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </suspense>
    </router-view>
  </div>
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'
</script>

<style scoped>
</style>
