<template>
  <div class="pqr">
    <NavBarComponent />
    <div class="pqr-content">
      <RouterLink to="/PQR" class="dashboard-link">Volver</RouterLink>
      <div class="card-details">
        <img src="@/assets/quejarse.png" alt="quejas" />
        <h2>Crear PQR</h2>
        <p>Por favor completa los detalles para crear una nueva PQRS.</p>
      </div>
      <div class="form-container">
        <form @submit.prevent="submitPqr">
          <div class="form-group">
            <label for="pqrsType">Tipo de PQRS</label>
            <select v-model="pqrsType" id="pqrsType" required>
              <option value="Petición">Petición</option>
              <option value="Queja">Queja</option>
              <option value="Reclamo">Reclamo</option>
              <option value="Sugerencia">Sugerencia</option>
            </select>
          </div>
          <div class="form-group">
            <label for="description">Descripción</label>
            <textarea
              v-model="description"
              id="description"
              required
              maxlength="250"
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">Crear PQRS</button>
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
  name: "CreatePqr",
  components: {
    NavBarComponent,
    FooterComponent,
  },
  data() {
    return {
      pqrsType: "",
      description: "",
    };
  },
  methods: {
    submitPqr() {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Error: El usuario no está autenticado.");
        return;
      }

      // Verificar que la descripción no esté vacía o solo contenga espacios
      if (!this.description.trim()) {
        alert("La descripción no puede estar vacía o contener solo espacios.");
        return;
      }

      const newPqr = {
        customerId: userId,
        pqrsType: this.pqrsType,
        description: this.description.trim(),
        status: "Abierto",
      };

      axios
        .post("http://localhost:8090/pqrs/create", newPqr)
        .then(() => {
          alert("PQR creada con éxito");
          this.$router.push("/PQR");
        })
        .catch((error) => {
          console.error("Error creando PQR:", error);
        });
    },
  },
};
</script>


<style src="../styles/CreatePqr.css" scoped></style>
