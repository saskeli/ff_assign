import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const postNew = (person) => {
    return axios.post(baseUrl, person)
        .then(response => response.data)
}

const removePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

const updateNumber = (id, np) => {
    return axios.put(`${baseUrl}/${id}`, np)
        .then(response => response.data)
}

export default {
    getAll, 
    postNew,
    removePerson,
    updateNumber
}