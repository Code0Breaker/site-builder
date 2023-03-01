import { Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton/IconButton"
import { useEffect, useState } from "react"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"
import { IPages } from "./types"
import AddIcon from '@mui/icons-material/Add';
import { CreatePageDialog } from "../../components/languages/createPageDialog"
import EditIcon from '@mui/icons-material/Edit';
import { getMenus, removeMenu } from "../../api/pagesApi"
import { EditPageDialog } from "../../components/languages/editPageDialog"
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button"
const Languages = () =>{
    const [pages, setPages] = useState<IPages[]|null>(null)
    const [open, setOpen] = useState(false)
    const [openPages, setOpenPages] = useState(false)
    const [selectedPage, setSelectedPage] = useState<number|null>(null)
    
    useEffect(()=>{
        (async()=>{
            const data = await getMenus()
            setPages(data.data)
        })()
    },[])

    const openEditModal = (id:number) =>{
        setSelectedPage(id)
        setOpenPages(true)
    }

    const remove = async(id:number) =>{
        const data = await removeMenu(id)
        if(data.success === true){
            window.location.reload()
        }
    }
    return(
        <FlexColumn>
            <CreatePageDialog open={open} setOpen={setOpen}/>
            {selectedPage&&<EditPageDialog open={openPages} setOpen={setOpenPages} id={selectedPage}/>}
            <Box mb={3}>
            <Button variant="outlined" endIcon={ <AddIcon/>} onClick={()=>setOpen(true)}>create</Button>
               
            </Box>
            <PaperBox>
                <Flex flexWrap={'wrap'} width={'100%'}>
                {
                    pages?.map(item=>{
                        return(
                            <FlexAlignCenter width={200} height={50} sx={{cursor:'pointer'}}>
                                <Typography>{item.translates[0].title}</Typography>
                                <IconButton onClick={()=>openEditModal(item.id)}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onClick={()=>remove(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </FlexAlignCenter>
                        )
                    })
                }
                </Flex>
            </PaperBox>  
        </FlexColumn>
    )
}

export default Languages