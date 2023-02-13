import { Api } from "./api"

export const getProjectCategory = async() =>{
    const {data} = await Api.get('admin/category', {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeProjectCategory = async(id:number) =>{
    const {data} = await Api.delete('admin/category/'+id, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createProjectCategory = async(params:any) =>{
    const {data} = await Api.post('admin/category', params, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editProjectCategory = async(params:any,id:number) =>{
    const {data} = await Api.post('admin/category/'+id, params, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const getProjects = async()=>{
    const {data} = await Api.get('admin/project', {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeProjects = async(id:number)=>{
    const {data} = await Api.delete('admin/project/'+id, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createProject = async(params:any)=>{
    const {data} = await Api.post('admin/project', params, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editProject = async(params:any, id:number)=>{
    const {data} = await Api.post('admin/project/'+id, params, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}