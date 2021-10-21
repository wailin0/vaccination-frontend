/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
const baseUrl = 'http://localhost:4000/users/login'

const login = async credential => {
    const response = await axios.post(baseUrl, credential)
    return response.data
}

export default {
    login
}