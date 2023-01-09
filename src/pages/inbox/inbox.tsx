import { Avatar, Box, Button, Checkbox, Divider, IconButton, TextField, Typography, useMediaQuery } from "@mui/material"
import { inboxData, labelsData } from "../../mockedData"
import { Flex, FlexAlignCenter, FlexColumn, PaperBox, SpaceBetween } from "../../models/boxes"
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Inbox = () =>{
    const isMobile = useMediaQuery('(max-width:1024px)')
    return(
        <>
        <PaperBox>
        {!isMobile&&<Box width={'15%'} p={'20px'}>
                <Button fullWidth variant="contained" color="error" sx={{height:'35px'}}>Compose</Button>
                <FlexColumn gap={3} mt={3} alignItems={'flex-start'}>
                    {
                        inboxData.map((item,i)=>{
                            return(
                                <Box key={i} display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                                    <Button color="inherit" startIcon={item.icon}>{item.title}</Button>
                                    <Box sx={{p:0.5, borderRadius:2, border:'1px solid green'}}>122</Box>
                                </Box>
                            )
                        })
                    }

                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                        <Typography>Labels</Typography>
                        <IconButton>
                            <AddCircleIcon/>
                        </IconButton>
                    </Box>
                    {
                        labelsData.map(item=>{
                            return(
                                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                                    <Box display={'flex'} alignItems={'center'} gap={2}>
                                        <Box sx={{background:item.color}} borderRadius={100} width="15px" height="15px"/>
                                        <Typography>{item.title}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </FlexColumn>
            </Box>}
            <FlexColumn width={'80%'} borderLeft={'1px solid rgba(0, 0, 0, 0.12)'}>
                <SpaceBetween p={'15px 20px'} flexWrap={'wrap'}>
                    <FlexAlignCenter> 
                        <Box>
                            <Checkbox/>
                        </Box>
                        <Flex>
                            <Button variant="outlined" sx={{height:'31px',padding:1,borderRadius:0, borderColor:'#eee', color:'#777'}} color="inherit">Refresh</Button>
                            <Button variant="outlined" sx={{height:'31px',padding:1,borderRadius:0, borderColor:'#eee', color:'#777'}} color="inherit">Archive</Button>
                            <Button variant="outlined" sx={{height:'31px',padding:1,borderRadius:0, borderColor:'#eee', color:'#777'}} color="inherit">Trash</Button>
                        </Flex>
                    </FlexAlignCenter>
                    <FlexAlignCenter>
                        <Box marginRight={2}>
                            <Typography>1-50/295</Typography>
                        </Box>
                        <Button variant="outlined" sx={{height:'31px',width:'27px',borderRadius:0, borderColor:'#eee', color:'#777'}} color="inherit">{"<"}</Button>
                        <Button variant="outlined" sx={{height:'31px',width:'27px',borderRadius:0, borderColor:'#eee', color:'#777'}} color="inherit">{">"}</Button>
                    </FlexAlignCenter>
                    {/* <Box display={'flex'} gap={2}>
                        <Box sx={{background:'#ffc107'}} p={'6px 12px'} display={'flex'} alignItems={'center'} borderRadius={1}>
                            <CameraAltIcon sx={{color:'white'}}/>
                        </Box>
                        <Box sx={{background:'#007bff'}} p={'6px 12px'} display={'flex'} alignItems={'center'} borderRadius={1}>
                            <VideoChatIcon sx={{color:'white'}}/>
                        </Box>
                        <Box sx={{background:'#6c757d'}} p={'6px 12px'} display={'flex'} alignItems={'center'} borderRadius={1}>
                            <SettingsIcon sx={{color:'white'}}/>
                        </Box>
                        <Box sx={{background:'#6c757d'}} p={'6px 12px'} display={'flex'} alignItems={'center'} borderRadius={1}>
                            <HelpCenterIcon sx={{color:'white'}}/>
                        </Box>
                        
                    </Box> */}
                </SpaceBetween>
            <Divider/>
                {
                    Array.from(Array(10)).map((item,i)=>{
                        return(
                            <FlexColumn key={i} padding={2} gap={2} width={'100%'} borderBottom={'1px solid rgba(0, 0, 0, 0.12)'}>
                                <Box display={'flex'} width={'100%'} gap={2}>
                                     <Checkbox/>
                                     <FlexColumn width={'100%'} gap={1}>
                                        <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
                                            <Typography>Wendy Abbott</Typography>
                                            <Typography>23 Jun</Typography>
                                        </Box>
                                        <Typography>[ThemeForest]Lorem Ipsum is simply dumm dummy text of the printing and typesetting industry.</Typography>
                                     </FlexColumn>
                                </Box>
                            </FlexColumn>
                        )
                    })
                }
            </FlexColumn>

        </PaperBox>
    </>
    )
}

export default Inbox