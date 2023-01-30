import { Api } from "./api"

export const removeItem = async (pageId:number, itemId:number) => {
    const {data} = await Api.delete(`admin/${pageId}/page-item/${itemId}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}


export const createItem = async (pageId:number, state:any) => {
    const {data} = await Api.post(`admin/${pageId}/page-item`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editItem = async (pageId:number, itemId:number, state:any) => {
    const {data} = await Api.post(`admin/${pageId}/page-item/${itemId}`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}