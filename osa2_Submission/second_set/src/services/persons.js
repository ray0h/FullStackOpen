import axios from "axios"

const localURL="/api/persons"

const getAll = () => {
    const request = axios.get(localURL)
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(localURL, person)
    return request.then(response => response.data)
}

const erase = (id) => {
    return axios.delete(`${localURL}/${id}`)
}

const update = (id, changed) => {
    const request = axios.put(`${localURL}/${id}`, changed)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    erase,
    update
}