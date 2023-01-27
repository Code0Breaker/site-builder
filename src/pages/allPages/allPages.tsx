import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllPages, removeAllPage } from "../../api/allPages"
import { Flex, FlexAlignCenter, FlexColumn, PaperBox } from "../../models/boxes"
import { IAllPages } from "./types"
import AddIcon from '@mui/icons-material/Add';
import { CreateGlobalPageDialog } from "../../components/allPages/createGlobalPage"
import { EditGlobalPageDialog } from "../../components/allPages/editGlobalPage"
import { useSnackbar } from "../../types/outletTypes/outletTypes"
import { useNavigate } from "react-router-dom"

const AllPages = () =>{
    const {setOpenSnacBar} = useSnackbar();
    const [allpages, setAllPages] = useState<IAllPages[]|null>(null)
    const [openPage, setOpenPage] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedPage, setSelectedPage] = useState<null|number>(null)
    const navigate = useNavigate()
    useEffect(()=>{
        (async()=>{
            const {data} = await getAllPages()
            setAllPages(data)
        })()
    },[])

    const remove = async(id:number) => {
        try {
            await removeAllPage(id)
            window.location.reload()
        } catch (error) {
            setOpenSnacBar(true)
        }
    }

    const openEditModal = (id:number) => {
        setOpenEdit(true)
        setSelectedPage(id)
    }

    return(
        <FlexColumn>
        <CreateGlobalPageDialog open={openPage} setOpen={setOpenPage}/>
        {selectedPage&&<EditGlobalPageDialog open={openEdit} setOpen={setOpenEdit} id={selectedPage}/>}
        <Box mb={3}>
            <IconButton onClick={()=>setOpenPage(true)}>
                <AddIcon/>
            </IconButton>
        </Box>
        <PaperBox>
            <Flex flexWrap={'wrap'} width={'100%'} gap={3}>
            {
                allpages?.map(item=>{
                    return(
                        <Card sx={{ minWidth: 245 }}>
                          <CardMedia
                            image={item.image?.url||''}
                            sx={{ height: 140 }}
                            title={item.name}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                               {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <>Verified at {new Date(item.created_at).toLocaleDateString()}</>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" onClick={()=>remove(item.id)} disabled={localStorage.userName===item.name}>Remove</Button>
                            <Button size="small" onClick={()=>openEditModal(item.id)}>Edit</Button>
                            <Button size="small" onClick={()=>navigate('/home/site/'+item.id)}>Open</Button>
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

export default AllPages