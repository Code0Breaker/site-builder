import { Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton/IconButton"
import { useEffect, useState } from "react"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"
import AddIcon from '@mui/icons-material/Add';
import { CreatePageDialog } from "../../components/languages/createPageDialog"
import EditIcon from '@mui/icons-material/Edit';

import { EditPageDialog } from "../../components/languages/editPageDialog"
import DeleteIcon from '@mui/icons-material/Delete';
import { getSocials, removeSocial } from "../../api/socialApi"
import { ISocial } from "./types"
import { CreateSocialDialog } from "../../components/social/createSocialDialog"
const Social = () =>{
    const [socials, setSocials] = useState<ISocial[]|null>(null)
    const [open, setOpen] = useState(false)
    const [openSocials, setOpenSocials] = useState(false)
    const [selectedSocial, setSelectedSocial] = useState<number|null>(null)
    
    useEffect(()=>{
        (async()=>{
            const data = await getSocials()
            setSocials(data.data)
        })()
    },[])

    const openEditModal = (id:number) =>{
        setSelectedSocial(id)
        setOpenSocials(true)
    }

    const remove = async(id:number) =>{
        const data = await removeSocial(id)
        if(data.data.success === true){
            window.location.reload()
        }
    }
    return(
        <FlexColumn>
            <CreateSocialDialog open={open} setOpen={setOpen}/>
            {/* <CreatePageDialog open={open} setOpen={setOpen}/>
            {selectedSocial&&<EditPageDialog open={openSocials} setOpen={setOpenSocials} id={selectedSocial}/>} */}
            <Box mb={3}>
                <IconButton onClick={()=>setOpen(true)}>
                    <AddIcon/>
                </IconButton>
            </Box>
            <PaperBox>
                <Flex flexWrap={'wrap'} width={'100%'}>
                {
                    socials?.map(item=>{
                        return(
                            <FlexAlignCenter width={200} height={50} sx={{cursor:'pointer'}}>
                                <Typography>{item.title}</Typography>
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

export default Social