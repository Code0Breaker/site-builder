import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton/IconButton"
import { useEffect, useState } from "react"

import { editLanguage, getLanguages, removeLanguage } from "../../api/languages"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"
import { ILanguages } from "./types"
import AddIcon from '@mui/icons-material/Add';
import { CreateLanguageDialog } from "../../components/languages/createLanguageDialog"
import { useSnackbar } from "../../types/outletTypes/outletTypes"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Languages = () =>{
    const {setOpenSnacBar} = useSnackbar()
    const [langs, setLangs] = useState<ILanguages[]|null>(null)
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [image, setImage] = useState<any>(null)
    const [language, setLanguage] = useState({title:'', description:''})
    const [selected, setSelected] = useState<number|null>(null)
    useEffect(()=>{
        (async()=>{
            const data = await getLanguages()
            setLangs(data.data)
        })()
    },[])

    const remove = async(id:number) =>{
        try {
            await removeLanguage(id)
        } catch (error) {
            setOpenSnacBar(true)
        }
    }

    const edit = async () => {
        try {
            const form = new FormData()

        if(image){
            form.append('image',image)
        }

        form.append('title',language.title)
        form.append('description',language.description)
        form.append('status', '1')
        form.append('is_default', '1')
        form.append('_method', 'put')
        form.append('short_code',language.title.toLowerCase().substring(0,3))
        form.append('code',language.title.toLowerCase().substring(0,3))
        const data = await editLanguage(form, selected as number)
        if(data.success === true){
            window.location.reload()
        }
        } catch (error) {
            setOpenSnacBar(true)
        }
    }

    const openEditModal = (id:number) =>{
        setSelected(id)
        setOpenEdit(!openEdit)
    }

    return(
        <FlexColumn>
            <CreateLanguageDialog open={open} setOpen={setOpen}/>
            <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create language"}
        </DialogTitle>
        <DialogContent>
        <label htmlFor="upload-flag">
            <FlexAlignCenter justifyContent={'center'} sx={{cursor:'pointer'}} width={100} height={100}>
                {image?<img src={image&&URL.createObjectURL(image)} width={'100%'} height={"100%"} style={{objectFit:'contain'}}/>:<InsertPhotoIcon/>}
            </FlexAlignCenter>
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setImage(e?.target?.files?.[0])} type='file' accept="image/png, image/gif, image/jpeg" hidden id="upload-flag"/>
          </label>
          <OutlinedInput placeholder="Language name" value={language.title} onChange={e=>setLanguage({...language, title:e.target.value})}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={edit} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
            <Box mb={3}>
                <IconButton onClick={()=>setOpen(true)}>
                    <AddIcon/>
                </IconButton>
            </Box>
            <PaperBox width={'100%'}>
                <Flex flexWrap={'wrap'} gap={3} width={'100%'}>
                {
                    langs?.map(item=>{
                        return(
                        <FlexAlignCenter width={200} height={50} sx={{cursor:'pointer'}}>
                        <Typography>{item.title}</Typography>
                        <IconButton onClick={()=>openEditModal(item.id)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={()=>remove(item.id)}>
                            <DeleteIcon/>
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