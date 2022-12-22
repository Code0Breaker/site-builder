import Avatar from "@mui/material/Avatar"
import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material"

export const Comment = () =>{
    return(
        <Box gap={1} display={'flex'} width={'100%'} justifyContent={'center'}>
            <Box width={50}>
                <Avatar/>
            </Box>
            <Box>
                <Box display={'flex'} width={'100%'} justifyContent={'space-between'}>
                    <Typography>@Isabella</Typography>
                    <Typography>1 hour ago</Typography>
                </Box>
                <Typography variant="caption">Contrary to popular belief, Lorem Ipsum is not simply random text</Typography>
            </Box>
        </Box>
    )
}