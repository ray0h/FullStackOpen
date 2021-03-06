import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async(newBlog) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const update = async(id, updatedBlog) => {
    await axios.put(`${baseUrl}/${id}`, updatedBlog)
    const response = await axios.get(baseUrl)
    return response.data
}

const delBlog = async(id) => {
    const config = {
        headers: { Authorization: token }
    }
    await axios.delete(`${baseUrl}/${id}`, config)
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getAll, setToken, create, update, delBlog }