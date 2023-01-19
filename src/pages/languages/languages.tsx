import { Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton/IconButton"
import { useEffect, useState } from "react"

import { getLanguages } from "../../api/languages"
import { Flex, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"
import { ILanguages } from "./types"
import AddIcon from '@mui/icons-material/Add';
import { CreateLanguageDialog } from "../../components/languages/createLanguageDialog"

const Languages = () =>{
    const [langs, setLangs] = useState<ILanguages[]|null>(null)
    const [open, setOpen] = useState(false)
    useEffect(()=>{
        (async()=>{
            const data = await getLanguages()
            setLangs(data.data)
        })()
    },[])

    return(
        <FlexColumn>
            <CreateLanguageDialog open={open} setOpen={setOpen}/>
            <Box mb={3}>
                <IconButton onClick={()=>setOpen(true)}>
                    <AddIcon/>
                </IconButton>
            </Box>
            <PaperBox width={200}>
                <Flex flexWrap={'wrap'}>
                {
                    langs?.map(item=>{
                        return(
                            <FlexCenter width={200} sx={{cursor:'pointer'}}>
                                <Typography>{item.title}</Typography>
                            </FlexCenter>
                        )
                    })
                }
                </Flex>
            </PaperBox>  
        </FlexColumn>
    )
}

export default Languages