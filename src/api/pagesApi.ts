import { Api } from "./api"

export const getMenus = async() =>{
    const {data} = await Api.get('admin/menu',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createMenu = async (state:any) => {
    const {data} = await Api.post('admin/menu', state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editMenu = async (state:any,id:number) => {
    const {data} = await Api.post(`admin/menu/${id}`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeMenu = async (id:number) => {
    const {data} = await Api.delete(`admin/menu/${id}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}