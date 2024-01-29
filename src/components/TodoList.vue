<script setup lang="ts" >
import TodoForm from './TodoForm.vue';
</script>

<template>
	<v-container min-width="400px" d-flex class="d-flex align-center flex-column">

		<div class="mb-6">
			<TodoForm />
		</div>

		<v-card class="mx-auto" width="100%" >
				<v-card-item>
					<v-card-title>Belajar Vue</v-card-title>
					<v-card-subtitle>Due date: 29 Maret 2024</v-card-subtitle>
				</v-card-item>

				<v-card-text>
					Belajar vue js di tahun 2024 termasuk typescript, composition api, dan vite
				</v-card-text>

				<v-card-actions>
					<v-btn> Edit </v-btn>
					<v-btn> Set as done </v-btn>
				</v-card-actions>
		</v-card>
	</v-container>
</template>