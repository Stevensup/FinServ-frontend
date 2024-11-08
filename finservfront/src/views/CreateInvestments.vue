<template>
  <div class="investment-form">
    <NavBarComponent />
    <div class="investment-content">
      <RouterLink to="/investments" class="dashboard-link">Volver</RouterLink>
      <div class="card-details">
        <img src="@/assets/inversion.png" alt="investment" />
        <h2>Crear Inversión</h2>
        <p>Completa los detalles para crear una nueva inversión.</p>
      </div>
      <div class="form-container">
        <form @submit.prevent="submitInvestment">
          <div class="form-group">
            <label for="productType">Tipo de Producto</label>
            <select v-model="selectedProduct" id="productType" required>
              <option v-for="product in productTypes" :key="product.productId" :value="product">
                {{ product.typeName }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="investmentAmount">Monto de Inversión</label>
            <input type="number" v-model="investmentAmount" id="investmentAmount" required />
          </div>
          <button type="submit" class="submit-btn">Crear Inversión</button>
        </form>
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
  name: "CreateInvestment",
  components: {
    NavBarComponent,
    FooterComponent,
  },
  data() {
    return {
      selectedProduct: null,
      productTypes: [],
      investmentAmount: null,
    };
  },
  methods: {
    loadProductTypes() {
      axios
        .get("http://localhost:8090/ProductTypes/all")
        .then((response) => {
          this.productTypes = response.data.filter(
            (type) => type.productTypeId >= 7 && type.productTypeId <= 9
          );
        })
        .catch((error) => {
          console.error("Error cargando tipos de productos:", error);
        });
    },
    submitInvestment() {
      const customerId = localStorage.getItem("userId");

      if (!customerId || !this.selectedProduct || !this.investmentAmount) {
        alert("Error: Faltan datos para completar la inversión.");
        return;
      }

      // Forzamos a que `investmentAmount` siempre tenga un decimal
      const investmentAmount = parseFloat(this.investmentAmount).toFixed(1);

      const newInvestment = {
        customerId: parseInt(customerId),
        investmentAmount: parseFloat(investmentAmount), // Esto asegura que sea `Double`
        productTypeName: this.selectedProduct.typeName,
      };

      axios
        .post("http://localhost:8090/investments/create", newInvestment)
        .then(() => {
          alert("Inversión creada con éxito");
          this.$router.push("/investments");
        })
        .catch((error) => {
          console.error("Error creando la inversión:", error.response?.data || error.message);
        });
    },
  },
  mounted() {
    this.loadProductTypes();
  },
};
</script>

<style src="../styles/CreateInvestments.css" scoped></style>
