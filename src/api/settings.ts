import { Api } from "./api"

export const getSetting = async() =>{
    const {data} = await Api.get('admin/setting',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createSetting = async (state:any) => {
    const {data} = await Api.post('admin/setting', state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editSetting = async (state:any,id:number) => {
    const {data} = await Api.post(`admin/setting/${id}`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeSetting = async (id:number) => {
    const {data} = await Api.delete(`admin/setting/${id}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}