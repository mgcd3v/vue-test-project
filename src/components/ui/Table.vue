<template>
    <div class="table">
        <div>
            <h1>{{ title }}</h1>
            <Button
                v-if="addAction"
                :text="addAction.text"
                @click="addAction.onClick"
            />
        </div>
        <table>
            <tr>
                <th
                    v-for="header, index in headers"
                    :key="index"
                >
                    {{ header }}
                </th>
                <th
                    v-if="editAction"
                >
                </th>
            </tr>
            <tr
                v-for="row, rowIndex in rows"
                :key="rowIndex"
            >
                <td 
                    v-for="r, rowIndex in row"
                    :key="rowIndex"
                >
                    {{ r }}
                </td>
                <td 
                    v-if="editAction"
                >
                    <RouterLink :to="`/userdetail/${row[editAction.id]}`">{{ editAction.text }}</RouterLink>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import Button from '@/components/ui/Button.vue'

const props = defineProps(['title', 'headers', 'rows', 'addAction', 'editAction'])
</script>