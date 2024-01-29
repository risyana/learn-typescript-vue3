<script setup lang="ts">
	import { ref } from 'vue'
	const dialog = ref(false)
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
                  <v-text-field label="Task" required ></v-text-field>
                  <v-textarea label="Description" required ></v-textarea>
                </v-col>
                <v-col cols="6" sm="6" md="6" >
									<v-date-picker></v-date-picker>
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
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>