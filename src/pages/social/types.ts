export interface ISocial{
    id: number,
    title: string,
    url: string,
    image_id: number,
    class_name: string,
    created_at: string,
    updated_at: string,
    image: {
        id: number,
        name: string,
        path: string,
        url: string,
        type: number,
        is_default: number,
        created_at: string,
        updated_at: string
    }
}