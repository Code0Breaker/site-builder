export interface ITeam{
        id: number,
        image_id: number,
        status: number,
        created_at:string,
        updated_at:string,
        image: {
            id: number,
            name: string
            path: string
            url:string
            type: number,
            is_default: number,
            created_at:string,
            updated_at:string
        },
        translates:  {
                id: number,
                team_id: number,
                language_id: number,
                name: string,
                position: string,
                created_at:string,
                updated_at:string,
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