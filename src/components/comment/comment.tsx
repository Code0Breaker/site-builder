import Avatar from "@mui/material/Avatar"
import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material"
import { FlexCenter, SpaceBetween } from "../../models/boxes"

export const Comment = () =>{
    return(
        <FlexCenter gap={1}>
            <Box width={50}>
                <Avatar/>
            </Box>
            <Box>
                <SpaceBetween>
                    <Typography>@Isabella</Typography>
                    <Typography>1 hour ago</Typography>
                </SpaceBetween>
                <Typography variant="caption">Contrary to popular belief, Lorem Ipsum is not simply random text</Typography>
            </Box>
        </FlexCenter>
    )
}