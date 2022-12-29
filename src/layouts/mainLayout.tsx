import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StyledMenuAccordion, StyledNavLink, StyledSubNavLink } from '../models/buttons';
import { Flex, FlexAlignCenter, FlexColumn, PaperBox, ProgressWitgetBox, SpaceBetween } from '../models/boxes';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Outlet } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import { SearchInput } from '../models/textfields';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import userImg from '../assets/user.png'
import logo from '../assets/icon-dark.svg'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ListIcon from '@mui/icons-material/List';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import MapIcon from '@mui/icons-material/Map';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useState } from 'react';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  background:'#f4f7f9',
  width:'98vw',
  minHeight:'100vh',
  flexGrow: 1,
  padding: '100px 30px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    width:`calc(100vw - ${drawerWidth+17}px)`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    background:'#feb800',
    boxShadow:'none',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <SpaceBetween>
            <Flex>
                <IconButton>
                    <WidgetsIcon sx={{color:'white'}}/>
                </IconButton>

                <IconButton>
                    <CalendarMonthIcon sx={{color:'white'}}/>
                </IconButton>

                <IconButton>
                    <QuestionAnswerIcon sx={{color:'white'}}/>
                </IconButton>
            </Flex>
            <Flex>
                <SearchInput placeholder='Search here...'/>
                <Flex>
                    <IconButton>
                        <EmailIcon sx={{color:'white'}}/>
                    </IconButton>

                    <IconButton>
                        <NotificationsIcon sx={{color:'white'}}/>
                    </IconButton>

                    <IconButton>
                        <SettingsIcon sx={{color:'white'}}/>
                    </IconButton>

                    <IconButton>
                        <PowerSettingsNewIcon sx={{color:'white'}}/>
                    </IconButton>
                </Flex>
            </Flex>
          </SpaceBetween>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
            <Box display={'flex'} gap={2} width={'100%'} alignItems={'center'}>
                <img src={logo} width="30px"/>
                <Typography color={'#feb800'} fontSize={'18px'}>HexaBit</Typography>
            </Box>

        </DrawerHeader>
        <Divider sx={{mb:5}}/>
        <FlexColumn alignItems={'center'}>
            <Box borderRadius={100}>
                <img src={userImg} width="140" height="140" style={{objectFit:'contain', borderRadius:100}}/>
            </Box>
            <Typography>Welcome,</Typography>
            <Button color={'secondary'} onClick={handleClick}>Christy Wert</Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
        </FlexColumn>
        <FlexColumn mt={2} gap={'5px'} width={'100%'} alignItems={'center'}>
            <StyledNavLink to={'/'}><HomeOutlinedIcon/>Dashboard</StyledNavLink>
            <StyledNavLink to={'/inbox'}><MailOutlinedIcon/>Inbox</StyledNavLink>
            <StyledNavLink to={'/chat'}><ForumIcon/>Chat</StyledNavLink>
            <StyledNavLink to={'/taskboard'}><ListIcon/>Taskboard</StyledNavLink>
            <StyledNavLink to={'/calendar'}><CalendarMonthIcon/>Calendar</StyledNavLink>
            <StyledNavLink to={'/contacts'}><ImportContactsIcon/>Contacts</StyledNavLink>
            <StyledMenuAccordion>
              <AccordionSummary
              sx={{padding:0}}
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <FlexAlignCenter gap={2}>
                  <DiamondIcon/>
                  UI Elements
                </FlexAlignCenter>
              </AccordionSummary>
              <AccordionDetails>
                <FlexColumn>
                  <StyledSubNavLink to={'/typography'}>-- Typography</StyledSubNavLink>
                  <StyledSubNavLink to={'/helper-classes'}>-- Helper classes</StyledSubNavLink>
                </FlexColumn>
              </AccordionDetails>
            </StyledMenuAccordion>

            <StyledMenuAccordion>
              <AccordionSummary
              sx={{padding:0}}
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <FlexAlignCenter gap={2}>
                  <LeaderboardIcon/>
                  Charts
                </FlexAlignCenter>
              </AccordionSummary>
              <AccordionDetails>
                <FlexColumn>
                  <StyledSubNavLink to={'/chartjs'}>-- Chartjs</StyledSubNavLink>
                  <StyledSubNavLink to={'/echarts'}>-- eCharts</StyledSubNavLink>
                  <StyledSubNavLink to={'/gauges'}>-- Gauges</StyledSubNavLink>
                </FlexColumn>
              </AccordionDetails>
            </StyledMenuAccordion>

            <StyledMenuAccordion>
              <AccordionSummary
              sx={{padding:0}}
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <FlexAlignCenter gap={2}>
                  <FileCopyIcon/>
                  Pages
                </FlexAlignCenter>
              </AccordionSummary>
              <AccordionDetails>
                <FlexColumn>
                  <StyledSubNavLink to={'/search-results'}>-- Search Results</StyledSubNavLink>
                  <StyledSubNavLink to={'/image-gallery'}>-- Image gallery</StyledSubNavLink>
                  <StyledSubNavLink to={'/faq'}>-- FAQ</StyledSubNavLink>
                </FlexColumn>
              </AccordionDetails>
            </StyledMenuAccordion>

            <StyledMenuAccordion>
              <AccordionSummary
              sx={{padding:0}}
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <FlexAlignCenter gap={2}>
                  <LockIcon/>
                  Authentication
                </FlexAlignCenter>
              </AccordionSummary>
              <AccordionDetails>
                <FlexColumn>
                  <StyledSubNavLink to={'/login'}>-- Login</StyledSubNavLink>
                  <StyledSubNavLink to={'/register'}>-- Register</StyledSubNavLink>
                </FlexColumn>
              </AccordionDetails>
            </StyledMenuAccordion>

            <StyledMenuAccordion>
              <AccordionSummary
              sx={{padding:0}}
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <FlexAlignCenter gap={2}>
                  <EditIcon/>
                  Forms
                </FlexAlignCenter>
              </AccordionSummary>
              <AccordionDetails>
                <FlexColumn>
                  <StyledSubNavLink to={'/summernote'}>-- Summernote</StyledSubNavLink>
                </FlexColumn>
              </AccordionDetails>
            </StyledMenuAccordion>

            <StyledMenuAccordion>
              <AccordionSummary
              sx={{padding:0}}
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <FlexAlignCenter gap={2}>
                  <LanguageIcon/>
                  Blog
                </FlexAlignCenter>
              </AccordionSummary>
              <AccordionDetails>
                <FlexColumn>
                  <StyledSubNavLink to={'/new-post'}>-- new Post</StyledSubNavLink>
                </FlexColumn>
              </AccordionDetails>
            </StyledMenuAccordion>

            <StyledMenuAccordion>
              <AccordionSummary
              sx={{padding:0}}
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <FlexAlignCenter gap={2}>
                  <MapIcon/>
                  Maps
                </FlexAlignCenter>
              </AccordionSummary>
              <AccordionDetails>
                <FlexColumn>
                  <StyledSubNavLink to={'/maps'}>-- jVector Map</StyledSubNavLink>
                </FlexColumn>
              </AccordionDetails>
            </StyledMenuAccordion>
        </FlexColumn>

      </Drawer>
      <Main open={open}>
        <Outlet/>
      </Main>
    </Box>
  );
}
