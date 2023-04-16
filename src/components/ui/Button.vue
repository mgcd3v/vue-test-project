<template>
    <button 
        class="button"
        :class="class"
        :disabled="disabled"
    >
        {{ text }}
    </button>
</template>

<script setup>
defineProps(['text', 'class', 'disabled'])
</script>