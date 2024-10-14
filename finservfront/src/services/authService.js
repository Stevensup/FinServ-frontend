import axios from 'axios';

const API_URL = 'http://localhost:8090/auth';

export default {
  login(email, password) {
    return axios.post(`${API_URL}/login`, { username: email, passwordHash: password })
      .then(response => {
        // Manejar la respuesta exitosa
        console.log('Login exitoso', response.data);
        return response.data; // Asumiendo que response.data contiene solo el ID del usuario
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          // Manejar el error 401
          console.error('Unauthorized: Verifica tus credenciales.');
        } else {
          // Manejar otros errores
          console.error('Error:', error.message);
        }
        throw error;
      });
  }
}