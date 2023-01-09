import { Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { Flex, FlexColumn, PaperBox, SpaceBetween } from "../../models/boxes"

const HelperClasses = () => {
    const isMobile = useMediaQuery('(max-width:860px)')
    return(
        <FlexColumn gap={3}>
            <PaperBox flexDirection={'column'}>
                <Box mb={5}>
                    <Typography>Text Align</Typography>
                    <Typography variant="caption">You can use classes which names are .align-left, .align-center, .align-right, .align-justify</Typography>
                </Box>
                <Flex gap={4} flexWrap={isMobile?'wrap':'nowrap'}>
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
            </PaperBox>

            <PaperBox flexDirection={'column'}>
                <Box mb={5}>
                    <Typography fontWeight={'bold'}>Margin Padding Spaces</Typography>
                    <Typography variant="caption">You can use classes which names are .m-t-10, .m-t--10, .m-r-5, .p-t-10, .p-b-5</Typography>
                </Box>

                <Box >
                    <SpaceBetween gap={4}>

                    </SpaceBetween>
                </Box>
            </PaperBox>
        </FlexColumn>
    )
}

export default HelperClasses