import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { OutlinedInput, TextField } from '@mui/material';
import { useState } from 'react';
import { forgotPassword } from '../../api/authApi';

export default function ForgotPassword({open,setOpen,next}:{next:(state:boolean)=>void, open:boolean,setOpen:(state:boolean)=>void}) {
 const [email, setEmail] = useState('')
    const send = async() =>{
        await forgotPassword(email)
        // next(true)
        setOpen(false)
    }
  return (
    <div>
      <Dialog
      fullWidth
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Forgot password?"}
        </DialogTitle>
        <DialogContent sx={{width: window.innerWidth > 600 ? "500px" : "auto"}}>
            <OutlinedInput 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            sx={{border:'1px solid #ced4da', borderRadius:'5px',height:'35px',color:'gray',width:"308px"}} 
            placeholder="Email"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>cancel</Button>
          <Button onClick={send}>request change password</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
