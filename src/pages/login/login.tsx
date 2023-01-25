import { Button, Checkbox, Divider, FormControlLabel, OutlinedInput, TextField, Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, SpaceBetween } from "../../models/boxes"
import logo from '../../assets/icon-light.svg'
import { AuthLinks } from "../../models/buttons"
import { useEffect, useState } from "react"
import { loginApi } from "../../api/authApi"
import ForgotPassword from "../../components/forgotPassword/forgotPassword"
import ResetPassword from "../../components/resetPassword/resetPassword"
import CustomizedSnackbars from "../../components/messageHandling/messagehandling"

const Login = () =>{
    const [state, setState] = useState({email:"xcode_admin@gmail.com",password:"Xcode123!"})
    const [open, setOpen] = useState(false)
    const [openSnacBar, setOpenSnacBar] = useState(false)
    const [resetOpen, setResetOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width:820px)')
    const {search} = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        if(search.includes('token') && search.includes('email')){
            setResetOpen(true)
        }
    },[])

    const login = async() => {
        const data = await loginApi(state)
        if(data.error_code === 0){
            setOpenSnacBar(true)
        }else{
            navigate('/home')
        }
    }

    return(
        <Flex width={'100vw'} height={'100vh'} position={'relative'}>
            <CustomizedSnackbars open={openSnacBar} setOpen={setOpenSnacBar}/>
            <ForgotPassword open={open} setOpen={setOpen} next={setResetOpen}/>
            <ResetPassword open={resetOpen} setOpen={setResetOpen}/>
            <FlexCenter width={'100%'} position={'absolute'} top={100}>
                <FlexColumn width={'70%'}>
                    <SpaceBetween mb={2}>
                        <FlexAlignCenter>
                            <img src={logo} width='30' height='30'/>
                            <Typography variant="h5" color={'white'}>HexaBit</Typography>
                        </FlexAlignCenter>
                        <FlexAlignCenter gap={2}>
                            <AuthLinks to={'/'}>Documentation</AuthLinks>
                            <AuthLinks to={'/register'}>Sign Up</AuthLinks>
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
                            <Typography color={'black'}>Login to your account</Typography>
                            <FlexColumn gap={2}>
                                <OutlinedInput value={state.email} onChange={e=>setState({...state,email:e.target.value})} sx={{border:'1px solid #ced4da', borderRadius:'5px',height:'35px',color:'gray',width:"308px"}} placeholder="Email"/>
                                <OutlinedInput value={state.password} onChange={e=>setState({...state,password:e.target.value})} sx={{border:'1px solid #ced4da', borderRadius:'5px',height:'35px',color:'gray',width:"308px"}} placeholder="Password"/>
                                <FormControlLabel
                                sx={{color:'black'}}
                                label="Remember me"
                                control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} />
                            </FlexColumn>
                            <Button fullWidth variant="contained" onClick={login}>Log in</Button>
                            <FlexColumn alignItems={'center'}>
                                <Button onClick={()=>setOpen(true)}>Forgot password?</Button>
                                <Flex>
                                    <Typography color={'black'}>Don't have an account? </Typography>
                                    <Link to={'/'}>Register</Link>
                                </Flex>
                            </FlexColumn>
                        </FlexColumn>
                    </SpaceBetween>
                </FlexColumn>
            </FlexCenter>
            <Box width={'70%'} height={'100%'} sx={{background:'#feb800'}}/>
            <Box width={'30%'} height={'100%'} sx={{background:'#380e47'}}/>
            
        </Flex>
    )
}

export default Login