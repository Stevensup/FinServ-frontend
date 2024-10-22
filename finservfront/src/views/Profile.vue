<template>
  <div class="profile">
    <NavBarComponent />
    <div class="cover-photo"></div>
    <div class="content">
      <div class="profile-photo"></div>
      <h1>Perfil de Usuario</h1>
      <p>
        Bienvenido a tu perfil. Aquí puedes ver y editar tu información
        personal.
      </p>
      <div class="profile-details">
        <div class="profile-item">
          <h2>Nombre</h2>
          <p>{{ user.firstName }} {{ user.lastName }}</p>
        </div>
        <div class="profile-item">
          <h2>Email</h2>
          <div v-if="isEditing">
            <input
              v-model="user.email"
              type="email"
              placeholder="Ingresa tu email"
            />
          </div>
          <p v-else>{{ user.email }}</p>
        </div>
        <div class="profile-item">
          <h2>Teléfono</h2>
          <div v-if="isEditing">
            <input
              v-model="user.phone"
              type="tel"
              placeholder="Ingresa tu teléfono"
            />
          </div>
          <p v-else>{{ user.phone }}</p>
        </div>
        <div class="profile-item">
          <h2>Dirección</h2>
          <div v-if="isEditing">
            <input
              v-model="user.address"
              type="text"
              placeholder="Ingresa tu dirección"
            />
          </div>
          <p v-else>{{ user.address }}</p>
        </div>
        <div class="profile-item">
          <h2>Preferencia de Notificación</h2>
          <div v-if="isEditing">
            <select v-model="user.notificationPreference.preferenceId">
              <option
                v-for="preference in notificationPreferences"
                :key="preference.preferenceId"
                :value="preference.preferenceId"
              >
                {{ preference.preferenceName }}
              </option>
            </select>
          </div>
          <p v-else>{{ user.notificationPreference.preferenceName }}</p>
        </div>
      </div>
      <button v-if="!isEditing" class="edit-button" @click="editProfile">
        Editar Perfil
      </button>
      <button v-if="isEditing" class="save-button" @click="saveChanges">
        Guardar Cambios
      </button>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import NavBarComponent from "@/components/NavBar.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  name: "ProfileView",
  components: {
    NavBarComponent,
    FooterComponent,
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        registrationDate: "",
        notificationPreference: {
          preferenceId: null,
          preferenceName: "",
        },
        profilePhoto: "https://avatar.iran.liara.run/public/boy?username=Ash", 
      },
      isEditing: false,
      notificationPreferences: [], 
    };
  },
  async created() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await fetch(
          `http://localhost:8090/customers/${userId}`
        );
        const data = await response.json();
        this.user = data;
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    } else {
      this.$router.push("/login");
    }
    this.fetchNotificationPreferences();
  },
  methods: {
    editProfile() {
      this.isEditing = true;
    },
    async saveChanges() {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const selectedPreference = this.notificationPreferences.find(
            (preference) =>
              preference.preferenceId ===
              this.user.notificationPreference.preferenceId
          );

          if (selectedPreference) {
            this.user.notificationPreference.preferenceName =
              selectedPreference.preferenceName;
          }

          const response = await fetch(
            `http://localhost:8090/customers/update/${userId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...this.user,
                notificationPreference: {
                  preferenceId: this.user.notificationPreference.preferenceId,
                  preferenceName:
                    this.user.notificationPreference.preferenceName, 
                },
              }),
            }
          );

          if (response.ok) {
            alert("Perfil actualizado correctamente");
            this.isEditing = false;
          } else {
            const errorData = await response.json();
            alert(
              "Error al actualizar el perfil: " +
                (errorData.message || "Error desconocido")
            );
          }
        } catch (error) {
          console.error("Error en la actualización:", error);
          alert("Error al actualizar el perfil: " + error.message);
        }
      }
    },

    fetchNotificationPreferences() {
      fetch("http://localhost:8090/Notificacion_Preferences/all")
        .then((response) => response.json())
        .then((data) => {
          this.notificationPreferences = data; 
        })
        .catch((error) => {
          console.error("Error fetching notification preferences:", error);
        });
    },
  },
};
</script>

<style src="../styles/Profile.css"></style>

