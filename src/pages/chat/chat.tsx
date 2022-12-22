import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { FlexColumn, PaperBox } from "../../models/boxes"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { TextField } from "@mui/material"

const Chat = () =>{
    return(
        <>
            <PaperBox>
                <FlexColumn width={'80%'} borderRight={'1px solid rgba(0, 0, 0, 0.12)'}>
                    <Box p={'15px 20px'} display={'flex'} width={'100%'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={1}> 
                            <Box>
                                <Avatar/>
                            </Box>
                            <Box>
                                <Typography>Noah Harper</Typography>
                                <Typography variant="caption">Last seen: 2 hours ago</Typography>
                            </Box>
                        </Box>
                        <Box display={'flex'} gap={2}>
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
                            
                        </Box>
                    </Box>
                <Divider/>
                <FlexColumn padding={2} gap={2}>
                    <FlexColumn display={'flex'} width={'100%'} alignItems={'flex-end'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>
                    <FlexColumn display={'flex'} width={'100%'} alignItems={'flex-start'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>

                    <FlexColumn display={'flex'} width={'100%'} alignItems={'flex-start'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>

                    <FlexColumn display={'flex'} width={'100%'} alignItems={'flex-start'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>
                    <FlexColumn display={'flex'} width={'100%'} alignItems={'flex-end'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>
                    <FlexColumn display={'flex'} width={'100%'} alignItems={'flex-end'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>
                    <textarea placeholder="Enter text here" rows={4}/>
                </FlexColumn>
                </FlexColumn>
                <Box width={'15%'} p={'20px'}>
                    <TextField placeholder="Search..." variant="outlined" fullWidth/>
                    <FlexColumn gap={3} mt={3}>
                        {
                            Array.from(Array(10)).map((item,i)=>{
                                return(
                                    <Box display={'flex'} gap={1} key={i}>
                                        <Avatar/>
                                        <FlexColumn>
                                            <Typography>Ava Alexander</Typography>
                                            <Typography variant="caption">online</Typography>
                                        </FlexColumn>
                                    </Box>
                                )
                            })
                        }
                    </FlexColumn>
                </Box>
            </PaperBox>
        </>
    )
}

export default Chat