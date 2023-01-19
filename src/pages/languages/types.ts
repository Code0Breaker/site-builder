export interface ILanguages{
    id: number,
    title: string,
    short_code: string,
    image_id: string,
    is_default: number,
    status: number,
    created_at: null|string,
    updated_at: null|string,
    image: {
      id: number,
      name:string,
      path:string,
      url: string
      type: number,
      is_default: number,
      created_at: string
      updated_at: string
    }
  }