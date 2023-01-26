import { Api } from "./api"

export const getMessages = async() =>{
    const {data} = await Api.get('admin/message',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const markMessage = async(id:number) =>{
    const form = new FormData()
    form.append('status','1')
    form.append('_method','put')
    const {data} = await Api.post('admin/message/'+id,form,{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeMessage = async(id:number) =>{
    const {data} = await Api.delete('admin/message/'+id,{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}