<template>
    <div class="investment-list">
      <NavBarComponent />
      <div class="investment-content">
        <RouterLink to="/investments" class="dashboard-link">Volver</RouterLink>
        <h2>Listado de Inversiones</h2>
        <div class="investment-table-container">
          <table class="investment-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Monto de Inversión</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Finalización</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="investment in investmentsList" :key="investment.investmentId">
                <td>{{ investment.productName }}</td>
                <td>{{ investment.investmentAmount }}</td>
                <td>{{ new Date(investment.startDate).toLocaleDateString() }}</td>
                <td v-if="investment.endDate">{{ new Date(investment.endDate).toLocaleDateString() }}</td>
                <td v-else>N/A</td>
                <td>{{ investment.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import NavBarComponent from "@/components/NavBar.vue";
  import FooterComponent from "@/components/Footer.vue";
  import axios from "axios";
  
  export default {
    name: "ViewInvestments",
    components: {
      NavBarComponent,
      FooterComponent,
    },
    data() {
      return {
        investmentsList: [],
      };
    },
    mounted() {
      this.fetchInvestments();
    },
    methods: {
      fetchInvestments() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("Error: El usuario no está autenticado.");
          return;
        }
  
        axios
          .get(`http://localhost:8090/investments/detailsByCustomer/${userId}`)
          .then((response) => {
            this.investmentsList = response.data;
          })
          .catch((error) => {
            console.error("Error obteniendo inversiones:", error);
          });
      },
    },
  };
  </script>
  
  <style src="../styles/ViewInvestments.css" scoped></style>
  