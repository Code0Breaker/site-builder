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
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, PaperBox, ProgressWitgetBox, SpaceBetween } from '../models/boxes';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Outlet } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Accordion, AccordionDetails, AccordionSummary, TextField, useMediaQuery } from '@mui/material';
import { SearchInput } from '../models/textfields';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import userImg from '../assets/user.png'
import logo from '../assets/lightLogo.png'
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
import { IMenu, IMenuLanguages } from './types';
import ruIcon from './ru.jpg'
import enIcon from './en.jpg'
import { getMenus } from '../api/pagesApi';
import CustomizedSnackbars from '../components/messageHandling/messagehandling';
import { getLanguages } from '../api/languages';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  isMobile:boolean
}>(({ theme, open, isMobile }) => ({
  background:'#f4f7f9',
  width:'calc(100vw - 50px)',
  minHeight:'100vh',
  flexGrow: 1,
  padding: '100px 30px',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: !isMobile?`-${drawerWidth}px`:0,
  ...(open && {
    width:!isMobile?`calc(100vw - ${drawerWidth+72}px)`:'calc(100vw - 50px)',
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
  const isMobile = useMediaQuery('(max-width:820px)')
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [languages, setLanguages] = useState<IMenuLanguages[]|null>(null)
  const [menuTranslations, setMenuTranslations] = useState<null | IMenu[]>(null)
  const [openSnacBar, setOpenSnacBar] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const menuOpen = Boolean(anchorEl);

  const [lang, setLang] = useState<string>('')
  React.useEffect(()=>{
    (async()=>{
      const data = await getMenus()
      setMenuTranslations(data.data);
      const langs = await getLanguages()
      setLanguages(langs.data)
      setLang(langs.data[0].short_code)
    })()
  },[])
console.log(menuTranslations);

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
      <CustomizedSnackbars open={openSnacBar} setOpen={setOpenSnacBar} errorText={errorText}/>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <SpaceBetween>
            <Flex/>
            <IconButton>
                <PowerSettingsNewIcon sx={{color:'white'}}/>
            </IconButton>
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
        variant={isMobile?'temporary':"persistent"}
        anchor="left"
        open={open}
        onClose={()=>setOpen(false)}
      >
        <DrawerHeader>
            <Box display={'flex'} gap={2} width={'100%'} alignItems={'center'}>
                <img src={logo} />
            </Box>

        </DrawerHeader>
        <Divider sx={{mb:5}}/>
        <FlexColumn alignItems={'center'}>
            <Box borderRadius={100}>
                <img src={localStorage.userImage} width="140" height="140" style={{objectFit:'contain', borderRadius:100}}/>
            </Box>
            <Typography>Welcome,</Typography>
            <Button color={'secondary'} onClick={handleClick}>{localStorage.userName}</Button>
 
        </FlexColumn>
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
                  <StyledSubNavLink to={'/home'} end>-- Posts</StyledSubNavLink>
                  <StyledSubNavLink to={'/home/new-post'} end>-- new Post</StyledSubNavLink>
                  <StyledSubNavLink to={'/home/blog-tags'} end>-- Tags</StyledSubNavLink>
                </FlexColumn>
              </AccordionDetails>
            </StyledMenuAccordion>
        <FlexColumn mt={2} gap={'5px'} width={'100%'} alignItems={'center'}>
        <StyledNavLink to={'site'} end>Pages</StyledNavLink>
        <StyledNavLink to={'services'} end>Services</StyledNavLink>
        <StyledNavLink to={'categories'} end>Categories</StyledNavLink>
        <StyledNavLink to={'projects'} end>Projects</StyledNavLink>
        <StyledNavLink to={'inbox'} end>Inbox</StyledNavLink>
        <StyledNavLink to={'team'} end>Team</StyledNavLink>
        <StyledNavLink to={'settings'} end>Settings</StyledNavLink>
        <StyledNavLink to={'users'} end>Users</StyledNavLink>
        <StyledNavLink to={'social'} end>Social links</StyledNavLink>
        <StyledNavLink to={'languages'} end>Languages</StyledNavLink>
        
          
        </FlexColumn>

      </Drawer>
      <Main open={open} isMobile={isMobile}>
        <Outlet context={{setOpenSnacBar, errorText, setErrorText}}/>
      </Main>
    </Box>
  );
}
