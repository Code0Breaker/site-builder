import { Button, Card, CardActions, CardContent, CardMedia, Checkbox, Switch, Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton/IconButton"
import { useEffect, useState } from "react"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"
import AddIcon from '@mui/icons-material/Add';
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
        setErrorText(error.response.data.message)
 
        setOpenSnacBar(true)
    }
    }

    const setSwitcher = async(member:ITeam, checked:boolean) =>{
        try {
            const form = new FormData()
            form.append('translates[en][name]',member?.translates?.[0]?.name||'')
            form.append('translates[ru][name]',member?.translates?.[1]?.name||'')
            form.append('translates[en][position]',member?.translates?.[0]?.position||'')
            form.append('translates[ru][position]',member?.translates?.[1]?.position||'')
            form.append('status',checked?'0':'1')
            form.append('_method','put')
            await editTeam(form, member.id)
            window.location.reload()
        } catch (error:any) {
            // console.log(error);
            
            setErrorText(error?.response?.data?.message)
        
            setOpenSnacBar(true)
        }
       
    }

    return(
        <FlexColumn>
            <CreateTeamDialog open={openTeam} setOpen={setOpenTeam}/>
            {selectedUser&&<EditTeamDialog open={openEdit} setOpen={setOpenEdit} id={selectedUser}/>}
            <Box mb={3}>
                <Button variant="outlined" endIcon={ <AddIcon/>} onClick={()=>setOpenTeam(true)}>create</Button>
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
                                  <>Created at {new Date(item.created_at).toLocaleDateString()}</>
                                </Typography>
                                
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