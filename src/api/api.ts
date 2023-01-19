import axios from "axios";

export const Api = axios.create({
    baseURL:'https://xcode.maghun.in/api/'
})