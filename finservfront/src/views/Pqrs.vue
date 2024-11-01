<template>
    <div class="pqr">
        <NavBarComponent />
      <div class="pqr-content">
        <RouterLink to="/dashboard" class="dashboard-link">volver</RouterLink>
        <div class="card-details">
          <img src="@/assets/quejarse.png" alt="quejas" />
          <h2>PQR</h2>
          <p>Realiza y visualiza tus PQRS fácilmente.</p>
        </div>
        <div class="actions">
          <button @click="createPqr">Crear PQR</button>
          <button @click="getPqr">Visualizar PQRS</button>
        </div>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
    import NavBarComponent from '@/components/NavBar.vue';
    import FooterComponent from '@/components/Footer.vue';

    export default {
    name: 'PQRS',
    components: {
        NavBarComponent,
        FooterComponent,
    },
    methods: {
        createPqr() {
            this.$router.push({name: 'CreatePqr'})
        },
        getPqr() {
            this.$router.push({name: 'viewPqr'})
        },
    },
    };
</script>

  
  <style src="../styles/PQR.css" scoped></style>
  