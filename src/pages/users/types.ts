export interface IUsers{
    id: 1,
    name: string,
    email: string,
    image_id: number,
    email_verified_at: string
    created_at: null,
    updated_at: null,
    image: {
        id: number,
        name: string
        path: string
        url:  number,
        type:string
        is_default: number,
        created_at: string|null,
        updated_at: string|null
    }
}