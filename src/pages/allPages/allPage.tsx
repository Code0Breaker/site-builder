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
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { IAllPages } from "./types"
import { getAllPage } from "../../api/allPages"

const AllPage = () =>{
    const [state, setState] = useState<IAllPages|null>(null)
    const {setOpenSnacBar} = useSnackbar();
    const {id} = useParams() 
    const navigate = useNavigate()
    useEffect(()=>{
        (async()=>{
            const data = await getAllPage(id as string)
            setState(data.data)
        })()
    },[id])

  

    return(
        <FlexColumn>
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
        </FlexColumn>
    )
}

export default AllPage