export interface IAllPages{
    id: number,
    uri: string,
    url: string
    name: string,
    image_id: string,
    status: number,
    created_at: string,
    updated_at: string,
    image: string,
    translates: {
            id: number,
            header_title: string,
            header_description: string,
            content: string,
            footer_title: string,
            footer_description: string,
            meta_data: string,
            language_id: number,
            page_id: number,
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
                created_at: string,
                updated_at: string,
                image: {
                    id: number,
                    name: string
                    path: string
                    url: string
                    type: number,
                    is_default: number,
                    created_at: string,
                    updated_at: string
                }
            }
        }[],
        items: {
            id: number,
            page_id: number,
            image_id: number,
            created_at: string,
            updated_at: string,
            image: {
                id: number
                name: string
                path: string
                url: string
                type: 8,
                is_default: 0,
                created_at: string,
                updated_at: string
            },
            translates: {
                    id: number,
                    title: string
                    title_content: string
                    content: string,
                    language_id: number,
                    page_item_id: number,
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
                        created_at: string,
                        updated_at: string,
                        image: {
                            id: number,
                            name: string
                            path: string
                            url: string
                            type: number,
                            is_default: number,
                            created_at: string,
                            updated_at: string
                        }
                    }
                }
            
        }[]
}