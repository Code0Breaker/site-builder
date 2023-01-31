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
import { editMenu } from "../../api/pagesApi"
import { editSocial } from "../../api/socialApi"
import { FlexAlignCenter, FlexCenter } from "../../models/boxes"
import { editUsers } from "../../api/usersApi"
import { useSnackbar } from "../../types/outletTypes/outletTypes"

export const EditTeamDialog = ({open, setOpen, id}:{id:number, open:boolean, setOpen:(state:boolean)=>void}) =>{
    const {setOpenSnacBar} = useSnackbar();
    const [user, setUser] = useState<{
        name_en:string,
        name_ru:string,
        position_en:string,
        position_ru:string,
        image:any,
    }>({
      name_en:'',
      name_ru:'',
      image:null,
      position_en:'',
      position_ru:''
    })
 
    const save = async() =>{
        const form = new FormData()

        if(user.image){
          form.append('image',user.image)
        }
  
        form.append('translates[en][name]',user.name_en)
        form.append('translates[ru][name]',user.name_ru)
        form.append('translates[en][position]',user.position_en)
        form.append('translates[ru][position]',user.position_ru)
        form.append('status','1')
        form.append('_method','put')
  
         const data = await editUsers(form, id)
         if(data.success === true){
          window.location.reload()
         }else{
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
          {"Edit team"}
        </DialogTitle>
        <FlexCenter>
        <label htmlFor="upload-flag">
            <FlexAlignCenter justifyContent={'center'} sx={{cursor:'pointer'}} width={100} height={100}>
                {user.image?<img src={user.image&&URL.createObjectURL(user.image)} width={'100%'} height={"100%"} style={{objectFit:'contain'}}/>:<InsertPhotoIcon/>}
            </FlexAlignCenter>
            <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, image:e?.target?.files?.[0]})} type='file' accept="image/png, image/gif, image/jpeg" hidden id="upload-flag"/>
          </label>
        </FlexCenter>
        <DialogContent sx={{display:'flex',gap:3, flexDirection:'column'}}>
          <OutlinedInput fullWidth placeholder="Name en" value={user.name_en} onChange={e=>setUser({...user, name_en:e.target.value})}/>
          <OutlinedInput fullWidth placeholder="Name ru" value={user.name_ru} onChange={e=>setUser({...user, name_ru:e.target.value})}/>
          <OutlinedInput fullWidth placeholder="Position en" value={user.position_en} onChange={e=>setUser({...user, position_en:e.target.value})}/>
          <OutlinedInput fullWidth placeholder="Position ru" value={user.position_ru} onChange={e=>setUser({...user, position_ru:e.target.value})}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={save} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
}