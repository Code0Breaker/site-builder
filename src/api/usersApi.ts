import { Api } from "./api"

export const getUsers = async() =>{
    const {data} = await Api.get('admin/user',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createUsers = async (state:any) => {
    const {data} = await Api.post('admin/user', state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editUsers = async (state:any,id:number) => {
    const {data} = await Api.post(`admin/user/${id}`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeUsers = async (id:number) => {
    const {data} = await Api.delete(`admin/user/${id}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}