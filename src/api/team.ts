import { Api } from "./api"

export const getTeam = async() =>{
    const {data} = await Api.get('admin/team',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createTeam = async (state:any) => {
    const {data} = await Api.post('admin/team', state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editTeam = async (state:any,id:number) => {
    const {data} = await Api.post(`admin/team/${id}`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeTeam = async (id:number) => {
    const {data} = await Api.delete(`admin/team/${id}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}