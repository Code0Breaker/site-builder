import { FlexColumn, PaperBox, SpaceBetween } from "../../models/boxes"
import WorldMap from 'react-world-map'
import { useMediaQuery } from "@mui/material"
const Maps = () =>{
    const isTablet = useMediaQuery('(max-width:1560px)')
    return(
        <FlexColumn>
            <PaperBox justifyContent={'center'}>
                <WorldMap />
            </PaperBox>
            <SpaceBetween gap={5} flexWrap={'wrap'}>
                <PaperBox justifyContent={'center'} width={'100%'}>
                    <WorldMap selected={'na'}/>
                </PaperBox>

                <PaperBox justifyContent={'center'} width={'100%'}>
                    <WorldMap />
                </PaperBox>
            </SpaceBetween>
        </FlexColumn>
    )
}

export default Maps