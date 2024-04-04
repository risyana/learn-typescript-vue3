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

async function deleteTodo(id: number): Promise<void>  {
	const url = 'http://127.0.0.1:7878'
	try {
		await fetch(url+'/v1/todos/'+id, {
			method: "DELETE",
			credentials: 'include',
		})
		window.location.reload()
	} catch(err: any) {
		return err?.message ?? 'error delete'
	}
}

async function updateStatusTodo(id: number, currentStatus: number): Promise<void>  {
	const url = 'http://127.0.0.1:7878'
	const body = {
		status : currentStatus === 0 ? 1 : 0 
	}
	try {
		await fetch(url+'/v1/todos/update-status?id='+id, {
			method: "PUT",
			credentials: 'include',
			body: JSON.stringify(body),
		})
		window.location.reload()
	} catch(err: any) {
		return err?.message ?? 'error update status'
	}
}

function getStyleTodoDone(status: number) {
	return status === 1 ? 'text-decoration: line-through;' : '';
}

todos.value = await fetchTodos()

const todoToEdit = ref<TodoResponse | null>(null)

</script>

<template>
	<v-container min-width="400px" d-flex class="d-flex align-center flex-column">

		<div class="mb-6">
			<TodoForm :todo-props="todoToEdit" @reset="() => todoToEdit = null" />
		</div>

		<v-card 
			:color="todo.Status === 0 ? 'teal-lighten-2' : ''"
			:variant="todo.Status === 0 ? 'flat' : 'tonal'"
			class="mx-auto my-2"
			width="100%"
			v-for="todo in todos" 
			:key="todo.ID"
		>
			<v-card-item>
				<v-card-title :style="getStyleTodoDone(todo.Status)">
					{{ todo.Title }}
				</v-card-title>
				<v-card-subtitle :style="getStyleTodoDone(todo.Status)">
					{{ todo.DueDate }}
				</v-card-subtitle>
			</v-card-item>

			<v-card-text :style="getStyleTodoDone(todo.Status)" >
				{{ todo.Description }}
			</v-card-text>

			<v-card-actions>
				<v-btn @click="todoToEdit = todo" :disabled="todo.Status === 1"> Edit </v-btn>
				<v-btn @click="updateStatusTodo(todo.ID, todo.Status)"> 
				{{ todo.Status === 0 ? 'Set as done' : 'Set as todo' }}	 
				</v-btn>
				<v-btn @click="deleteTodo(todo.ID)"> Delete </v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>