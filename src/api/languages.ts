import { Api } from "./api"

export const getLanguages = async() =>{
    const {data} = await Api.get('admin/language',{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const createLanguage = async(state:{title:string,image:any})=>{
    const form = new FormData()

    if(state.image){
        form.append('image',state.image)
    }

    form.append('title',state.title)
    form.append('short_code',state.title.toLowerCase())
    
    const {data} = await Api.post('admin/language',form,{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}