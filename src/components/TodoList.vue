<script setup lang="ts" >
import TodoForm from './TodoForm.vue';
import { ref } from 'vue'
import type { TodoResponse } from '../types/TodoResponse.ts'

const todos = ref<TodoResponse[]>([])

async function fetchTodos(): Promise<TodoResponse[]>  {
	const url = 'http://127.0.0.1:7878'
	try {
		const response = await fetch(url+'/v1/todos', {
			method: "GET",
			credentials: 'include',
		})
		const { data } = await response.json()
		return data
	} catch(err: any) {
		return err?.message ?? 'error fetch'
	}
}

todos.value = await fetchTodos()

</script>

<template>
	<v-container min-width="400px" d-flex class="d-flex align-center flex-column">

		<div class="mb-6">
			<TodoForm />
		</div>

		<v-card class="mx-auto my-2" width="100%"  v-for="todo in todos" :key="todo.ID">
			<v-card-item>
				<v-card-title>{{ todo.Title }}</v-card-title>
				<v-card-subtitle>{{ todo.DueDate }}</v-card-subtitle>
			</v-card-item>

			<v-card-text >
				{{ todo.Description }}
			</v-card-text>

			<v-card-actions>
				<v-btn> Edit </v-btn>
				<v-btn> Set as done </v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>