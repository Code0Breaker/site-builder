import { Button, Divider, InputAdornment, OutlinedInput, Pagination, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { FlexColumn, PaperBox, Flex, FlexStart } from "../../models/boxes"

const SearchResults = () =>{
    return(
        <FlexColumn gap={3}>
            <PaperBox>
                <FlexColumn width={'100%'} gap={2}>
                    <OutlinedInput
                        placeholder="Search..."
                      sx={{height:'39px',pr:0}}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <Button variant="outlined" color="inherit">Search</Button>
                        </InputAdornment>
                      }
                    />
                    <FlexStart gap={1}>
                        <Button variant="outlined" color="inherit">Web</Button>
                        <Button variant="outlined" color="inherit">Images</Button>
                        <Button variant="outlined" color="inherit">Videos</Button>
                    </FlexStart>
                    <FlexColumn>
                      <Typography>Search Result For "Bootstrap 4 admin"</Typography>
                      <Typography>About 16,853 result ( 0.13 seconds)</Typography>
                    </FlexColumn>
                </FlexColumn>
            </PaperBox>

            {/* <FlexColumn> */}
                <PaperBox display={'flex'} flexDirection={'column'}>
                    {
                        Array.from(Array(7)).map((item,i)=>{
                            return(
                                    <FlexColumn key={i} alignItems={'flex-start'} gap={1} width={"100%"}>
                                        <Button color="primary">Bootstrap 4 Light & Dark Admin with Free Angular5 + UI Kit</Button>
                                        <Typography pl={1} variant="caption">https://themeforest.net/user/Wraptheme</Typography>
                                        <Typography pl={1}>sQuare Admin is Material Design premium admin dashboard theme. It’s builded on popular Twitter Bootstrap4 framework. sQuare is fully based on HTML5 + CSS3 Standards. Is fully responsive and clean on every device and every browser.</Typography>
                                        <Flex gap={2}>
                                            <Button color="primary">Vue Admin</Button>
                                            <Button color="primary">Angular5</Button>
                                            <Button color="primary">Bootstrap4</Button>
                                        </Flex>
                                        <Box width={"100%"} mt={2} mb={2}>
                                            <Divider/>
                                        </Box>
                                    </FlexColumn>
                            )
                        })
                    }
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </PaperBox>
            {/* </FlexColumn> */}

        </FlexColumn>
    )
}

export default SearchResults