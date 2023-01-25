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
    form.append('title',state.title.substring(0,3))
    form.append('short_code',state.title.toLowerCase().substring(0,3))
    form.append('code',state.title.toLowerCase().substring(0,3))
    
    const {data} = await Api.post('admin/language',form,{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const removeLanguage = async(id:number)=>{
    const {data} = await Api.delete('admin/language/'+id,{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}

export const editLanguage = async (state:any,id:number) => {
    const {data} = await Api.post('admin/language/'+id,state,{headers:{Authorization:`Bearer ${localStorage.token}`}})
    return data
}