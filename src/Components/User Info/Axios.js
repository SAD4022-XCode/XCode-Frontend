import axios from 'axios'

const baseUrl = "https://eventify.liara.run/account/me/"
const AxiosInstance = axios.create({
    baseUrl: baseUrl,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json"
    }
})

export default AxiosInstance