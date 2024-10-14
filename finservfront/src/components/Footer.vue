<template>
    <footer>
      <!-- Contenido del footer -->
      <p>&copy; 2023 FinServ. Todos los derechos reservados.</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent' // Cambia el nombre para que sea multi-palabra
  };
  </script>
  
  <style scoped>
  footer {
    background-color: #2980b9; /* Color alusivo a un banco */
    color: white;
    text-align: center;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  </style>