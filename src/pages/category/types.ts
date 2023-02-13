export interface ICategories{
    id: number,
    image_id: number,
    type: number,
    status: number,
    created_at: string
    updated_at: string
    type_name: string
    image: {
        id: number,
        name:string
        path: string
        url: string
        type: number,
        is_default: number,
        created_at: string
        updated_at: string
    },
    translates: {
            id: number,
            title: string
            description:string
            category_id: number,
            language_id: number,
            created_at: string
            updated_at: string
            language: {
                id: number,
                title: string
                short_code: string
                code: string
                image_id: string
                is_default: number,
                status: number,
                created_at: null,
                updated_at: null,
                image: {
                    id: number,
                    name: string
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