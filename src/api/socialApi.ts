import { Api } from "./api"

export const getSocials = async() =>{
    const {data} = await Api.get('admin/social-link',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createSocial = async (state:any) => {
    const {data} = await Api.post('admin/social-link', state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editSocial = async (state:any,id:number) => {
    const {data} = await Api.post(`admin/social-link/${id}`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeSocial = async (id:number) => {
    const {data} = await Api.delete(`admin/social-link/${id}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}