import { Button, Card, CardActions, CardContent, CardMedia, Switch, Typography } from "@mui/material"
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
import { CreateUserDialog } from "../../components/users/createUserDialog"
import { EditUserDialog } from "../../components/users/editUserDialog"
import { ITeam } from "./types"
import { editTeam, getTeam, removeTeam } from "../../api/team"
import { CreateTeamDialog } from "../../components/team/createTeam"
import { EditTeamDialog } from "../../components/team/editTeam"
import { useSnackbar } from "../../types/outletTypes/outletTypes"

const Team = () =>{
    const [team, setTeam] = useState<ITeam[]|null>(null)
    const [openTeam, setOpenTeam] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedUser, setSelectedUser] = useState<ITeam|null>(null)
    const {setOpenSnacBar,setErrorText} = useSnackbar();
    useEffect(()=>{
        (async()=>{
            const {data} = await getTeam()
            setTeam(data.data)
        })()
    },[])

    const openEditModal = (id:ITeam) =>{
        setSelectedUser(id)
        setOpenEdit(true)
    }

    const remove = async(id:number) =>{
        try {
            const data = await removeTeam(id)
        if(data.success === true){
            window.location.reload()
        }
    } catch (error:any) {
        let errors:any[] = Object.values(error.response.data.errors).flat(1)
        for(let err of errors){
          setErrorText(err)
          break
        }
        setOpenSnacBar(true)
    }
    }

    const setSwitcher = async(member:ITeam, checked:string) =>{
        try {
            const form = new FormData()
            form.append('translates[en][name]',member.translates[0].name)
            form.append('translates[ru][name]',member.translates[1].name)
            form.append('translates[en][position]',member.translates[0].position)
            form.append('translates[ru][position]',member.translates[1].position)
            form.append('status',checked?'0':'1')
            form.append('_method','put')
            await editTeam(form, member.id)
            window.location.reload()
        } catch (error:any) {
            let errors:any[] = Object.values(error.response.data.errors).flat(1)
            for(let err of errors){
              setErrorText(err)
              break
            }
            setOpenSnacBar(true)
        }
       
    }

    return(
        <FlexColumn>
            <CreateTeamDialog open={openTeam} setOpen={setOpenTeam}/>
            {selectedUser&&<EditTeamDialog open={openEdit} setOpen={setOpenEdit} id={selectedUser}/>}
            <Box mb={3}>
                <IconButton onClick={()=>setOpenTeam(true)}>
                    <AddIcon/>
                </IconButton>
            </Box>
            <PaperBox>
                <Flex flexWrap={'wrap'} width={'100%'} gap={3}>
                {
                    team?.map(item=>{
                        return(
                            <Card sx={{ minWidth: 245 }}>
                              <CardMedia
                                image={item.image.url}
                                sx={{ height: 140 }}
                                title={item.translates[0].name}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                   {item.translates[0].name}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                   {item.translates[0].position}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <>Verified at {new Date(item.created_at).toLocaleDateString()}</>
                                </Typography>
                                <Switch checked={Boolean(+item.status)} onChange={e=>setSwitcher(item, Number(e.target.checked).toString())}/>
                              </CardContent>
                              <CardActions>
                                <Button size="small" onClick={()=>remove(item.id)}>Remove</Button>
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

export default Team