import { Api } from "./api"

export const loginApi = async(state:{email:string, password:string}) =>{
    try {
        const {data} = await Api.post('admin/login', state)
        localStorage.token = data.token
        localStorage.userName = data.name
        return data
    } catch (error) {
        console.log(error);
    }
}

export const forgotPassword = async(email:string)=>{
    try {
        const {data} = await Api.post('admin/forgot-password',email)
        console.log(data);
        
        return data
    } catch (error) {
        console.log(error);
    }
}