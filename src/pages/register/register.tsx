import { Button, Checkbox, Divider, FormControlLabel, OutlinedInput, TextField, Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, SpaceBetween } from "../../models/boxes"
import logo from '../../assets/icon-light.svg'
import { AuthLinks } from "../../models/buttons"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Register = () =>{
    const isMobile = useMediaQuery('(max-width:820px)')
    return(
        <Flex width={'100vw'} height={'100vh'} position={'relative'}>
            <FlexCenter width={'100%'} position={'absolute'} top={100}>
                <FlexColumn width={'70%'}>
                    <SpaceBetween mb={2}>
                        <FlexAlignCenter>
                            <img src={logo} width='30' height='30'/>
                            <Typography variant="h5" color={'white'}>HexaBit</Typography>
                        </FlexAlignCenter>
                        <FlexAlignCenter gap={2}>
                            <AuthLinks to={'/home'}>Documentation</AuthLinks>
                            <AuthLinks to={'/'}>Sign In</AuthLinks>
                        </FlexAlignCenter>
                    </SpaceBetween>
                    <Divider sx={{borderColor:'rgba(255,255,255,0.14)'}}/>
                    <SpaceBetween mt={'100px'}>
                        {!isMobile&&<Box>
                            <Typography fontWeight={300} variant={'h4'} color={'white'} maxWidth={260}>
                                Everything
                                you need for
                                your Dashboard
                            </Typography>
                            <Typography mt={2} fontWeight={300} color={'white'} maxWidth={360}>
                                It is a long established fact that
                                a reader will be distracted by
                                the readable content of a page
                                when looking at its layout.
                            </Typography>
                        </Box>}
                        <FlexColumn p={'20px'} sx={{background:'white'}} gap={5}>
                            <Typography color={'black'}>Register to your account</Typography>
                            <FlexColumn gap={2}>
                                <OutlinedInput sx={{border:'1px solid #ced4da', borderRadius:'5px',height:'35px',color:'white',width:"308px"}} placeholder="Email"/>
                                <OutlinedInput sx={{border:'1px solid #ced4da', borderRadius:'5px',height:'35px',color:'white',width:"308px"}} placeholder="Password"/>
                                <FormControlLabel
                                sx={{color:'black'}}
                                label="Remember me"
                                control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} />
                            </FlexColumn>
                            <Button fullWidth variant="contained">Register</Button>
                            <FlexColumn alignItems={'center'}>
                                <Box width={'100%'} mb={3}>
                                    <Divider> 
                                        <Typography variant="h5" color={'gray'}>OR</Typography>
                                    </Divider>
                                </Box>
                                <FlexColumn width={'100%'} gap={2}>
                                    <Button variant="outlined" startIcon={<FacebookIcon/>}>Sign in with Facebook</Button>
                                    <Button variant="outlined" startIcon={<TwitterIcon/>}>Sign in with Twitter</Button>
                                </FlexColumn>
                            </FlexColumn>
                        </FlexColumn>
                    </SpaceBetween>
                </FlexColumn>
            </FlexCenter>
            <Box width={'70%'} height={'100%'} sx={{background:'#feb800'}}>

            </Box>
            <Box width={'30%'} height={'100%'} sx={{background:'#380e47'}}>

            </Box>
        </Flex>
    )
}

export default Register