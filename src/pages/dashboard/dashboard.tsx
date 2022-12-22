import { Box, Button, Checkbox, FormControlLabel, Grid, Input, LinearProgress, TextField, Typography } from "@mui/material"
import Divider from "@mui/material/Divider"
import { DinamicChart } from "../../components/charts/dinamicChart"
import { barOption, lineOption, pieOption } from "../../components/charts/mockedData"
import { Comment } from "../../components/comment/comment"
import CustomizedTable from "../../components/table/table"
import { socialData, widgetData } from "../../mockedData"
import { FlexColumn, PaperBox, ProgressWitgetBox } from "../../models/boxes"
import HomeIcon from '@mui/icons-material/Home';
import { TextArea } from "../../models/textfields"

const Dashboard = () =>(
    <>
    {/* <Box position={'absolute'} width={'100%'} padding={'10px 15px'} display={'flex'} justifyContent={'space-between'}>
        <Typography>Dashboard</Typography>
        <Box display={'flex'} alignItems={'center'} gap={2}>
            <HomeIcon/>
            <Typography>/ Dashboard</Typography>
            <Button variant={'contained'} color={'primary'}>Create New</Button>
        </Box>
    </Box> */}
    <FlexColumn>
        <PaperBox width={'100%'} justifyContent={'center'}>
            {widgetData.map((item, i) => {
                return (
                    <ProgressWitgetBox key={i}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box>
                                {item.icon}
                            </Box>
                            <Box>
                                <Typography>{item.title}</Typography>
                                <Typography>{item.count}</Typography>
                            </Box>
                        </Box>
                        <Box mt={1}>
                            <LinearProgress variant="determinate" value={item.percent} color={item.color} />
                            <Typography variant={'caption'}>{item.text}</Typography>
                        </Box>
                    </ProgressWitgetBox>
                )
            })}
        </PaperBox>
        <Box display={'flex'} width={'100%'} gap={5}>
            <Box width={'65%'}>
                <PaperBox>
                    <DinamicChart option={lineOption} />
                </PaperBox>
            </Box>
            <Box width={'35%'}>
                <PaperBox>
                    <DinamicChart option={barOption} />
                </PaperBox>
            </Box>
        </Box>
        <PaperBox>
            <CustomizedTable />
        </PaperBox>

        <Box display={'flex'} width="100%" gap={5}>
            <FlexColumn width={'30%'}>
                <PaperBox justifyContent={'space-between'}>
                    <Box maxWidth={300} width={'100%'}>
                        <DinamicChart option={pieOption} />
                    </Box>
                    <FlexColumn justifyContent={'flex-end'} pb={9} gap={0.5}>
                        <Typography fontWeight={'bold'}>$7,025.72</Typography>
                        <Box display="flex" justifyContent={'space-between'} width={150}>
                            <Typography variant="caption" sx={{ lineBreak: 'none' }}>Wallet Balance</Typography>
                            <Typography variant="caption">8920$</Typography>
                        </Box>
                        <Box display="flex" justifyContent={'space-between'} width={150}>
                            <Typography variant="caption">Travels</Typography>
                            <Typography variant="caption">920$</Typography>
                        </Box>
                        <Box display="flex" justifyContent={'space-between'} width={150}>
                            <Typography variant="caption">Foods & Drinks</Typography>
                            <Typography variant="caption">120$</Typography>
                        </Box>
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

            <FlexColumn width={'30%'}>
                <PaperBox p={2} flexDirection={'column'}>
                    <Typography>Twitter Feed</Typography>
                    <TextArea placeholder="Enter here for tweet..." rows={6} />
                    <Box mt={2} width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Button variant="contained" color="primary">Tweet</Button>
                        <Button color="primary">13k users active</Button>
                    </Box>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <FlexColumn gap={2}>
                        {Array.from(Array(5)).map((item, i) => {
                            return <Comment key={i} />
                        })}
                    </FlexColumn>
                </PaperBox>
            </FlexColumn>

            <FlexColumn width={'40%'}>
                <PaperBox p={3} flexDirection={'column'} gap={2}>
                    <Typography>Social Counter</Typography>
                    {socialData.map(item => {
                        return (
                            <Box display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography gap={1} display={'flex'} alignItems={'center'}>{item.icon} {item.title}</Typography>
                                <Typography sx={{ p: '4px 8px', borderRadius: 1, border: `1px solid ${item.color}`, color: item.color }}>16,785</Typography>
                            </Box>
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
        </Box>
    </FlexColumn>
    </>
)

export default Dashboard