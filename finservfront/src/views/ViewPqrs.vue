<template>
  <div class="pqr-list">
    <NavBarComponent />
    <div class="pqr-content">
      <RouterLink to="/PQR" class="pqr-link">Volver</RouterLink>
      <h2>Listado de PQRS</h2>
      <table class="pqr-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pqr in pqrsList" :key="pqr.pqrsId">
            <td>{{ pqr.pqrsType }}</td>
            <td>
              <div v-if="pqr.isEditing">
                <input v-model="pqr.description" />
              </div>
              <div v-else>
                {{ pqr.description }}
              </div>
            </td>
            <td>{{ pqr.status }}</td>
            <td>{{ new Date(pqr.creationDate).toLocaleString() }}</td>
            <td>
              <button v-if="!pqr.isEditing" @click="enableEdit(pqr)" class="edit-button">Editar</button>
              <button v-if="pqr.isEditing" @click="finalizeEdit(pqr)" class="finalize-button">Finalizar</button>
              <button @click="deletePqr(pqr.pqrsId)" class="delete-button">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import NavBarComponent from "@/components/NavBar.vue";
import FooterComponent from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: "PqrList",
  components: {
    NavBarComponent,
    FooterComponent,
  },
  data() {
    return {
      pqrsList: [],
    };
  },
  mounted() {
    this.fetchPqrs();
  },
  methods: {
    fetchPqrs() {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Error: El usuario no está autenticado.");
        return;
      }

      axios
        .get(`http://localhost:8090/pqrs/findByCustomer/${userId}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            this.pqrsList = response.data.map(pqr => ({ ...pqr, isEditing: false }));
          } else {
            console.error("El formato de datos recibido no es un arreglo:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error obteniendo las PQRS:", error);
        });
    },
    enableEdit(pqr) {
      pqr.isEditing = true;
    },
    finalizeEdit(pqr) {
      axios
        .put(`http://localhost:8090/pqrs/update/${pqr.pqrsId}`, { description: pqr.description })
        .then(() => {
          pqr.isEditing = false;
          alert("Descripción actualizada con éxito.");
        })
        .catch((error) => {
          console.error("Error al actualizar la descripción:", error);
          alert("Error al actualizar la descripción.");
        });
    },
    deletePqr(pqrsId) {
      if (confirm("¿Estás seguro de que deseas eliminar esta PQRS?")) {
        axios
          .delete(`http://localhost:8090/pqrs/delete/${pqrsId}`)
          .then(() => {
            this.pqrsList = this.pqrsList.filter((pqr) => pqr.pqrsId !== pqrsId);
            alert("PQRS eliminada con éxito.");
          })
          .catch((error) => {
            console.error("Error al eliminar la PQRS:", error);
          });
      }
    },
  },
};
</script>



<style src="../styles/ViewPqrs.css" scoped></style>
