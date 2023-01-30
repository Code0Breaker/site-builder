import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import IconButton from "@mui/material/IconButton/IconButton"
import { useEffect, useState } from "react"
import { Flex, FlexColumn, PaperBox } from "../../models/boxes"
import AddIcon from '@mui/icons-material/Add';
import { IPosts } from "./types"
import { getPosts, removePost } from "../../api/blogApi"
import { useNavigate } from "react-router-dom"

const Posts = () =>{
    const [posts, setPosts] = useState<IPosts[]|null>(null)
    const [openPosts, setOpenPosts] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedUser, setSelectedUser] = useState<number|null>(null)
    const navigate = useNavigate()
    useEffect(()=>{
        (async()=>{
            const data = await getPosts()
            setPosts(data.data.data)
        })()
    },[])

    const remove = async(id:number) =>{
        const data = await removePost(id)
        if(data.success === true){
            window.location.reload()
        }
    }
    return(
        <FlexColumn>
            <Box mb={3}>
                <IconButton onClick={()=>navigate('/home/new-post')}>
                    <AddIcon/>
                </IconButton>
            </Box>
            <PaperBox>
                <Flex flexWrap={'wrap'} gap={3}>
                {
                    posts?.map(item=>{
                        return(
                            <Card sx={{ minWidth: 245 }}>
                              <CardMedia
                                image={item?.image?.url}
                                sx={{ height: 140 }}
                                title={item.translates[0].title}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                   {item.translates[0].title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                   {item.translates[0].description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {/* <>Verified at {new Date(item.email_verified_at).toLocaleDateString()}</> */}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button size="small" onClick={()=>remove(item.id)}>Remove</Button>
                                <Button size="small" onClick={()=>navigate('/home/post/edit/'+item.id)}>Edit</Button>
                                <Button size="small" onClick={()=>navigate(`/home/post/${item.id}`)}>Read</Button>
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

export default Posts