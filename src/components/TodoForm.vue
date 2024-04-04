<script setup lang="ts">
	import { ref, watch, computed } from 'vue'
	import type { PropType } from 'vue'
  import type { TodoInput } from "../types/TodoInput"
  import type { TodoResponse } from '../types/TodoResponse.ts'

  const props = defineProps({
    todoProps: {
      default: null,
      type: Object as PropType<TodoResponse | null>,
    }
  })

  const isEdit = computed(() => !!props.todoProps?.ID)

  const emit = defineEmits<{ reset: [] }>()


	const dialog = ref(false)
  watch(dialog, (val) => { 
    if (!val) emit('reset') 
  })

  const todo = ref<TodoInput>({
    title: '',
    description:'',
    due_date: '',
    price: 1
  })

  watch(() => props.todoProps, (val) => {
    if(val) {
      dialog.value = true
      dueDate.value = new Date(val.DueDate)
      todo.value = {
        title: val.Title,
        description: val.Description,
        due_date: '',
        price: 1
      }
    } else {
      dueDate.value = new Date()
      todo.value = {
        title: '',
        description:'',
        due_date: '',
        price: 1
      }
    }
  })

  const dueDate = ref(new Date())
  watch(
    dueDate, 
    (val) => { todo.value.due_date =  val.toISOString() },
    { immediate: true } 
  )

  async function postTodoHandler(): Promise<void> {
	const url = 'http://127.0.0.1:7878'
    try {
      if (isEdit.value) {
        await fetch(url+'/v1/todos?id='+props.todoProps?.ID, {
          method: "PUT",
          credentials: 'include',
          body: JSON.stringify(todo.value)
        })
      } else {
        await fetch(url+'/v1/todos', {
          method: "POST",
          credentials: 'include',
          body: JSON.stringify(todo.value)
        })
      }
		
      todo.value = {
        title: '',
        description:'',
        due_date: '',
        price: 1 
      }

      window.location.reload()
    } catch(err: any) {
      return err?.message ?? 'error fetch'
    }

  }
</script>

<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        width="1024"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
						Add task
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="text-h5">Add task</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6" sm="6" md="6" >
                  <v-text-field v-model="todo.title" label="Task" required ></v-text-field>
                  <v-textarea v-model="todo.description" label="Description" required ></v-textarea>
                </v-col>
                <v-col cols="6" sm="6" md="6" >
									<v-date-picker v-model="dueDate"></v-date-picker>
								</v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="postTodoHandler"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>