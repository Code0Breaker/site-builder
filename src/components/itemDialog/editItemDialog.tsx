import Button from "@mui/material/Button/Button"
import Dialog from "@mui/material/Dialog/Dialog"
import DialogActions from "@mui/material/DialogActions/DialogActions"
import DialogContent from "@mui/material/DialogContent/DialogContent"
import DialogContentText from "@mui/material/DialogContentText/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle/DialogTitle"
import { Box } from "@mui/system"
import { useState } from "react"
import { createLanguage } from "../../api/languages"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput"
import { useSnackbar } from "../../types/outletTypes/outletTypes"
import { FlexAlignCenter, FlexCenter } from "../../models/boxes"
import { useParams } from "react-router-dom"
import { editItem } from "../../api/portfolio"


export const EditGlobalitemDialog = ({open, setOpen, itemId}:{itemId:number, open:boolean, setOpen:(state:boolean)=>void}) =>{
    const {setOpenSnacBar} = useSnackbar();
    const {id} = useParams() 
  const [item, setItem] = useState<{
    title:string,
    title_content:string,
    content:string,
    image:any,
    }>({
        title:'',
        title_content:'',
        image:null,
        content:'',
    })
     
    const save = async() =>{
        try {
            const form = new FormData()

            if(item.image){
              form.append('image',item.image)
            }
      
            form.append('translates[en][title]',item.title)
            form.append('translates[en][title_content]',item.title_content)
            form.append('translates[en][content]',item.content)
            form.append('status','1')
            form.append('_method','put')
            
      
             const data = await editItem(id as unknown as number, itemId, form )
             if(data.success === true){
              window.location.reload()
             }else{
              setOpenSnacBar(true)
             }
        } catch (error) {
            setOpenSnacBar(true)
        }
    }

    return(
        <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit item"}
        </DialogTitle>
        <FlexCenter>
        <label htmlFor="upload-flag">
            <FlexAlignCenter justifyContent={'center'} sx={{cursor:'pointer'}} width={100} height={100}>
                {item.image?<img src={item.image&&URL.createObjectURL(item.image)} width={'100%'} height={"100%"} style={{objectFit:'contain'}}/>:<InsertPhotoIcon/>}
            </FlexAlignCenter>
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setItem({...item, image:e?.target?.files?.[0]})} type='file' accept="image/png, image/gif, image/jpeg" hidden id="upload-flag"/>
          </label>
        </FlexCenter>
        <DialogContent sx={{display:'flex',gap:3, flexDirection:'column'}}>
          <OutlinedInput fullWidth placeholder="Title" value={item.title} onChange={e=>setItem({...item, title:e.target.value})}/>
          <OutlinedInput fullWidth placeholder="Content title" value={item.title_content} onChange={e=>setItem({...item, title_content:e.target.value})}/>
          <OutlinedInput fullWidth placeholder="Content" value={item.content} onChange={e=>setItem({...item, content:e.target.value})}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={save} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    )
}