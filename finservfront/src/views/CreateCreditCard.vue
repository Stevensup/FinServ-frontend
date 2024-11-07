<template>
  <div class="credit-card">
    <NavBarComponent />
    <div class="card-content">
      <RouterLink to="/creditcard" class="dashboard-link">Volver</RouterLink>
      <div class="card-details">
        <img src="@/assets/tarjeta-de-credito.png" alt="credit card" />
        <h2>Crear Tarjeta de Crédito</h2>
        <p>Completa los detalles para crear una nueva tarjeta de crédito.</p>
      </div>
      <div class="form-container">
        <form @submit.prevent="submitCreditCard">
          <div class="form-group">
            <label for="productType">Tipo de Tarjeta</label>
            <select v-model="selectedProductType" id="productType" required>
              <option v-for="product in productTypes" :key="product.productTypeId" :value="product">
                {{ product.typeName }}
              </option>
            </select>
          </div>
          <button type="submit" class="submit-btn">Crear Tarjeta</button>
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
  name: "CreateCreditCard",
  components: {
    NavBarComponent,
    FooterComponent,
  },
  data() {
    return {
      selectedProductType: null,
      productTypes: [],
    };
  },
  methods: {
    loadProductTypes() {
      axios
        .get("http://localhost:8090/ProductTypes/all")
        .then((response) => {
          this.productTypes = response.data.filter(
            (type) => type.productTypeId >= 4 && type.productTypeId <= 6
          );
        })
        .catch((error) => {
          console.error("Error cargando tipos de productos:", error);
        });
    },
    submitCreditCard() {
  const customerId = localStorage.getItem("userId");

  if (!customerId || !this.selectedProductType) {
    alert("Error: El usuario no está autenticado o no se ha seleccionado un producto.");
    return;
  }

  const newCreditCard = {
    customerId: parseInt(customerId),
    creditLimit: 5000.0, // puedes ajustar este valor o hacerlo dinámico si es necesario
    availableBalance: 5000.0, // igual que el límite de crédito, ajusta según sea necesario
    expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3))
      .toISOString()
      .split("T")[0],
    productTypeName: this.selectedProductType.typeName,
  };

  axios
    .post("http://localhost:8090/creditCards/create", newCreditCard)
    .then(() => {
      alert("Tarjeta de crédito creada con éxito");
      this.$router.push("/creditcard");
    })
    .catch((error) => {
      console.error("Error creando la tarjeta de crédito:", error);
    });
},
  },
  mounted() {
    this.loadProductTypes();
  },
};
</script>

<style src="../styles/CreateCreditCard.css" scoped></style>
