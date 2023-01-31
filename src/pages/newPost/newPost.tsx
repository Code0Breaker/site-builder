import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useState, useEffect } from "react"
import FroalaEditor from "react-froala-wysiwyg"
import { createPost, getBlogTag } from "../../api/blogApi"
import { getBlogCategory } from "../../api/categoryApi"
import { FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"
import { IBlogCategories } from "../categories/types"
import { MultipleSelectCategories, MultipleSelectTags } from "./MultipleSelect"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useSnackbar } from "../../types/outletTypes/outletTypes"

const NewPost = () =>{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [text, setText] = useState('')
    const [categories, setCategories] = useState<IBlogCategories[]|null>(null)
    const [selectedCategories,setSelectedCategories] = useState<string[]>([])
    const [selectedTags,setSelectedTags] = useState<string[]>([])
    const [tags, setTags] = useState<{created_at:string|null,id:number,name:string,updated_at:string|null}[]|null>(null)
    const [image, setImage] = useState<any>(null)
    const {setOpenSnacBar} = useSnackbar();
    useEffect(() => {
      (async()=>{
        const fetchCategory = await getBlogCategory()
        const fetchTags = await getBlogTag()
        setCategories(fetchCategory.data)
        setTags(fetchTags.data)
      })()
    }, [])


    const create = async() =>{
        try {
            const form = new FormData()

        if(image){
            form.append('image',image) 
        }

        form.append('translates[en][title]',title) 
        form.append('translates[en][description]',description) 
        form.append('translates[en][content]',text) 
        form.append('published','1') 
        form.append('slug','blog_one') 

        selectedCategories.map(item=>{
            form.append(`categories[${item}]`, item) 
        })
        selectedTags.map(item=>{
            form.append(`tags[${item}]`, item) 
        })

        await createPost(form)
        window.location.reload()
        } catch (error) {
            setOpenSnacBar(true)
        }
        
    }

    return(
        <PaperBox>
                <FlexColumn width={'100%'} gap={3}>
                <FlexCenter>
                    <label htmlFor="upload-flag">
                        <FlexAlignCenter justifyContent={'center'} sx={{cursor:'pointer'}} width={200} height={200}>
                            {image?<img src={image&&URL.createObjectURL(image)} width={'100%'} height={"100%"} style={{objectFit:'contain'}}/>:<InsertPhotoIcon/>}
                        </FlexAlignCenter>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setImage(e?.target?.files?.[0])} type='file' accept="image/png, image/gif, image/jpeg" hidden id="upload-flag"/>
                      </label>
                    </FlexCenter>
                <OutlinedInput sx={{height:'55px'}} placeholder="Enter Blog title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <OutlinedInput sx={{height:'55px'}} placeholder="Enter Blog description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                {categories&&<MultipleSelectCategories title={'Categories'} category={selectedCategories} setCategory={setSelectedCategories} names={categories}/>}
                {tags&&<MultipleSelectTags title={'Tags'} category={selectedTags} setCategory={setSelectedTags} names={tags}/>}
                <FroalaEditor onModelChange={(e:string)=>setText(e)}/>
                <Button variant="contained" fullWidth onClick={create}>Post</Button>
            </FlexColumn>
        </PaperBox>
    )
}

export default NewPost