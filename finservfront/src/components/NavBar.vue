<template>
    <nav>
      <!-- Contenido del navbar -->
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/profile">Perfil</a></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBarComponent' // Cambia el nombre para que sea multi-palabra
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #2980b9; /* Color alusivo a un banco */
    padding: 1rem;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  </style>