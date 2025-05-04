import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = contact => {
    return axios.post(baseUrl,contact)
}

const eliminar = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll,create,eliminar}
