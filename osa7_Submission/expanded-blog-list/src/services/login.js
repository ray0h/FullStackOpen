import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credObj) => {
    const response = await axios.post(baseUrl, credObj)
    console.log('service', response.data)
    return response.data
}

export default { login }