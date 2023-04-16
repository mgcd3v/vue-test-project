<template>
  <div class="text-area form-control">
        <label :for="id">{{ label }}</label>
        <textarea 
            ref="textarea"
            :class="class"
            :id="id"
            :required="isRequired"
            :disabled="disabled"
            :value="inputValue"
            @input="emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['class', 'id', 'label', 'isRequired', 'disabled', 'value', 'modelValue'])

const emit = defineEmits(['update:modelValue']);

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const focus = () => {
  this.$refs.input.focus();
};

defineExpose({
  inputValue,
  focus,
  emit,
});
</script>
