import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import GaugeChart from 'react-gauge-chart'
import { Flex, FlexColumn, FullCenteredIn, PaperBox } from '../../models/boxes'

const Gauges = () =>{
    const isMobile = useMediaQuery('(max-width:820px)')
    return(
    <FlexColumn>
        <Flex width={'100%'} gap={3} flexWrap={isMobile?'wrap':'nowrap'}>
            <Box width={isMobile?'100%':'50%'}>
                <PaperBox height={300}>
                    <FullCenteredIn>
                        <GaugeChart
							nrOfLevels={20}
							percent={0.86}
                            needleColor="#345243"
                            fontSize="12px"
                            style={{height:80}}     
                        />
                    </FullCenteredIn>
                </PaperBox>
            </Box>
            <Box width={isMobile?'100%':'50%'}>
                <PaperBox height={300}>
                    <FullCenteredIn>
                        <GaugeChart
                            id="gauge-chart2"
                            style={{height:80}}     
                            nrOfLevels={30}
                            colors={['#FF5F6D', '#FFC371']}
                            arcWidth={0.3}
                            percent={0.37}/>
                    </FullCenteredIn>
                </PaperBox>
            </Box>
        </Flex>
        <Flex width={'100%'} gap={3} flexWrap={isMobile?'wrap':'nowrap'}>
            <Box width={isMobile?'100%':'50%'}>
                <PaperBox height={300}>
                    <FullCenteredIn>
                        <GaugeChart
                            style={{height:80}}     
                            nrOfLevels={10}
							arcPadding={0.1}
							cornerRadius={3}
							percent={0.6} />
                    </FullCenteredIn>
                </PaperBox>
            </Box>
            <Box width={isMobile?'100%':'50%'}>
                <PaperBox height={300}>
                    <FullCenteredIn>
                        <GaugeChart
                            style={{height:80}}     
                            nrOfLevels={420}
                            arcsLength={[0.3, 0.5, 0.2]}
                            colors={['#5BE12C', '#F5CD19', '#EA4228']}
                            percent={0.37}
                            arcPadding={0.02} />
                    </FullCenteredIn>
                </PaperBox>
            </Box>
        </Flex>
    </FlexColumn>
)
}

export default Gauges