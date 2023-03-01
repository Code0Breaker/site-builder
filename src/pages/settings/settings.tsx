import { Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton/IconButton"
import { useEffect, useState } from "react"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"

import AddIcon from '@mui/icons-material/Add';
import { CreatePageDialog } from "../../components/languages/createPageDialog"
import EditIcon from '@mui/icons-material/Edit';
import { getMenus, removeMenu } from "../../api/pagesApi"
import { EditPageDialog } from "../../components/languages/editPageDialog"
import DeleteIcon from '@mui/icons-material/Delete';
import { getSetting, removeSetting } from "../../api/settings"
import { ISettings } from "./types"
import { CreateSettingsDialog } from "../../components/settings/createSettings"
import { EditSettingsDialog } from "../../components/settings/editSettings"
import Button from "@mui/material/Button/Button"
const Settings = () =>{
    const [settings, setSettings] = useState<ISettings[]|null>(null)
    const [open, setOpen] = useState(false)
    const [openSetting, setOpenSetting] = useState(false)
    const [selectedSetting, setSelectedSetting] = useState<ISettings|null>(null)
    
    useEffect(()=>{
        (async()=>{
            const data = await getSetting()
            setSettings(data.data)
        })()
    },[])

    const openEditModal = (id:ISettings) =>{
        setSelectedSetting(id)
        setOpenSetting(true)
    }

    const remove = async(id:number) =>{
        const data = await removeSetting(id)
        if(data.success === true){
            window.location.reload()
        }
    }
    return(
        <FlexColumn>
            <CreateSettingsDialog open={open} setOpen={setOpen}/>
            {selectedSetting&&<EditSettingsDialog open={openSetting} setOpen={setOpenSetting} id={selectedSetting}/>}
            <Box mb={3}>
                <Button variant="outlined" endIcon={ <AddIcon/>} onClick={()=>setOpen(true)}>create</Button>
            </Box>
            <PaperBox>
                <Flex flexWrap={'wrap'} width={'100%'} gap={2}>
                {
                    settings?.map(item=>{
                        return(
                            <FlexAlignCenter maxWidth={400} height={50} sx={{cursor:'pointer'}}>
                                <Typography>{item.key}: {item.translates[0].content}</Typography>
                                <IconButton onClick={()=>openEditModal(item)}>
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

export default Settings