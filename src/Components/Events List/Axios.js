import axios from 'axios'

const baseUrl = "http://eventify.liara.run/"
const AxiosInstance = axios.create({
    baseUrl: baseUrl,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json"
    }
})

export default AxiosInstance