export interface IBlogCategories{
    id: 1,
    image_id: null|string,
    status: number,
    created_at: string,
    updated_at: string,
    image: null|string,
    translates: {
            id: number,
            title: string,
            description: string,
            category_id: number,
            language_id: number,
            created_at: string,
            updated_at: string,
            language: {
                id: 1,
                title: string,
                short_code: string,
                code: string,
                image_id: string,
                is_default: number,
                status: number,
                created_at: null|string,
                updated_at: null|string,
                image: {
                    id: 2,
                    name: string,
                    path: string,
                    url: string,
                    type: number,
                    is_default: number,
                    created_at: null|string,
                    updated_at: null|string
                }
            }
        }[]
}