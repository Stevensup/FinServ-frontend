<template>
    <div class="dashboard">
      <NavBarComponent />
      <div class="content">
        <h1>Bienvenido al Dashboard</h1>
        <p>Este es tu centro de control para administrar tus productos financieros.</p>
        <div class="stats">
          <div class="stat-card">
            <img src="@/assets/saldo.png" alt="Saldo">
            <h2>Saldo Total</h2>
            <p>{{ totalBalance }}</p>
          </div>
          <div class="stat-card">
            <img src="@/assets/inversion.png" alt="Inversion">
            <h2>Inversiones</h2>
            <p>{{ investments }}</p>
          </div>
          <div class="stat-card">
            <img src="@/assets/prestamo.png" alt="Prestamo">
            <h2>Préstamos</h2>
            <p>{{ loans }}</p>
          </div>
          <div class="stat-card">
            <img src="@/assets/tarjeta-de-credito.png" alt="Tarjeta de Crédito">
            <h2>Tarjetas de Crédito</h2>
            <p>{{ creditCards }}</p>
          </div>
          <div class="stat-card">
            <img src="@/assets/proteger.png" alt="Seguro">
            <h2>Seguros</h2>
            <p>{{ insurances }}</p>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import NavBarComponent from '@/components/NavBar.vue';
  import FooterComponent from '@/components/Footer.vue';
  
  export default {
    name: 'DashboardView',
    components: {
      NavBarComponent,
      FooterComponent
    },
    data() {
      return {
        totalBalance: 10000,
        investments: 5000,
        loans: 2000,
        creditCards: 3000,
        insurances: 4000
      };
    }
  };
  </script>
  
  <style src="../styles/Dashboard.css"></style>