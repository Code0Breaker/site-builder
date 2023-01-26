export interface IPosts{
    id: number,
    image_id: null,
    published: number,
    publish_date: string,
    created_at: string,
    updated_at: string,
    image: {
        id: number,
        name: string,
        path:string
        url:string
        type: number,
        is_default: number,
        created_at: string,
        updated_at: string
    }|null,
    translates: {
            id: number,
            title: string,
            description: string,
            content: Element,
            blog_id: number,
            language_id: number,
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
                    path: string,
                    url: string
                    type: number,
                    is_default: number,
                    created_at: null,
                    updated_at: null
                }
            }
        }[],
    categories: {
            id: 3,
            image_id: null,
            status: number,
            created_at: string,
            updated_at: string,
            pivot: {
                blog_id: number,
                category_id: 3
            },
            image: null,
            translates: {
                    id: 4,
                    title: string,
                    description: string,
                    category_id: 3,
                    language_id: number,
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
                            path: string,
                            url: string
                            type: number,
                            is_default: number,
                            created_at: null,
                            updated_at: null
                        }
                    }
                }[]
            
        }[],
        tags: {
            id: number,
            name: string,
            created_at: string,
            updated_at: string,
            pivot: {
                blog_id: number,
                tag_id: number
            }
        }[]
}