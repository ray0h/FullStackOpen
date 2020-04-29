import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credObj) => {
    const response = await axios.post(baseUrl, credObj)
    return response.data
}

export default { login }