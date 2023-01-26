import { Api } from "./api"

export const getAllPages = async() =>{
    const {data} = await Api.get('admin/page',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createAllPage = async (state:any) => {
    const {data} = await Api.post('admin/page', state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editAllPage = async (state:any,id:number) => {
    const {data} = await Api.post(`admin/page/${id}`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeAllPage = async (id:number) => {
    const {data} = await Api.delete(`admin/page/${id}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}