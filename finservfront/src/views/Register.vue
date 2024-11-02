<template>
  <div class="register">
    <h1>Registro</h1>
    <form @submit.prevent="register">
      <div>
        <label for="identification">Identificación</label>
        <input type="text" v-model="identification" id="identification" required @blur="validateIdentification">
        <p v-if="errors.identification" class="error">{{ errors.identification }}</p>
      </div>
      <div>
        <label for="firstName">Nombre</label>
        <input type="text" v-model="firstName" id="firstName" required @blur="validateFirstName">
        <p v-if="errors.firstName" class="error">{{ errors.firstName }}</p>
      </div>
      <div>
        <label for="lastName">Apellido</label>
        <input type="text" v-model="lastName" id="lastName" required @blur="validateLastName">
        <p v-if="errors.lastName" class="error">{{ errors.lastName }}</p>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required @blur="validateEmail">
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" id="password" required @blur="validatePassword">
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <div>
        <label for="phone">Teléfono</label>
        <input type="text" v-model="phone" id="phone" required @blur="validatePhone">
        <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
      </div>
      <div>
        <label for="address">Dirección</label>
        <input type="text" v-model="address" id="address" required @blur="validateAddress">
        <p v-if="errors.address" class="error">{{ errors.address }}</p>
      </div>
      <div>
        <label for="notificationPreference">Preferencia de Notificación</label>
        <select v-model="notificationPreferenceId" id="notificationPreference" required>
          <option v-for="preference in notificationPreferences" :key="preference.id" :value="preference.id">
            {{ preference.preferenceName }}
          </option>
        </select>
        <p v-if="errors.notificationPreferenceId" class="error">{{ errors.notificationPreferenceId }}</p>
      </div>
      <button type="submit" :disabled="hasErrors">Registrar</button>
      <RouterLink to="/login" class="login-link">Volver</RouterLink>
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
      errorMessage: '',
      errors: {}
    };
  },
  computed: {
    hasErrors() {
      return Object.keys(this.errors).some(key => this.errors[key]);
    }
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
    validateIdentification() {
      this.errors.identification = this.identification.length >= 5 && /^[0-9]+$/.test(this.identification)
        ? ''
        : 'La identificación debe tener al menos 5 dígitos numéricos.';
    },
    validateFirstName() {
      this.errors.firstName = /^[a-zA-Z]+$/.test(this.firstName) ? '' : 'El nombre debe contener solo letras.';
    },
    validateLastName() {
      this.errors.lastName = /^[a-zA-Z]+$/.test(this.lastName) ? '' : 'El apellido debe contener solo letras.';
    },
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.errors.email = emailPattern.test(this.email) ? '' : 'El email no es válido.';
    },
    validatePassword() {
      this.errors.password = this.password.length >= 8 ? '' : 'La contraseña debe tener al menos 8 caracteres.';
    },
    validatePhone() {
      this.errors.phone = /^[0-9]{10}$/.test(this.phone)
        ? ''
        : 'El teléfono debe tener 10 dígitos numéricos.';
    },
    validateAddress() {
      this.errors.address = this.address.length > 0 ? '' : 'La dirección no puede estar vacía.';
    },
    async register() {
      if (this.hasErrors) {
        this.errorMessage = 'Corrija los errores antes de enviar el formulario.';
        return;
      }
      try {
        const selectedPreference = this.notificationPreferences.find(preference => preference.id === this.notificationPreferenceId);
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
          this.$router.push('/login');
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
