import { Box, Button, Checkbox, FormControlLabel, Grid, Input, LinearProgress, TextField, Typography, useMediaQuery } from "@mui/material"
import Divider from "@mui/material/Divider"
import { DinamicChart } from "../../components/charts/dinamicChart"
import { barOption, lineOption, pieOption } from "../../components/charts/mockedData"
import { Comment } from "../../components/comment/comment"
import CustomizedTable from "../../components/table/table"
import { socialData, widgetData } from "../../mockedData"
import { Flex, FlexColumn, PaperBox, ProgressWitgetBox, SpaceBetween } from "../../models/boxes"
import HomeIcon from '@mui/icons-material/Home';
import { TextArea } from "../../models/textfields"

const Dashboard = () =>{
    const isMobile = useMediaQuery('(max-width:830px)')
    return(
    <>
    <FlexColumn>
        <PaperBox flexWrap={isMobile?'wrap':'nowrap'} width={'100%'} justifyContent={'center'}>
            {widgetData.map((item, i) => {
                return (
                    <ProgressWitgetBox key={i}>
                        <SpaceBetween>
                            <Box>
                                {item.icon}
                            </Box>
                            <Box>
                                <Typography>{item.title}</Typography>
                                <Typography>{item.count}</Typography>
                            </Box>
                        </SpaceBetween>
                        <Box mt={1}>
                            <LinearProgress variant="determinate" value={item.percent} color={item.color} />
                            <Typography variant={'caption'}>{item.text}</Typography>
                        </Box>
                    </ProgressWitgetBox>
                )
            })}
        </PaperBox>
        <Flex flexWrap={isMobile?'wrap':'nowrap'} width={'100%'} gap={5}>
            <Box width={isMobile?'100%':'65%'}>
                <PaperBox height={340} position={'relative'}>
                    <SpaceBetween  style={{width:'95%'}} zIndex={999} position={'absolute'}>
                        <Typography>Cryptocurrency Overview</Typography>
                        <Flex gap={1}>
                            <Button>Monthly</Button>
                            <Button>Yearly</Button>
                        </Flex>
                    </SpaceBetween>
                    <DinamicChart option={lineOption} />
                </PaperBox>
            </Box>
            <Box width={isMobile?'100%':'35%'}>
                <PaperBox height={340}>
                    <DinamicChart option={barOption} />
                </PaperBox>
            </Box>
        </Flex>
        <PaperBox>
            <CustomizedTable />
        </PaperBox>

        <Flex width="100%" gap={5} flexWrap={isMobile?'wrap':'nowrap'}>
            <FlexColumn width={isMobile?'100%':'30%'}>
                <PaperBox justifyContent={'space-between'}>
                    <Box width={100}>
                        <DinamicChart option={pieOption} />
                    </Box>
                    <FlexColumn justifyContent={'flex-end'} pb={5} gap={0.5}>
                        <Typography fontWeight={'bold'}>$7,025.72</Typography>
                        <SpaceBetween style={{width:150}}>
                            <Typography variant="caption" sx={{ lineBreak: 'none' }}>Wallet Balance</Typography>
                            <Typography variant="caption">8920$</Typography>
                        </SpaceBetween>
                        <SpaceBetween style={{width:150}}>
                            <Typography variant="caption">Travels</Typography>
                            <Typography variant="caption">920$</Typography>
                        </SpaceBetween>
                        <SpaceBetween style={{width:150}}>
                            <Typography variant="caption">Foods & Drinks</Typography>
                            <Typography variant="caption">120$</Typography>
                        </SpaceBetween>
                    </FlexColumn>
                </PaperBox>
                <PaperBox justifyContent={'space-between'}>
                    <FlexColumn gap={0.5} width={'100%'}>
                        <Typography>To Do List</Typography>
                        <Typography variant="caption">This month task list</Typography>
                        <FlexColumn width={'100%'} gap={2}>
                            {Array.from(Array(4)).map((item, i) => {
                                return (
                                    <Box width={'100%'}>
                                        <FormControlLabel
                                            key={i}
                                            label="Report Panel Usage"
                                            control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />} />
                                        <Divider />
                                    </Box>
                                )
                            })}

                        </FlexColumn>
                    </FlexColumn>

                </PaperBox>
            </FlexColumn>

            <FlexColumn width={isMobile?'100%':'30%'}>
                <PaperBox p={2} flexDirection={'column'}>
                    <Typography>Twitter Feed</Typography>
                    <TextArea placeholder="Enter here for tweet..." rows={6} />
                    <SpaceBetween mt={2} alignItems={'center'}>
                        <Button variant="contained" color="primary">Tweet</Button>
                        <Button color="primary">13k users active</Button>
                    </SpaceBetween>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <FlexColumn gap={2}>
                        {Array.from(Array(5)).map((item, i) => {
                            return <Comment key={i} />
                        })}
                    </FlexColumn>
                </PaperBox>
            </FlexColumn>

            <FlexColumn width={isMobile?'100%':'40%'}>
                <PaperBox p={3} flexDirection={'column'} gap={2}>
                    <Typography>Social Counter</Typography>
                    {socialData.map(item => {
                        return (
                            <SpaceBetween alignItems={'center'}>
                                <Typography gap={1} display={'flex'} alignItems={'center'}>{item.icon} {item.title}</Typography>
                                <Typography sx={{ p: '4px 8px', borderRadius: 1, border: `1px solid ${item.color}`, color: item.color }}>16,785</Typography>
                            </SpaceBetween>
                        )
                    })}
                    {socialData.map(item => {
                        return (
                            <Box display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography gap={1} display={'flex'} alignItems={'center'}>{item.icon} {item.title}</Typography>
                                <Typography sx={{ p: '4px 8px', borderRadius: 1, border: `1px solid ${item.color}`, color: item.color }}>16,785</Typography>
                            </Box>
                        )
                    })}

                </PaperBox>
                <PaperBox p={2} flexDirection={'column'} gap={2}>
                    <Typography>Email Newsletter</Typography>
                    <TextField placeholder="Enter Email" variant="filled" />
                </PaperBox>
            </FlexColumn>
        </Flex>
    </FlexColumn>
    </>
)
}

export default Dashboard