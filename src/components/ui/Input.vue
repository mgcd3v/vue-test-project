<template>
    <div class="input form-control">
        <label :for="id">{{ label }}</label>
        <input
            :class="class"
            :type="type ?? text"
            :id="id"
            :required="isRequired"
            :disabled="disabled"
            :value="value"
            @focusout="setValue"
        />
    </div>
</template>

<script setup>
const props = defineProps(['class', 'type', 'id', 'label', 'isRequired', 'disabled', 'value'])

const emit = defineEmits(['setValue'])


const setValue = (e) => {
    emit('setValue', { prop: props.id, value: e.target.value });
}
</script>