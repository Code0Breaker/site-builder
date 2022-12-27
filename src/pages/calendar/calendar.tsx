import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from "react";
import { Flex, FlexColumn, PaperBox, SpaceBetween } from "../../models/boxes";
import { Box } from "@mui/system";
import avatarImg from '../../assets/user.png'
import { Avatar, AvatarGroup, Divider, LinearProgress, Typography } from "@mui/material";
import { tData } from "../../mockedData";
const Calendar = () =>{
    const [state, setState] = useState({
        weekendsVisible: true,
        currentEvents: []
    })
    return(
        <Flex gap={3}>
            <Box width={'70%'}>
                <PaperBox>
                    <FullCalendar
                    plugins={[dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                        weekends={state.weekendsVisible}
                      />
                </PaperBox>
            </Box>
            <Box width={'30%'}>
                <PaperBox>
                    <FlexColumn gap={2} width={'100%'} alignItems={'center'}>
                        <img 
                        width={'200'} 
                        height={'200'} 
                        src={avatarImg} 
                        style={{objectFit:'cover', borderRadius:100}}/>
                        <FlexColumn alignItems={'center'}>
                            <Typography variant="h5">Christy Wert</Typography>
                            <Typography>Christy Wert</Typography>
                        </FlexColumn>
                        <Box width={'100%'}>
                            <LinearProgress variant="determinate" value={80}/>
                        </Box>
                        <SpaceBetween>
                            <FlexColumn alignItems={'center'}>
                                <Typography>17</Typography>
                                <Typography>Completed</Typography>
                            </FlexColumn>
                            <FlexColumn alignItems={'center'}>
                                <Typography>17</Typography>
                                <Typography>Completed</Typography>
                            </FlexColumn>
                            <FlexColumn alignItems={'center'}>
                                <Typography>17</Typography>
                                <Typography>Completed</Typography>
                            </FlexColumn>
                        </SpaceBetween>
                        <Box width={'100%'}>
                            <Divider/>
                        </Box>
                        <Flex flexWrap={'wrap'} gap={1}>
                            {tData.map(item=><Typography color={item.color} border={`1px solid ${item.color}`} p={'4px 8px'} borderRadius={1}>{item.title}</Typography>)}
                        </Flex>
                        <Box width={'100%'}>
                            <Divider/>
                        </Box>
                        <FlexColumn width={'100%'} alignItems={'flex-start'} gap={1}>
                            <Typography variant="h5">Team</Typography>
                            <AvatarGroup>
                              <Avatar sizes={"15px"} alt="Remy Sharp"/>
                              <Avatar sizes={"15px"} alt="Travis Howard"/>
                              <Avatar sizes={"15px"} alt="Agnes Walker"/>
                              <Avatar sizes={"15px"} alt="Trevor Henderson"/>
                            </AvatarGroup>
                        </FlexColumn>
                    </FlexColumn>
                </PaperBox>
            </Box>
        </Flex>
    )
}

export default Calendar

