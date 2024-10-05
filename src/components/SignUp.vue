<template>
	<v-container class="mt-5" max-width="500px">
		<v-card>
		<v-card-title>
			Register
		</v-card-title>
		<v-card-text>
			<v-form v-model="valid" ref="form">

			<v-text-field
				label="Email"
				v-model="signUpData.email"
				:rules="[rules.required, rules.email]"
				required
			/>
			<v-text-field
				label="Password"
				v-model="signUpData.password"
				:rules="[rules.required]"
				type="password"
				required
			/>
			<div class="d-flex justify-space-between align-center">
				<v-btn @click="handleSignUp" :disabled="!valid" color="primary" :loading="isSubmitting">
					Register
				</v-btn>
				<v-btn :to="{name: 'sign-in'}" variant="text">
					Sign in
				</v-btn>	
			</div>
			</v-form>
		</v-card-text>
		</v-card>

		<v-snackbar v-model="isError" multi-line location="top" transition="scale-transition"> {{ errorText }}
			<template v-slot:actions>
				<v-btn color="red" variant="text" @click="isError = false" > Close
				</v-btn>
			</template>
		</v-snackbar>

		<v-snackbar v-model="isSuccess" multi-line location="top" transition="scale-transition"> 
			Register success, you can sign in now.
		</v-snackbar>
	</v-container>
</template>

<script setup lang="ts" >
import { ref, getCurrentInstance } from 'vue'
import type { SignUpInput } from '../types/SignUpInput'


const BASE_URL = import.meta.env.VITE_BASE_URL

const {proxy} = getCurrentInstance()

const rules= {
        required: v => !!v || 'Required.',
        email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
}

const valid = ref(false)
const isError = ref(false)
const isSuccess = ref(false)
const isSubmitting = ref(false)
const errorText = ref('')

const signUpData = ref<SignUpInput>({
	email: '',
	password: ''
})

async function handleSignUp() {
	try {
		isSubmitting.value = true
		isError.value = false
		isSuccess.value = false
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		const response = await fetch(`${BASE_URL}/v1/signup`, {
			method: "POST",
			body: JSON.stringify(signUpData.value),
			headers: myHeaders
		})
		const result = await response.json()
		if (!response.ok) {
			throw new Error(String(result.error));
		}
		isSuccess.value = true
		proxy.$router.push('/sign-in')
	} catch (text) {
		isError.value = true
		errorText.value = text || 'error on sign up'
	} finally {
		isSubmitting.value = false
	}
}

</script>