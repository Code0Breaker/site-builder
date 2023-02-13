export interface IServiceItem{
    id: number
    service_id: number
    created_at: string
    updated_at: string
    status:number
    translates: {
        id: number,
        title: string
        description:string
        language_id: number
        service_id: number
        created_at: string
        updated_at: string
        service_item_id:string
        language: {
            id: number
            title: string
            short_code: string
            code: string
            image_id: string
            is_default: number
            status: number
            created_at: null
            updated_at: null
            image: {
                id: number
                name: string
                path: string
                url: string
                type: number
                is_default: number
                created_at: null
                updated_at: null
            }
        }
    }[],
    image: {
        id: number
        name: string
        path: string
        url: string
        type: number
        is_default: number
        created_at: string
        updated_at: string
    }
}

export interface IServices {
    id: number,
    status: number,
    created_at: string
    updated_at: string
    translates: {
            id: number,
            title: string
            language_id: number
            service_id: number
            created_at: string
            updated_at: string
            language: {
                id: number
                title: string
                short_code: string
                code: string
                image_id: string
                is_default: number
                status: number
                created_at: null
                updated_at: null
                image: {
                    id: number
                    name: string
                    path: string
                    url: string
                    type: number
                    is_default: number
                    created_at: null
                    updated_at: null
                }
            }
        }[],
        items: IServiceItem[]
}