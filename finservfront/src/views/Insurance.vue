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
          <button @click="visualizarSeguro">Visualizar Seguros</button>
          <button @click="solicitarSeguro">Agregar seguro</button>
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
        visualizarSeguro() {
        // Aquí puedes agregar la lógica para visualizar Seguro
        alert('Solicitud de tarjeta iniciada');
        },
        solicitarSeguro() {
        // Aquí puedes agregar la lógica para solicitar Seguro
        alert('Visualizando tarjeta de crédito');
        },
    },
    };
</script>

  
  <style src="../styles/Insurance.css"></style>
  