import { Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Flex, FlexAlignCenter, FlexColumn, PaperBox } from "../../models/boxes"

const TypographySection = () =>{
    return(
        <FlexColumn>
            <PaperBox>
                <FlexColumn>
                    <Typography fontWeight={500} mb={4}>Header</Typography>
                    <Typography variant="h1" sx={{wordBreak: 'break-word'}}>Dashboard Heading 1</Typography>
                    <Typography variant="h2" sx={{wordBreak: 'break-word'}}>Dashboard Heading 2</Typography>
                    <Typography variant="h3" sx={{wordBreak: 'break-word'}}>Dashboard Heading 3</Typography>
                    <Typography variant="h4" sx={{wordBreak: 'break-word'}}>Dashboard Heading 4</Typography>
                    <Typography variant="h5" sx={{wordBreak: 'break-word'}}>Dashboard Heading 5</Typography>
                    <Typography variant="h6" sx={{wordBreak: 'break-word'}}>Dashboard Heading 6</Typography>
                </FlexColumn>
            </PaperBox>

            <PaperBox>
                <FlexColumn width={'100%'}>
                    <Typography fontWeight={500} mb={4}>Paragraph</Typography>
                    <Typography>
                        Appropriately benchmark web-enabled bandwidth 
                        and functionalized leadership skills. Conveniently 
                        syndicate global opportunities without interactive 
                        methods of empowerment. Collaboratively conceptualize 
                        user-centric e-tailers for visionary methodologies. 
                        Dramatically myocardinate. Phosfluorescently disintermediate 
                        unique resources whereas reliable mindshare. Competently 
                        optimize client-focused infrastructures vis-a-vis e-business 
                        human capital. Uniquely formulate sustainable benefits whereas 
                        functional results. Energistically myocardinate bleeding-edge e-business.
                    </Typography>
                    <Divider sx={{mt:2,mb:2}}/>
                    {
                        Array.from(Array(4)).map((item,i)=>{
                            return(
                                <FlexColumn key={i}>
                                    <Typography fontWeight={500} mb={1} mt={1}>Blockquote Primary</Typography>
                                    <FlexColumn key={i} width={'100%'} sx={{border:'1px solid #00bcd2'}} p={'20px'} mb={5}>
                                        <Typography mb={4}>"I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at."</Typography>
                                        <Typography color={'#00bcd2'}>- WRAPTHEME</Typography>
                                    </FlexColumn>
                                </FlexColumn>
                            )
                        })
                    }
                    <Divider sx={{mt:2,mb:2}}/>
                    <Flex gap={4}>
                        <FlexColumn>
                            <Typography textAlign={'left'} fontWeight={600}>Align Left</Typography>
                            <Typography textAlign={'left'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                        </FlexColumn>
                        <FlexColumn>
                            <Typography textAlign={'center'} fontWeight={600}>Align Center</Typography>
                            <Typography textAlign={'center'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                        </FlexColumn>
                        <FlexColumn>
                            <Typography textAlign={'right'} fontWeight={600}>Align Right</Typography>
                            <Typography textAlign={'right'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                        </FlexColumn>
                        <FlexColumn>
                            <Typography align={"justify"} fontWeight={600}>Align justify</Typography>
                            <Typography align={"justify"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                        </FlexColumn>
                    </Flex>
                </FlexColumn>
            </PaperBox>
            <PaperBox>
                <FlexColumn>
                    <Typography fontWeight={500} mb={4}>Text Style</Typography>
                    <FlexColumn gap={1}>
                        <FlexAlignCenter>
                            <Typography variant="caption" color={'#e83e8c'} width={100}>.text-muted</Typography> <Typography>Convey meaning through color with a handful of emphasis utility classes.</Typography> 
                        </FlexAlignCenter>
                        <FlexAlignCenter>
                            <Typography variant="caption" color={'#e83e8c'} width={100}>.text-primary</Typography> <Typography color={"#5c8ed4"}>Convey meaning through color with a handful of emphasis utility classes.</Typography>  
                        </FlexAlignCenter>
                        <FlexAlignCenter>
                            <Typography variant="caption" color={'#e83e8c'} width={100}>.text-success</Typography> <Typography color={"green"}>Convey meaning through color with a handful of emphasis utility classes.</Typography> 
                        </FlexAlignCenter>
                        <FlexAlignCenter>
                            <Typography variant="caption" color={'#e83e8c'} width={100}>.text-info</Typography> <Typography color={"#17a2b8"}>Convey meaning through color with a handful of emphasis utility classes.</Typography>
                        </FlexAlignCenter>
                        <FlexAlignCenter>
                            <Typography variant="caption" color={'#e83e8c'} width={100}>.text-warning</Typography> <Typography color={"#f3ad06"}>Convey meaning through color with a handful of emphasis utility classes.</Typography> 
                        </FlexAlignCenter>
                        <FlexAlignCenter>
                            <Typography variant="caption" color={'#e83e8c'} width={100}>.text-danger</Typography> <Typography color={"#de4848"}>Convey meaning through color with a handful of emphasis utility classes.</Typography>
                        </FlexAlignCenter>
                    </FlexColumn>
                </FlexColumn>
            </PaperBox>
        </FlexColumn>
    )
}

export default TypographySection