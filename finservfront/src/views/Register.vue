<template>
    <div class="register">
      <h1>Registro</h1>
      <form @submit.prevent="register">
        <div>
            <label for="identification">Identificacion</label>
            <input type="text" v-model="identification" id="identification" required>
        </div>
        <div>
          <label for="firstName">Nombre</label>
          <input type="text" v-model="firstName" id="firstName" required>
        </div>
        <div>
          <label for="lastName">Apellido</label>
          <input type="text" v-model="lastName" id="lastName" required>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required>
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input type="password" v-model="password" id="password" required>
        </div>
        <div>
          <label for="phone">Teléfono</label>
          <input type="text" v-model="phone" id="phone" required>
        </div>
        <div>
          <label for="address">Dirección</label>
          <input type="text" v-model="address" id="address" required>
        </div>
        <div>
          <label for="notificationPreference">Preferencia de Notificación</label>
          <select v-model="notificationPreferenceId" id="notificationPreference" required>
            <option v-for="preference in notificationPreferences" :key="preference.id" :value="preference.id">
              {{ preference.preferenceName }}
            </option>
          </select>
        </div>
        <button type="submit">Registrar</button>
        <RouterLink to="/login" class="login-link">volver</RouterLink>
      </form>
  
      <!-- Mostrar errores si existen -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterView',
    data() {
      return {
        identification: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        notificationPreferenceId: '',
        notificationPreferences: [],
        errorMessage: ''
      };
    },
    methods: {
      fetchNotificationPreferences() {
        fetch("http://localhost:8090/Notificacion_Preferences/all")
          .then(response => response.json())
          .then(data => {
            this.notificationPreferences = data;
          })
          .catch(error => {
            console.error("Error fetching notification preferences:", error);
          });
      },
      async register() {
        try {
          const selectedPreference = this.notificationPreferences.find(preference => preference.id === this.notificationPreferenceId);
         // const generatedUsername = `${this.firstName}.${this.lastName}`.toLowerCase();
          const response = await fetch("http://localhost:8090/customers/create", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              phone: this.phone,
              address: this.address,
              username: this.email,
              registrationDate: new Date().toISOString(),
              passwordHash: this.password,
              notificationPreference: {
                preferenceId: this.notificationPreferenceId,
                preferenceName: selectedPreference ? selectedPreference.preferenceName : ''
              }
            })
          });
          const data = await response.json();
          if (response.ok) {
            alert('Registro exitoso');
            this.$router.push('/login'); // Redirige al login después del registro exitoso
          } else {
            this.errorMessage = data.message || 'Error al registrar';
          }
        } catch (error) {
          console.error('Error al registrar:', error);
          this.errorMessage = 'Error al registrar';
        }
      }
    },
    created() {
      this.fetchNotificationPreferences();
    }
  };
  </script>
  
  
  <style src="../styles/Register.css"></style>