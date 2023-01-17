import axios from "axios";

export const Api = axios.create({
    baseURL:'http://37.18.110.46/api/'
})