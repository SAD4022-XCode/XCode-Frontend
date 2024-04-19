import axios from "axios";

<<<<<<< HEAD
const baseUrl = "http://eventify.liara.run/"
=======
const baseUrl = "http://eventify.liara.run/";
>>>>>>> feat/EventsList
const AxiosInstance = axios.create({
  baseUrl: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
