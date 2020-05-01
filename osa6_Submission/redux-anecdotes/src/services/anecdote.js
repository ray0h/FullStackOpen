import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (newAnecdote) => {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const upVote = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    const updated = {
        content: request.data.content,
        id: id,
        votes: request.data.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, updated)
    return response.data
}

export default { 
    getAll,
    createNew,
    upVote
}