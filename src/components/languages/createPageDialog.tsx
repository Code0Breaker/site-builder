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
import { createMenu } from "../../api/pagesApi"


export const CreatePageDialog = ({open, setOpen}:{open:boolean, setOpen:(state:boolean)=>void}) =>{
    const [page, setPage] = useState({en:'', ru:''})
    const dataToSave = {
        "translates":{"en":{"title": page.en}, "ru":{"title":page.ru}},
        "uri":`#pages/${page.en.split(' ')[0].toLowerCase()}`,
        "url":`/home/${page.en.split(' ')[0].toLowerCase()}`,
        "status":1
    }
    const create = async() =>{
       const data = await createMenu(dataToSave)
       if(data.success === true){
        window.location.reload()
       }
    //    console.log(data);
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
        <DialogContent sx={{display:'flex',gap:3}}>
          <OutlinedInput placeholder="Page name en" value={page.en} onChange={e=>setPage({...page, en:e.target.value})}/>
          <OutlinedInput placeholder="Page name ru" value={page.ru} onChange={e=>setPage({...page, ru:e.target.value})}/>
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