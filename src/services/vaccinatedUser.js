/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
const baseUrl = 'http://localhost:4000/users'

let token = null

export const setToken = newToken => {
    token = newToken
}

const vaccinatedUsers = async () => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.get(baseUrl, config)
    return response.data
}

const vaccinatedUser = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const createVaccinatedUser = async (newVaccinatedUser) => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.post(baseUrl, newVaccinatedUser, config)
    return response.data
}

const incrCount = async (id, qrcount) => {
    const response = await axios.put(`${baseUrl}/qrcount/${id}/`, { ...qrcount, previous_count: qrcount.times })
    return response.data
}

const countUsers = async () => {
    const config = {
        headers: { accessToken: token }
    }
    const response = await axios.get(`${baseUrl}/count_users`, config)
    return response.data
}

export default {
    vaccinatedUsers,
    vaccinatedUser,
    createVaccinatedUser,
    incrCount,
    countUsers
}