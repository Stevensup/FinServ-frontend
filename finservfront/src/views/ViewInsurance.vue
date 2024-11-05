<template>
    <div class="policy-list">
      <NavBarComponent />
      <div class="policy-content">
        <RouterLink to="/insurance" class="insurance-link">Volver</RouterLink>
        <h2>Listado de Pólizas de Seguro</h2>
        <div class="policy-table-container">
          <table class="policy-table">
            <thead>
              <tr>
                <th>Nombre del Producto</th>
                <th>Estado de la Póliza</th>
                <th>Fecha de Expiración</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="policy in policiesList" :key="policy.policyId">
                <td>{{ policy.productName }}</td>
                <td>
                  <div v-if="policy.isEditing">
                    <select v-model="policy.policyStatus" class="policy-status-select">
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                  <div v-else>
                    {{ policy.policyStatus }}
                  </div>
                </td>
                <td>{{ new Date(policy.expirationDate).toLocaleDateString() }}</td>
                <td>
                  <div class="actions">
                    <button v-if="!policy.isEditing" @click="enableEdit(policy)" class="edit-button">Editar</button>
                    <button v-if="policy.isEditing" @click="finalizeEdit(policy)" class="finalize-button">Finalizar</button>
                    <button @click="deletePolicy(policy.policyId)" class="delete-button">Eliminar</button>
                  </div>
                </td>
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
    name: "PolicyList",
    components: {
      NavBarComponent,
      FooterComponent,
    },
    data() {
      return {
        policiesList: [],
      };
    },
    mounted() {
      this.fetchPolicies();
    },
    methods: {
      fetchPolicies() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("Error: El usuario no está autenticado.");
          return;
        }
  
        axios
          .get(`http://localhost:8090/insurancePolicies/detailsByCustomer/${userId}`)
          .then((response) => {
            if (Array.isArray(response.data)) {
              this.policiesList = response.data.map(policy => ({ ...policy, isEditing: false }));
            } else {
              console.error("Formato de datos no es un arreglo:", response.data);
            }
          })
          .catch((error) => {
            console.error("Error obteniendo pólizas:", error);
          });
      },
      enableEdit(policy) {
        policy.isEditing = true;
      },
      finalizeEdit(policy) {
        if (!policy.policyStatus) {
          alert("El estado de la póliza no puede estar vacío.");
          return;
        }
  
        axios
          .put(`http://localhost:8090/insurancePolicies/updateStatus/${policy.policyId}`, {
            policyStatus: policy.policyStatus,
          })
          .then(() => {
            alert("Estado de la póliza actualizado con éxito.");
            policy.isEditing = false;
          })
          .catch((error) => {
            console.error("Error actualizando el estado de la póliza:", error);
            alert("Error actualizando el estado de la póliza.");
          });
      },
      deletePolicy(policyId) {
        if (confirm("¿Estás seguro de que deseas eliminar esta póliza?")) {
          axios
            .delete(`http://localhost:8090/insurancePolicies/delete/${policyId}`)
            .then(() => {
              this.policiesList = this.policiesList.filter((policy) => policy.policyId !== policyId);
              alert("Póliza eliminada con éxito.");
            })
            .catch((error) => {
              console.error("Error al eliminar la póliza:", error);
            });
        }
      },
    },
  };
  </script>
  <style src="../styles/ViewInsurance.css" scoped></style>
