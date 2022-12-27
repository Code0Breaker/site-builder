import { Box } from "@mui/system"
import { Flex, PaperBox } from "../../models/boxes"
import laceholder from '../../assets/1.jpg'
import { Paper, Typography } from "@mui/material"
const ImageGallery = () =>{
    return(
        <PaperBox flexDirection={'column'} gap={5}>
            <Box>
                <Typography variant="h5">Light Gallery</Typography>
                <Typography variant="caption">All pictures taken from pexels.com</Typography>
            </Box>
            <Flex flexWrap={'wrap'} gap={2}>
                {
                    Array.from(Array(9)).map((item,i)=>{
                        return(
                            <Paper sx={{p:'4px'}} key={i}>
                                <Box width={490} height={310}>
                                    <img src={laceholder} width="100%" height="100%" style={{objectFit:'contain', borderRadius:8}}/>
                                </Box>
                            </Paper>
                        )
                    })
                }
            </Flex>
        </PaperBox>
    )
}

export default ImageGallery