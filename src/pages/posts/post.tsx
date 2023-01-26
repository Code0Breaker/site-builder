import { Button, OutlinedInput, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import FroalaEditor from "react-froala-wysiwyg"
import { useNavigate, useParams } from "react-router-dom"
import { editPost, getBlogTag, getPost } from "../../api/blogApi"
import { getBlogCategory } from "../../api/categoryApi"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn } from "../../models/boxes"
import { useSnackbar } from "../../types/outletTypes/outletTypes"
import { IBlogCategories } from "../categories/types"
import { MultipleSelectCategories, MultipleSelectTags } from "../newPost/MultipleSelect"
import { IPosts } from "./types"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const Post = ({type}:{type:'edit'|'read'}) =>{
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
    const [state, setState] = useState<IPosts|null>(null)
    const {id} = useParams() 
    const navigate = useNavigate()
    useEffect(()=>{
        (async()=>{
            const data = await getPost(id as string)
            setState(data.data)
        })()
    },[id])

    const edit = async() =>{
        try {
            const form = new FormData()

        if(image){
            form.append('image',image) 
        }

        form.append('translates[en][title]',title) 
        form.append('translates[en][description]',description) 
        form.append('translates[en][content]',text) 
        form.append('published','1') 
        form.append('_method','put') 
        

        selectedCategories.map((item,index)=>{
            form.append(`categories[${item}]`, item) 
        })
        selectedTags.map(item=>{
            form.append(`tags[${item}]`, item) 
        })
        await editPost(form, id as string)
        navigate('/home/posts')
        } catch (error) {
            setOpenSnacBar(true)
        }
        
    }

    return(
        <FlexColumn>
            {
            type==='read'?<Flex>
                <img src={state?.image?.url} width={"400"} height={"400"} style={{objectFit:'contain'}}/>
                <FlexColumn ml={3}>
                    <Button onClick={()=>navigate('/home/post/edit/'+id)}>Edit</Button>
                    <Typography variant="h3">{state?.translates[0].title}</Typography>
                    <Typography variant="h5">{state?.translates[0].description}</Typography>
                    {/* @ts-ignore */}
                    <div dangerouslySetInnerHTML={{__html:state?.translates[0].content as Element||<p></p>}}/>
                    <Typography>Tags</Typography>
                    <Flex maxWidth={500} gap={2} mb={3}>
                        {
                            state?.tags.map(item=>{
                                return <Typography variant="caption">{item.name}</Typography>
                            })
                        }
                    </Flex>
                    <Typography>Categories</Typography>
                    <Flex maxWidth={500} gap={2}>
                        {
                            state?.categories.map(item=>{
                                return <Typography variant="caption">{item.translates[0].title}</Typography>
                            })
                        }
                    </Flex>
                </FlexColumn>
            </Flex>:
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
            {/* model={state?.translates[0].content} */}
            <FroalaEditor  onModelChange={(e:string)=>setText(e)}/>
            <Button variant="contained" fullWidth onClick={edit}>Post</Button>
        </FlexColumn>
            }
        </FlexColumn>
    )
}

export default Post