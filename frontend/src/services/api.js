import axios from 'axios'; //Importando a Lib Axios

const api = axios.create({ //Axios irá consumir do backend
    baseURL: 'http://localhost:3333',
})

export default api;