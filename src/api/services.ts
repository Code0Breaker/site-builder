import { Api } from "./api"

export const getServices = async() =>{
    const {data} = await Api.get(`admin/service`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const getService = async(id:string) =>{
    const {data} = await Api.get(`admin/service-item/${id}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const getServiceItems = async() =>{
    const {data} = await Api.get('admin/service-item', {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const serviceCreate = async (params:any) => {
    const {data} = await Api.post('admin/service',params, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const serviceEdit = async (params:any, id:number) => {
    const {data} = await Api.post('admin/service/'+id,params, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const serviceItemCreate = async (params:any) => {
    const {data} = await Api.post('admin/service-item',params, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const serviceItemEdit = async (params:any, id:number) => {
    const {data} = await Api.post('admin/service-item/'+id,params, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeServiceTitle = async(id:number) =>{
    const {data} = await Api.delete('admin/service-item/'+id, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeServiceItem = async(id:number) =>{
    const {data} = await Api.delete('admin/service/'+id, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}