<template>
	<v-container class="mt-5" max-width="500px">
		<v-card>
		<v-card-title>
			Sign In 
		</v-card-title>
		<v-progress-linear v-if="isSignInWithGoogle" indeterminate></v-progress-linear>
		<v-card-text v-else>
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


			<div class="d-flex justify-space-between align-center">
				<div class="d-flex align-center ga-3">
					<v-btn @click="handleSignIn" :disabled="!valid" color="primary" :loading="isSubmitting">
						Sign In
					</v-btn>
					<GoogleLogin :callback="handleGoogleLogin" />
				</div>
				<v-btn :to="{name: 'sign-up'}" variant="text">
					Register
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
	</v-container>
</template>

<script setup lang="ts" >
import { ref, getCurrentInstance } from 'vue'
import type { SignInInput } from '../types/SignInInput'
import { decodeCredential } from 'vue3-google-login'


const BASE_URL = import.meta.env.VITE_BASE_URL

const {proxy} = getCurrentInstance()

const rules= {
        required: v => !!v || 'Required.',
        email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
}

const valid = ref(false)
const isError = ref(false)
const isSubmitting = ref(false)
const isSignInWithGoogle = ref(false)
const errorText = ref('')

const signInData = ref<SignInInput>({
	email: '',
	password: ''
})

async function handleGoogleLogin(response) {
	try {
		isSignInWithGoogle.value = true
		const userData = decodeCredential(response.credential)
		// TODO: use proper approach to store user data to the DB
		signInData.value = {
			email: userData.sub,
			password: '',
		}
		await handleSignUpAndThenSignIn()
	} catch (error) {
		isSignInWithGoogle.value = false
		console.error('Google login error:', error);
	}
}


async function handleSignUpAndThenSignIn() {
	try {
		isSubmitting.value = true
		isError.value = false
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		let result

		// Sign Up
		let response = await fetch(`${BASE_URL}/v1/signup`, {
			method: "POST",
			body: JSON.stringify(signInData.value),
			headers: myHeaders
		})

		// Sign In
		response = await fetch(`${BASE_URL}/v1/signin`, {
			method: "POST",
			body: JSON.stringify(signInData.value),
			headers: myHeaders
		})

		result = await response.json()
		if (!response.ok) {
			throw new Error(String(result.error));
		}

		proxy.$cookies.set('token', result.token, '7d', "", "", true, false)
		document.location.href="/"
	} catch (text) {
		isError.value = true
		errorText.value = text || 'error on sign in'
	} finally {
		isSubmitting.value = false
	}

}

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
		proxy.$cookies.set('token', result.token, '7d', "", "", true, false)
		document.location.href = '/'
	} catch (text) {
		isError.value = true
		errorText.value = text || 'error on sign in'
	} finally {
		isSubmitting.value = false
	}

}

</script>