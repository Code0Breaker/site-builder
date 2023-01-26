export interface ISettings  {
    id: number,
    key: string,
    image_id: null,
    status: number,
    created_at: string,
    updated_at: string,
    image: {
        id: number
        name: string
        path: string
        url: string
        type: number
        is_default:number
        created_at: string,
        updated_at: string
    },
    translates: {
            id: number,
            content: string,
            language_id: number,
            setting_id: number,
            created_at: string,
            updated_at: string,
            language: {
                id: number,
                title: string,
                short_code: string,
                code: string,
                image_id: number,
                is_default: number,
                status: number,
                created_at: null,
                updated_at: null,
                image: {
                    id: number,
                    name: string,
                    path: string
                    url: string
                    type: number,
                    is_default: number,
                    created_at: null,
                    updated_at: null
                }
            }
        }[]      
}