<template>
    <input 
        class="form-button"
        :class="class"
        type="submit" 
        :disabled="disabled"
        :value="text" 
    />
</template>

<script setup>
defineProps(['class', 'text', 'disabled'])
</script>