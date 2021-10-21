/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
const baseUrl = 'https://vaccination-nodejs-backend.herokuapp.com/login'

const login = async credential => {
    const response = await axios.post(baseUrl, credential)
    return response.data
}

export default {
    login
}