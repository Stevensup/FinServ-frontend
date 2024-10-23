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
          <button @click="visualizarInversion">Visualizar Inversion</button>
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
        visualizarInversion() {
        // Aquí puedes agregar la lógica para visualizar inversion
        alert('Visualizando inversion');
        },
    },
    };
</script>

  
  <style src="../styles/Investments.css"></style>
  
