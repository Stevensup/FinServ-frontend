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
          <div class="stat-card" @click="goToInvestments">
            <img src="@/assets/inversion.png" alt="Inversion">
            <h2>Inversiones</h2>
            <p>{{ investments }}</p>
          </div>
          <div class="stat-card" @click="goToCreditCard">
            <img src="@/assets/tarjeta-de-credito.png" alt="Tarjeta de Crédito">
            <h2>Tarjetas de Crédito</h2>
            <p>{{ creditCards }}</p>
          </div>
          <div class="stat-card" @click="goToInsurance"> 
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
    }, methods:{
      goToCreditCard(){
        this.$router.push({name: 'CreditCard'})
      },
      goToInsurance(){
        this.$router.push({name: 'Insurance'})
      },
      goToInvestments(){
        this.$router.push({name: 'Investments'})
      }
    }
  };
  </script>
  
  <style src="../styles/Dashboard.css"></style>