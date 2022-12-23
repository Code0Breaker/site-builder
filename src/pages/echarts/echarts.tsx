import Box from "@mui/material/Box"
import { DinamicChart } from "../../components/charts/dinamicChart"
import { basicCandleoption, dinamicDataoption, donatoption, echartpage1option, largeoption, rainfalloption, scatteroption } from "../../components/charts/mockedData"
import { Flex, FlexColumn, PaperBox } from "../../models/boxes"

const Echarts = () =>{
    return(
        <FlexColumn>
            <Flex width={'100%'} gap={3}>
                <Box width={'50%'}>
                    <PaperBox height={500}>
                        <DinamicChart option={echartpage1option}/>
                    </PaperBox>
                </Box>
                <Box width={'50%'}>
                    <PaperBox height={500}>
                        <DinamicChart option={rainfalloption}/>
                    </PaperBox>
                </Box>
            </Flex>
            <Flex width={'100%'} gap={3}>
                <Box width={'50%'}>
                    <PaperBox height={500}>
                        <DinamicChart option={dinamicDataoption}/>
                    </PaperBox>
                </Box>
                <Box width={'50%'}>
                    <PaperBox height={500}>
                        <DinamicChart option={basicCandleoption}/>
                    </PaperBox>
                </Box>
            </Flex>

            <Flex width={'100%'} gap={3}>
                <Box width={'50%'}>
                    <PaperBox height={500}>
                        <DinamicChart option={scatteroption}/>
                    </PaperBox>
                </Box>
                <Box width={'50%'}>
                    <PaperBox height={500}>
                        <DinamicChart option={donatoption}/>
                    </PaperBox>
                </Box>
            </Flex>
            
            <Flex width={'100%'}>
                <Box width={'100%'}>
                    <PaperBox height={500}>
                        <DinamicChart option={largeoption}/>
                    </PaperBox>
                </Box>
            </Flex>
        </FlexColumn>
    )
}

export default Echarts