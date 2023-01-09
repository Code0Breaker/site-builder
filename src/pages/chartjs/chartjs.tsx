import { Box, Grid, useMediaQuery } from "@mui/material"
import { AreaChart } from "../../components/charts/chartjsAreaChart"
import { BarChart } from "../../components/charts/chartjsBarChart"
import { DoughnutChart } from "../../components/charts/chartjsDonatChart"
import { LineChart } from "../../components/charts/chartjsLineChart"
import { PieChart } from "../../components/charts/chartjsPieChart"
import { PolarAreaChart } from "../../components/charts/chartjsPolarChart"
import { RadarChart } from "../../components/charts/chartjsRadarChart"
import { Flex, FlexColumn, PaperBox } from "../../models/boxes"

const Chartjs = () =>{
    const isMobile = useMediaQuery('(max-width:860px)')
    return(
        <Grid container gap={3}>
       
            <Grid xs={isMobile?12:5.7}>
                <PaperBox>
                    <LineChart/>
                </PaperBox>
            </Grid>
            <Grid xs={isMobile?12:5.7}>
                <PaperBox>
                    <BarChart/>
                </PaperBox>
            </Grid>
  
            <Grid xs={isMobile?12:5.7}>
                <PaperBox>
                    <AreaChart/>
                </PaperBox>
            </Grid>
            <Grid xs={isMobile?12:5.7}>
                <PaperBox>
                    <LineChart/>
                </PaperBox>
            </Grid>
   
            <Grid xs={isMobile?12:5.7}>
                <PaperBox justifyContent={'center'}>
                    <PieChart/>
                </PaperBox>
            </Grid>
            <Grid xs={isMobile?12:5.7}>
                <PaperBox justifyContent={'center'}>
                    <DoughnutChart/>
                </PaperBox>
            </Grid>
 
            <Grid xs={isMobile?12:5.7}>
                <PaperBox justifyContent={'center'}>
                    <RadarChart/>
                </PaperBox>
            </Grid>
            <Grid xs={isMobile?12:5.7}>
                <PaperBox justifyContent={'center'}>
                    <PolarAreaChart/>
                </PaperBox>
            </Grid>
      
    </Grid>
    )
}

export default Chartjs