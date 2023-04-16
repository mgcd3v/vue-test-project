<template>
    <button 
        class="theme-button"
        @click="toggleDark()"
    >
        <span>{{ isDark ? 'Dark' : 'Light' }}</span>
    </button>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>