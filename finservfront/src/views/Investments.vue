<template>
    <div class="investments-card">
        <NavBarComponent />
      <div class="investments-content">
        <RouterLink to="/dashboard" class="dashboard-link">volver</RouterLink>
        <div class="investments-details">
          <img src="@/assets/inversion.png" alt="Inversiones" />
          <h2>Inversiones</h2>
          <p>Administra y visualiza tus inversiones fácilmente.</p>
        </div>
        <div class="actions">
          <button @click="createInvestments">Crear Inversion</button>
          <button @click="getInvestments">Visualizar Inversion</button>
        </div>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
    import NavBarComponent from '@/components/NavBar.vue';
    import FooterComponent from '@/components/Footer.vue';

    export default {
    name: 'InvestmentsView',
    components: {
        NavBarComponent,
        FooterComponent,
    },
    methods: {
        createInvestments() {
          this.$router.push({name:'CreateInvestments'})
        },
        getInvestments() {
          this.$router.push({name:'ViewInvestments'})
        },
    },
    };
</script>

  
  <style src="../styles/Investments.css"></style>
  
