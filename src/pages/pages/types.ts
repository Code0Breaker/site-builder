export interface IPages{
        id: number,
        url: string,
        uri: string,
        parent_id: null|string,
        status: number,
        created_at: string,
        updated_at: string,
        translates: {
                id: number,
                title: string,
                menu_id: number,
                language_id: number,
                created_at: string,
                updated_at: string,
                language: {
                    id: number,
                    title: string,
                    short_code: string,
                    code: string,
                    image_id: string,
                    is_default: number,
                    status: number,
                    created_at: string|null,
                    updated_at: string|null,
                    image: {
                        id: number,
                        name: string,
                        path: string,
                        url: string|null,
                        type: number,
                        is_default: number,
                        created_at: string|null,
                        updated_at: string|null
                    }
                }
            }[]
}