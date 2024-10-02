<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { getCurrentInstance } from 'vue';

const {proxy} = getCurrentInstance();

function handleSignOut() {
  proxy.$cookies.remove('token');
  document.location.href= '/sign-in';
}

</script>

<template>
  <v-card max-width="800px" min-height="calc(100vh - 40px)" class="mx-auto" color="teal-lighten-5">
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
        <v-btn @click="handleSignOut">
          Sign out
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main min-width="800px" >
        <v-container fluid >
          <RouterView v-slot="{ Component }">
            <template v-if="Component">
              <Transition mode="out-in">
                <KeepAlive>
                  <Suspense>
                    <!-- main content -->
                    <component :is="Component"></component>

                    <!-- loading state -->
                    <template #fallback>
                      Loading...
                    </template>
                  </Suspense>
                </KeepAlive>
              </Transition>
            </template>
          </RouterView>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>