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
import { FlexAlignCenter } from "../../models/boxes"
3

export const CreateLanguageDialog = ({open, setOpen}:{open:boolean, setOpen:(state:boolean)=>void}) =>{
    const [language, setLanguage] = useState<{title:string,image:any}>({
        title:'',
        image:null
    })

    const create = async() =>{
       const data = await createLanguage(language)
       console.log(data);
    }

    return(
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
                {language.image?<img src={language.image&&URL.createObjectURL(language.image)} width={'100%'} height={"100%"} style={{objectFit:'contain'}}/>:<InsertPhotoIcon/>}
            </FlexAlignCenter>
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setLanguage({...language, image:e?.target?.files?.[0]})} type='file' accept="image/png, image/gif, image/jpeg" hidden id="upload-flag"/>
          </label>
          <OutlinedInput placeholder="Language name" value={language.title} onChange={e=>setLanguage({...language, title:e.target.value})}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={create} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
}