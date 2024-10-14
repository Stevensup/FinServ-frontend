<template>
    <div class="profile">
      <NavBarComponent />
      <div class="cover-photo"></div>
      <div class="content">
        <div class="profile-photo"></div>
        <h1>Perfil de Usuario</h1>
        <p>Bienvenido a tu perfil. Aquí puedes ver y editar tu información personal.</p>
        <div class="profile-details">
          <div class="profile-item">
            <h2>Nombre</h2>
            <p>{{ user.firstName }} {{ user.lastName }}</p>
          </div>
          <div class="profile-item">
            <h2>Email</h2>
            <p>{{ user.email }}</p>
          </div>
          <div class="profile-item">
            <h2>Teléfono</h2>
            <p>{{ user.phone }}</p>
          </div>
          <div class="profile-item">
            <h2>Dirección</h2>
            <p>{{ user.address }}</p>
          </div>
          <div class="profile-item">
            <h2>Fecha de Registro</h2>
            <p>{{ user.registrationDate }}</p>
          </div>
          <div class="profile-item">
            <h2>Preferencia de Notificación</h2>
            <p>{{ user.notificationPreference.preferenceName }}</p>
          </div>
        </div>
        <button class="edit-button" @click="updateProfile">Editar Perfil</button>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import NavBarComponent from '@/components/NavBar.vue';
  import FooterComponent from '@/components/Footer.vue';
  
  export default {
    name: 'ProfileView',
    components: {
      NavBarComponent,
      FooterComponent
    },
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          registrationDate: '',
          notificationPreference: {
            preferenceName: ''
          },
          profilePhoto: 'https://avatar.iran.liara.run/public/boy?username=Ash' // URL de la imagen de perfil por defecto
        }
      };
    },
    async created() {
      const userId = localStorage.getItem('userId'); // Obtén el ID del usuario desde el local storage
      if (userId) {
        try {
          const response = await fetch(`http://localhost:8090/customers/${userId}`);
          const data = await response.json();
          this.user = data;
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      } else {
        this.$router.push('/login'); // Redirige al login si no hay ID de usuario
      }
    },
    methods: {
      async updateProfile() {
        const userId = localStorage.getItem('userId'); // Obtén el ID del usuario desde el local storage
        if (userId) {
          try {
            const response = await fetch(`http://localhost:8090/customers/update/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.user)
            });
            const data = await response.json();
            if (data.success) {
              alert('Perfil actualizado correctamente');
            } else {
              alert('Error al actualizar el perfil');
            }
          } catch (error) {
            console.error('Error al actualizar el perfil:', error);
          }
        }
      }
    }
  };
  </script>
  
  <style src="../styles/Profile.css"></style>