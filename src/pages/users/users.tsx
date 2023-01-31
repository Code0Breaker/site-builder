import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
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
 
import { CreateSocialDialog } from "../../components/social/createSocialDialog"
import { EditSocialDialog } from "../../components/social/editSocialDialog"
import { getUsers, removeUsers } from "../../api/usersApi"
import { IUsers } from "./types"
import { CreateUserDialog } from "../../components/users/createUserDialog"
import { EditUserDialog } from "../../components/users/editUserDialog"
const Users = () =>{
    const [users, setUsers] = useState<IUsers[]|null>(null)
    const [openUsers, setOpenUsers] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUsers|null>(null)
    
    useEffect(()=>{
        (async()=>{
            const data = await getUsers()
            setUsers(data.data)
        })()
    },[])

    const openEditModal = (id:IUsers) =>{
        setSelectedUser(id)
        setOpenEdit(true)
    }

    const remove = async(id:number) =>{
        const data = await removeUsers(id)
        if(data.success === true){
            window.location.reload()
        }
    }
    return(
        <FlexColumn>
            <CreateUserDialog open={openUsers} setOpen={setOpenUsers}/>
            {selectedUser&&<EditUserDialog open={openEdit} setOpen={setOpenEdit} id={selectedUser}/>}
            <Box mb={3}>
                <IconButton onClick={()=>setOpenUsers(true)}>
                    <AddIcon/>
                </IconButton>
            </Box>
            <PaperBox>
                <Flex flexWrap={'wrap'} width={'100%'} gap={3}>
                {
                    users?.map(item=>{
                        return(
                            <Card sx={{ minWidth: 245 }}>
                              <CardMedia
                                image={item.image.url}
                                sx={{ height: 140 }}
                                title={item.email}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                   {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                   {item.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <>Verified at {new Date(item.email_verified_at).toLocaleDateString()}</>
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button size="small" onClick={()=>remove(item.id)} disabled={localStorage.userName===item.name}>Remove</Button>
                                <Button size="small" onClick={()=>openEditModal(item)}>Edit</Button>
                              </CardActions>
                            </Card>
                        )
                    })
                }
                </Flex>
            </PaperBox>  
        </FlexColumn>
    )
}

export default Users