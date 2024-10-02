<template>
	<v-container class="mt-5" max-width="500px">
		<v-card>
		<v-card-title>
			Sign In 
		</v-card-title>
		<v-card-text>
			<v-form v-model="valid" ref="form">

			<v-text-field
				label="Email"
				v-model="signInData.email"
				:rules="[rules.required, rules.email]"
				required
			/>
			<v-text-field
				label="Password"
				v-model="signInData.password"
				:rules="[rules.required]"
				type="password"
				required
			/>
			<v-btn @click="handleSignIn" :disabled="!valid" color="primary" :loading="isSubmitting">
				Sign In
			</v-btn>
			</v-form>
		</v-card-text>
		</v-card>

		<v-snackbar v-model="isError" multi-line location="top" transition="scale-transition"> {{ errorText }}
			<template v-slot:actions>
				<v-btn color="red" variant="text" @click="isError = false" > Close
				</v-btn>
			</template>
		</v-snackbar>
	</v-container>
</template>

<script setup lang="ts" >
import { ref, getCurrentInstance } from 'vue'
import type { SignInInput } from '../types/SignInInput'


const BASE_URL = import.meta.env.VITE_BASE_URL

const {proxy} = getCurrentInstance()

const rules= {
        required: v => !!v || 'Required.',
        email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
}

const valid = ref(false)
const isError = ref(false)
const isSubmitting = ref(false)
const errorText = ref('')

const signInData = ref<SignInInput>({
	email: '',
	password: ''
})

async function handleSignIn() {
	try {
		isSubmitting.value = true
		isError.value = false
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		const response = await fetch(`${BASE_URL}/v1/signin`, {
			method: "POST",
			body: JSON.stringify(signInData.value),
			headers: myHeaders
		})

		const result = await response.json()
		if (!response.ok) {
			throw new Error(String(result.error));
		}
		console.log('result', result.token)
		proxy.$cookies.set('token', result.token, '7d', "", "", true, false)
		proxy.$router.push('/')
	} catch (text) {
		isError.value = true
		errorText.value = text || 'error on sign in'
	} finally {
		isSubmitting.value = false
	}

}

</script>