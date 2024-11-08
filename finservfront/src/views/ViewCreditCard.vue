<template>
  <div class="credit-card-list">
    <NavBarComponent />
    <div class="card-content">
      <RouterLink to="/creditcard" class="creditCard-link">Volver</RouterLink>
      <h2>Listado de Tarjetas de Crédito</h2>
      <div class="card-table-container">
        <table class="card-table">
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Límite de Crédito</th>
              <th>Saldo Disponible</th>
              <th>Fecha de Expiración</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="card in creditCardList" :key="card.idCreditCard">
              <td>{{ card.productName }}</td>
              <td>
                <div v-if="card.isEditing">
                  <input v-model="card.creditLimit" type="number" min="0" max="10" class="credit-limit-input"
                    @input="validateCreditLimit(card)" />
                </div>
                <div v-else>{{ card.creditLimit }}</div>
              </td>
              <td>{{ card.availableBalance }}</td>
              <td>{{ new Date(card.expirationDate).toLocaleDateString() }}</td>
              <td>
                <div class="actions">
                  <button v-if="!card.isEditing" @click="enableEdit(card)" class="edit-button">Editar</button>
                  <button v-if="card.isEditing" @click="updateCreditLimit(card)" class="update-button">Guardar</button>
                  <button @click="deleteCreditCard(card.idCreditCard)" class="delete-button">Eliminar</button>
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
  name: "CreditCardList",
  components: {
    NavBarComponent,
    FooterComponent,
  },
  data() {
    return {
      creditCardList: [],
    };
  },
  mounted() {
    this.fetchCreditCards();
  },
  methods: {
    fetchCreditCards() {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Error: El usuario no está autenticado.");
        return;
      }

      axios
        .get(`http://localhost:8090/creditCards/detailsByCustomer/${userId}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            this.creditCardList = response.data.map(card => ({ ...card, isEditing: false }));
          } else {
            console.error("Formato de datos no es un arreglo:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error obteniendo tarjetas de crédito:", error);
        });
    },
    enableEdit(card) {
      card.isEditing = true;
    },
    validateCreditLimit(card) {
      const maxDigits = 9;


      let creditLimitStr = card.creditLimit ? card.creditLimit.toString() : "";


      creditLimitStr = creditLimitStr.replace(/^0+(?!\.)/, '');


      creditLimitStr = creditLimitStr.replace(/[^0-9.]/g, '');


      const decimalIndex = creditLimitStr.indexOf('.');
      if (decimalIndex !== -1) {
        creditLimitStr = creditLimitStr.slice(0, decimalIndex + 1) + creditLimitStr.slice(decimalIndex + 1).replace(/\./g, '');
      }


      const [integerPart, decimalPart] = creditLimitStr.split('.');
      if (decimalPart && decimalPart.length > 2) {
        creditLimitStr = `${integerPart}.${decimalPart.slice(0, 2)}`;
      }


      card.creditLimit = parseFloat(creditLimitStr.slice(0, maxDigits + (decimalIndex !== -1 ? 1 : 0))) || 0;
    }
    ,
    updateCreditLimit(card) {
      if (!card.creditLimit) {
        alert("El campo de límite de crédito no puede estar vacío.");
        return;
      }

      if (isNaN(card.creditLimit) || card.creditLimit < 0) {
        alert("El límite de crédito debe ser un número positivo.");
        return;
      }

      axios
        .put(`http://localhost:8090/creditCards/updateLimit/${card.idCreditCard}`, {
          creditLimit: card.creditLimit,
        })
        .then(() => {
          alert("Límite de crédito actualizado con éxito.");
          card.isEditing = false;
          this.fetchCreditCards(); // Actualiza la lista de tarjetas después de la edición
        })
        .catch((error) => {
          console.error("Error actualizando el límite de crédito:", error);
        });
    },
    deleteCreditCard(cardId) {
      if (confirm("¿Estás seguro de que deseas eliminar esta tarjeta de crédito?")) {
        axios
          .delete(`http://localhost:8090/creditCards/delete/${cardId}`)
          .then(() => {
            this.creditCardList = this.creditCardList.filter((card) => card.idCreditCard !== cardId);
            alert("Tarjeta de crédito eliminada con éxito.");
          })
          .catch((error) => {
            console.error("Error al eliminar la tarjeta de crédito:", error);
          });
      }
    },
  },
};
</script>


<style src="../styles/ViewCreditCard.css" scoped></style>
