import { Box } from "@mui/material"
import { AreaChart } from "../../components/charts/chartjsAreaChart"
import { BarChart } from "../../components/charts/chartjsBarChart"
import { DoughnutChart } from "../../components/charts/chartjsDonatChart"
import { LineChart } from "../../components/charts/chartjsLineChart"
import { PieChart } from "../../components/charts/chartjsPieChart"
import { PolarAreaChart } from "../../components/charts/chartjsPolarChart"
import { RadarChart } from "../../components/charts/chartjsRadarChart"
import { Flex, FlexColumn, PaperBox } from "../../models/boxes"

const Chartjs = () =>{
    return(
        <FlexColumn>
        <Flex width={'100%'} gap={3}>
            <Box width={'50%'}>
                <PaperBox height={500}>
                    <LineChart/>
                </PaperBox>
            </Box>
            <Box width={'50%'}>
                <PaperBox height={500}>
                    <BarChart/>
                </PaperBox>
            </Box>
        </Flex>
        <Flex width={'100%'} gap={3}>
            <Box width={'50%'}>
                <PaperBox height={500}>
                    <AreaChart/>
                </PaperBox>
            </Box>
            <Box width={'50%'}>
                <PaperBox height={500}>
                    <LineChart/>
                </PaperBox>
            </Box>
        </Flex>

        <Flex width={'100%'} gap={3}>
            <Box width={'50%'}>
                <PaperBox height={500} justifyContent={'center'}>
                    <PieChart/>
                </PaperBox>
            </Box>
            <Box width={'50%'}>
                <PaperBox height={500} justifyContent={'center'}>
                    <DoughnutChart/>
                </PaperBox>
            </Box>
        </Flex>

        <Flex width={'100%'} gap={3}>
            <Box width={'50%'}>
                <PaperBox height={500} justifyContent={'center'}>
                    <RadarChart/>
                </PaperBox>
            </Box>
            <Box width={'50%'}>
                <PaperBox height={500} justifyContent={'center'}>
                    <PolarAreaChart/>
                </PaperBox>
            </Box>
        </Flex>
    </FlexColumn>
    )
}

export default Chartjs