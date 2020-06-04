import axios from 'axios'

const base_url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(base_url)
        .then(resp => resp.data)
}

const addPerson = (person) => {
    return axios.post(base_url, person)
        .then(resp => resp.data)
}

const delPerson = (id) => {
    return axios.delete(`${base_url}/${id}`)
}

const updatePerson = (person) => {
    return axios.put(`${base_url}/${person.id}`, person)
        .then(resp => resp.data)
}

export default {getAll, addPerson, delPerson, updatePerson}