import { Api } from "./api"

export const getBlogCategory = async() =>{
    const {data} = await Api.get('admin/blog-category',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createBlogCategory = async (state:any) => {
    const {data} = await Api.post('admin/blog-category', state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editBlogCategory = async (state:any,id:number) => {
    const {data} = await Api.post(`admin/blog-category/${id}`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeBlogCategory = async (id:number) => {
    const {data} = await Api.delete(`admin/blog-category/${id}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}