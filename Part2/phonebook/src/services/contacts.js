import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const create = contact => {
    return axios.post(baseUrl,contact)
}

export default {getAll,create}
