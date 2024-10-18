<template>
    <nav>
      <!-- Contenido del navbar -->
      <ul>
        <li><a href="/PQR">PQR</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/profile">Perfil</a></li>
        <li><a href="/login">Cerrar sesión</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBarComponent' // Cambia el nombre para que sea multi-palabra
  };
  </script>
  
  <style scoped src="../styles/NavBar.css"></style>