<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email"></label>
        <input type="email" v-model="email" id="email"  placeholder="Email" required>
      </div>
      <div>
        <label for="password"></label>
        <input type="password" v-model="password" id="password" placeholder="Password" required>
      </div>
      <button type="submit">Login</button>
    </form>

    <!-- Mostrar errores si existen -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import authService from '@/services/authService'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await authService.login(this.email, this.password);
        console.log("Login exitoso", response);
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage = 'Login fallido: ' + (error.response?.data?.message || 'Error al iniciar sesión');
      }
    }
  }
}
</script>

<style src="../styles/login.css"></style>
