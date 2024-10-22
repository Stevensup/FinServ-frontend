<template>
    <div class="credit-card">
        <NavBarComponent />
      <div class="credit-card-content">
        <RouterLink to="/dashboard" class="dashboard-link">volver</RouterLink>
        <div class="card-details">
          <img src="@/assets/tarjeta-de-credito.png" alt="Tarjeta de Crédito" />
          <h2>Tarjeta de Crédito</h2>
          <p>Administra y visualiza tus tarjetas de crédito fácilmente.</p>
        </div>
        <div class="actions">
          <button @click="solicitarTarjeta">Solicitar una tarjeta de crédito</button>
          <button @click="visualizarTarjeta">Visualizar tarjeta de crédito</button>
        </div>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
    import NavBarComponent from '@/components/NavBar.vue';
    import FooterComponent from '@/components/Footer.vue';

    export default {
    name: 'CreditCard',
    components: {
        NavBarComponent,
        FooterComponent,
    },
    methods: {
        solicitarTarjeta() {
        // Aquí puedes agregar la lógica para solicitar una tarjeta
        alert('Solicitud de tarjeta iniciada');
        },
        visualizarTarjeta() {
        // Aquí puedes agregar la lógica para visualizar la tarjeta
        alert('Visualizando tarjeta de crédito');
        },
    },
    };
</script>

  
  <style src="../styles/CreditCard.css"></style>
  