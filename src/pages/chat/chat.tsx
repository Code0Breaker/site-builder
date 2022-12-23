import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { Flex, FlexAlignCenter, FlexColumn, PaperBox, SpaceBetween } from "../../models/boxes"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { TextField } from "@mui/material"
import { TextArea } from "../../models/textfields"

const Chat = () =>{
    return(
        <>
            <PaperBox>
                <FlexColumn width={'80%'} borderRight={'1px solid rgba(0, 0, 0, 0.12)'}>
                    <SpaceBetween p={'15px 20px'}>
                        <Flex gap={1}> 
                            <Box>
                                <Avatar/>
                            </Box>
                            <Box>
                                <Typography>Noah Harper</Typography>
                                <Typography variant="caption">Last seen: 2 hours ago</Typography>
                            </Box>
                        </Flex>
                        <Flex gap={2}>
                            <FlexAlignCenter sx={{background:'#ffc107'}} p={'6px 12px'} borderRadius={1}>
                                <CameraAltIcon sx={{color:'white'}}/>
                            </FlexAlignCenter>
                            <FlexAlignCenter sx={{background:'#007bff'}} p={'6px 12px'} borderRadius={1}>
                                <VideoChatIcon sx={{color:'white'}}/>
                            </FlexAlignCenter>
                            <FlexAlignCenter sx={{background:'#6c757d'}} p={'6px 12px'} borderRadius={1}>
                                <SettingsIcon sx={{color:'white'}}/>
                            </FlexAlignCenter>
                            <FlexAlignCenter sx={{background:'#6c757d'}} p={'6px 12px'} borderRadius={1}>
                                <HelpCenterIcon sx={{color:'white'}}/>
                            </FlexAlignCenter>
                            
                        </Flex>
                    </SpaceBetween>
                <Divider/>
                <FlexColumn padding={2} gap={2}>
                    <FlexColumn width={'100%'} alignItems={'flex-end'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>
                    <FlexColumn width={'100%'} alignItems={'flex-start'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>

                    <FlexColumn width={'100%'} alignItems={'flex-start'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>

                    <FlexColumn width={'100%'} alignItems={'flex-start'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>
                    <FlexColumn width={'100%'} alignItems={'flex-end'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>
                    <FlexColumn width={'100%'} alignItems={'flex-end'} gap={2}>
                        <Avatar/>
                        <Box borderRadius={1} p={'18px 20px'} sx={{background:'#eee'}}>
                            <Typography>Hi Aiden, how are you? How is the project coming along?</Typography>
                        </Box>
                    </FlexColumn>
                    <TextArea placeholder="Enter text here" rows={4}/>
                </FlexColumn>
                </FlexColumn>
                <Box width={'15%'} p={'20px'}>
                    <TextField placeholder="Search..." variant="outlined" fullWidth/>
                    <FlexColumn gap={3} mt={3}>
                        {
                            Array.from(Array(10)).map((item,i)=>{
                                return(
                                    <Flex gap={1} key={i}>
                                        <Avatar/>
                                        <FlexColumn>
                                            <Typography>Ava Alexander</Typography>
                                            <Typography variant="caption">online</Typography>
                                        </FlexColumn>
                                    </Flex>
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