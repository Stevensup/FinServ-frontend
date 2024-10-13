<template>
    <div class="auth-layout">
      <NavBar />
      <router-view />
      <Footer />
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    components: {
      NavBar,
      Footer
    }
  }
  </script>
  
  <style scoped>
  .auth-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>
  