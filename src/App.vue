<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <v-card min-width="800px" class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-app-bar >
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>Todo List</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn>
          <RouterLink to="/">Home</RouterLink>
        </v-btn>
        <v-btn>
          <RouterLink to="/about">About</RouterLink>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main min-width="800px" >
        <v-container fluid >
          <RouterView/>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>