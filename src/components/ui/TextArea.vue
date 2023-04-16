<template>
  <div class="text-area form-control">
        <label :for="id">{{ label }}</label>
        <textarea 
            :class="class"
            :id="id"
            :required="isRequired"
            :disabled="disabled"
            :value="value"
            @focusout="setValue"
        />
    </div>
</template>

<script setup>
const props = defineProps(['class', 'id', 'label', 'isRequired', 'disabled', 'value'])

const emit = defineEmits(['setValue'])

const setValue = (e) => {
    emit('setValue', { prop: props.id, value: e.target.value });
}
</script>
