import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, IconButton, OutlinedInput, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import FroalaEditor from "react-froala-wysiwyg"
import { useNavigate, useParams } from "react-router-dom"
import { editPost, getBlogTag, getPost } from "../../api/blogApi"
import { getBlogCategory } from "../../api/categoryApi"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn } from "../../models/boxes"
import { useSnackbar } from "../../types/outletTypes/outletTypes"
import { IBlogCategories } from "../categories/types"
import { MultipleSelectCategories, MultipleSelectTags } from "../newPost/MultipleSelect"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { IAllPages } from "./types"
import { getAllPage } from "../../api/allPages"
import AddIcon from '@mui/icons-material/Add';
import { removeItem } from "../../api/portfolio"
import { ItemDialog } from "../../components/itemDialog/createItemDialog"
import { EditGlobalitemDialog } from "../../components/itemDialog/editItemDialog"

const AllPage = () =>{
    const [state, setState] = useState<IAllPages|null>(null)
    const {setOpenSnacBar} = useSnackbar();
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<number|null>(null)
    const [image,setImage] = useState<any>(null)
    const {id} = useParams() 
    const navigate = useNavigate()
    useEffect(()=>{
        (async()=>{
            const data = await getAllPage(id as string)
            setState(data.data)
        })()
    },[id])

  const remove = async(itemId:number) =>{
    try {
        await removeItem(id as unknown as number,itemId)
        window.location.reload()
    } catch (error) {
        setOpenSnacBar(true)
    }
  }

  const openEditModal = (id:number) =>{
    // const findOne = categories?.find(item=>item.id === id)
    setOpenEdit(true)
    setSelectedCategory(id)
    // setCategoryName({name:findOne?.translates[0].title as string,description:findOne?.translates[0].description as string})
}
// 

    return(
        <FlexColumn>
            <ItemDialog open={open} setOpen={setOpen}/>
            {selectedCategory&&<EditGlobalitemDialog itemId={selectedCategory} open={openEdit} setOpen={setOpenEdit}/>}
             <Flex>
                <img src={state?.image?.url} width={"400"} height={"400"} style={{objectFit:'contain'}}/>
                <FlexColumn ml={3}>
                    <Typography>Created at {new Date(state?.created_at as string).toDateString()}</Typography>
                    <Typography variant="h6" alignItems={'center'} display={'flex'} gap={3}><Typography fontWeight={'bold'}>Url:</Typography>{state?.url}</Typography>
                    <Typography variant="h6" alignItems={'center'} display={'flex'} gap={3}><Typography fontWeight={'bold'}>Uri:</Typography>{state?.uri}</Typography>
                    <Typography variant="h6" alignItems={'center'} display={'flex'} gap={3}><Typography fontWeight={'bold'}>Header title:</Typography>{state?.translates[0].header_title}</Typography>
                    <Typography variant="h6" alignItems={'center'} display={'flex'} gap={3}><Typography fontWeight={'bold'}>Header description:</Typography>{state?.translates[0].header_description}</Typography>
                    <Typography variant="h6" alignItems={'center'} display={'flex'} gap={3}><Typography fontWeight={'bold'}>Footer title:</Typography>{state?.translates[0].footer_title}</Typography>
                    <Typography variant="h6" alignItems={'center'} display={'flex'} gap={3}><Typography fontWeight={'bold'}>Footer description:</Typography>{state?.translates[0].footer_description}</Typography>
                    <Typography variant="h6" alignItems={'center'} display={'flex'} gap={3}><Typography fontWeight={'bold'}>Meta data:</Typography>{state?.translates[0].meta_data}</Typography>
                </FlexColumn>
            </Flex> 
            <FlexAlignCenter m={3}>
                <Typography variant="h4">Items</Typography>
                <IconButton onClick={()=>setOpen(true)}>
                    <AddIcon/>
                </IconButton>
            </FlexAlignCenter>
            
            <Flex gap={3}>
            {
                state?.items.map(item=>{
                    return(
                        <Card sx={{ minWidth: 245 }}>
                        <CardMedia
                          image={item.image?.url||''}
                          sx={{ height: 140 }}
                          title={item.translates[0].title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                             {item.translates[0].title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <>Verified at {new Date(item.created_at).toLocaleDateString()}</>
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={()=>remove(item.id)}>Remove</Button>
                          <Button size="small" onClick={()=>openEditModal(item.id)}>Edit</Button>
                        </CardActions>
                      </Card>
                    )
                })
            }
            </Flex>
        </FlexColumn>
    )
}

export default AllPage