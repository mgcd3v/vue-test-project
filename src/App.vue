<template>
  <header>
    <div class="wrapper">
      <LoginForm />
      <ToggleTheme />
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import LoginForm from '@/components/LoginForm.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'
</script>

<style scoped>
</style>
