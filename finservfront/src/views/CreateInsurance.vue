<template>
  <div class="insurance-policy">
    <NavBarComponent />
    <div class="policy-content">
      <RouterLink to="/insurance" class="dashboard-link">Volver</RouterLink>
      <div class="card-details">
        <img src="@/assets/proteger.png" alt="insurance" />
        <h2>Crear Póliza de Seguro</h2>
        <p>Completa los detalles para crear una nueva póliza de seguro.</p>
      </div>
      <div class="form-container">
        <form @submit.prevent="submitInsurancePolicy">
          <div class="form-group">
            <label for="productType">Tipo de Producto</label>
            <select v-model="selectedProduct" id="productType" required>
              <option v-for="product in productTypes" :key="product.productTypeId" :value="product">
                {{ product.typeName }}
              </option>
            </select>
          </div>
          <button type="submit" class="submit-btn">Crear Póliza</button>
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
  name: "CreateInsurancePolicy",
  components: {
    NavBarComponent,
    FooterComponent,
  },
  data() {
    return {
      selectedProduct: null, 
      productTypes: [],
    };
  },
  methods: {
    loadProductTypes() {
      axios
        .get("http://localhost:8090/ProductTypes/all")
        .then((response) => {
          this.productTypes = response.data.filter(
            (type) => type.productTypeId >= 1 && type.productTypeId <= 3
          );
        })
        .catch((error) => {
          console.error("Error cargando tipos de productos:", error);
        });
    },
    submitInsurancePolicy() {
      const customerId = localStorage.getItem("userId");

      if (!customerId || !this.selectedProduct) {
        alert("Error: El usuario no está autenticado o no se ha seleccionado un producto.");
        return;
      }

      const newPolicy = {
        customerId: parseInt(customerId),
        productId: this.selectedProduct.productTypeId,
        productTypeName: this.selectedProduct.typeName,
      };

      axios
        .post("http://localhost:8090/insurancePolicies/create", newPolicy)
        .then(() => {
          alert("Póliza de seguro creada con éxito");
          this.$router.push("/insurance");
        })
        .catch((error) => {
          console.error("Error creando la póliza de seguro:", error);
        });
    },
  },
  mounted() {
    this.loadProductTypes();
  },
};
</script>

<style src="../styles/CreateInsurance.css" scoped></style>
