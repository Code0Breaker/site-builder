import { Api } from "./api"

export const getBlogTag = async() =>{
    const {data} = await Api.get('admin/blog-tag',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createBlogTag = async (state:any) => {
    const {data} = await Api.post('admin/blog-tag', {name:state}, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editBlogTag = async (state:any,id:number) => {
    const {data} = await Api.post(`admin/blog-tag/${id}`, state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeBlogTag = async (id:number) => {
    const {data} = await Api.delete(`admin/blog-tag/${id}`, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createPost = async (state:any) => {
    const {data} = await Api.post('admin/blog',state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editPost = async (state:any, id:string) => {
    const {data} = await Api.post('admin/blog/'+id,state, {headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const getPosts = async () => {
    const {data} = await Api.get('admin/blog',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}


export const getPost = async (id:string) => {
    const {data} = await Api.get('admin/blog/'+id,{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removePost = async (id:number) => {
    const {data} = await Api.delete('admin/blog/'+id,{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}