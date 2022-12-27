import { Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, SpaceBetween } from "../../models/boxes"
import logo from '../../assets/icon-light.svg'
import { AuthLinks } from "../../models/buttons"
const Login = () =>{
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
                            <AuthLinks to={'/'}>Documentation</AuthLinks>
                            <AuthLinks to={'/'}>Sign Up</AuthLinks>
                        </FlexAlignCenter>
                    </SpaceBetween>
                    <Divider sx={{borderColor:'rgba(255,255,255,0.14)'}}/>
                </FlexColumn>
            </FlexCenter>
            <Box width={'70%'} height={'100%'} sx={{background:'#feb800'}}>

            </Box>
            <Box width={'30%'} height={'100%'} sx={{background:'#380e47'}}>

            </Box>
        </Flex>
    )
}

export default Login