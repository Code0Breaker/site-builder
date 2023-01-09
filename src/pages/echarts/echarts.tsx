import { Grid, useMediaQuery } from "@mui/material"
import Box from "@mui/material/Box"
import { DinamicChart } from "../../components/charts/dinamicChart"
import { basicCandleoption, dinamicDataoption, donatoption, echartpage1option, largeoption, rainfalloption, scatteroption } from "../../components/charts/mockedData"
import { Flex, FlexColumn, PaperBox } from "../../models/boxes"

const Echarts = () =>{
    const isMobile = useMediaQuery('(max-width:860px)')

    return(
        <Grid container gap={3}>
           
                <Grid xs={isMobile?12:5.7}>
                    <PaperBox height={500}>
                        <DinamicChart option={echartpage1option}/>
                    </PaperBox>
                </Grid>
                <Grid xs={isMobile?12:5.7}>
                    <PaperBox height={500}>
                        <DinamicChart option={rainfalloption}/>
                    </PaperBox>
                </Grid>
             
                <Grid xs={isMobile?12:5.7}>
                    <PaperBox height={500}>
                        <DinamicChart option={dinamicDataoption}/>
                    </PaperBox>
                </Grid>
                <Grid xs={isMobile?12:5.7}>
                    <PaperBox height={500}>
                        <DinamicChart option={basicCandleoption}/>
                    </PaperBox>
                </Grid>
           
                <Grid xs={isMobile?12:5.7}>
                    <PaperBox height={500}>
                        <DinamicChart option={scatteroption}/>
                    </PaperBox>
                </Grid>
                <Grid xs={isMobile?12:5.7}>
                    <PaperBox height={500}>
                        <DinamicChart option={donatoption}/>
                    </PaperBox>
                </Grid>
        
                <Box width={'100%'}>
                    <PaperBox height={500}>
                        <DinamicChart option={largeoption}/>
                    </PaperBox>
                </Box>
           
        </Grid>
    )
}

export default Echarts