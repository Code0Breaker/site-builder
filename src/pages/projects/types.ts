export interface IProject{
    id: number
    image_id: number
    complete_date: string
    link: string
    uri: string
    client: string
    rating: number
    status: number
    created_at: string
    updated_at: string
    image: {
        id: number
        name: string
        path: string
        url: string
        type: number
        is_default: number
        created_at: string
        updated_at: string
    },
    categories: any[],
    social_links: {
            id: number
            title: string
            url: string
            type: number
            image_id: number
            project_id: number
            class_name: string
            created_at: string
            updated_at: string
            image: {
                id: number
                name: string
                path: string
                url: string
                type: number
                is_default: number
                created_at: string
                updated_at: string
        }[],
   
    },
    translates: {
        id: number
        title: string
        short_description: string
        description: string
        project_id: number
        language_id: number
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
            created_at: null,
            updated_at: null,
            image: {
                id: number
                name: string
                path: string
                url: string
                type: number
                is_default: number
                created_at: null,
                updated_at: null
            }
        }
    }[]
}