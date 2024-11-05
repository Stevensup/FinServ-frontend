<template>
    <div class="insurance">
        <NavBarComponent />
      <div class="insurance-content">
        <RouterLink to="/dashboard" class="dashboard-link">volver</RouterLink>
        <div class="insurance-details">
          <img src="@/assets/proteger.png" alt="Seguros" />
          <h2>Seguros</h2>
          <p>Administra y visualiza tus Seguros fácilmente.</p>
        </div>
        <div class="actions">
          <button @click="createInsurance">Solicitar seguro</button>
          <button @click="getInsurance">Visualizar seguros</button>
        </div>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
    import NavBarComponent from '@/components/NavBar.vue';
    import FooterComponent from '@/components/Footer.vue';

    export default {
    name: 'InsuranceView',
    components: {
        NavBarComponent,
        FooterComponent,
    },
    methods: {
        createInsurance() {
        this.$router.push({name:'CreateInsurance'})
        },
        getInsurance() {
        this.$router.push({name:'ViewInsurance'})
        },
    },
    };
</script>

  
  <style src="../styles/Insurance.css"></style>
  