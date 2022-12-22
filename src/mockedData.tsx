import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';

import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';

interface WidgetType{
    icon:JSX.Element,
    title:string, 
    count:string,
    percent:number, 
    text:string, 
    color:'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
}

export const widgetData:WidgetType[] = [
    {icon:<AttachMoneyOutlinedIcon/>,title:'Earning', count:'$22.500',percent:50, text:'19% compared to last week', color:'success'},
    {icon:<LeaderboardIcon/>,title:'Earning', count:'$22.500',percent:50, text:'19% compared to last week', color:'info'},
    {icon:<ShoppingCartIcon/>,title:'Earning', count:'$22.500',percent:50, text:'19% compared to last week', color:'secondary'},
    {icon:<ThumbUpIcon/>,title:'Earning', count:'$22.500',percent:50, text:'19% compared to last week', color:'warning'},
]

export const socialData = [
    {icon: <FacebookIcon/>,title:'Facebook', color:'#00bcd2'},
    {icon: <TwitterIcon/>,title:'Twitter', color:'black'},
    {icon: <LinkedInIcon/>,title:'Linkedin', color:'green'},
    {icon: <GoogleIcon/>,title:'Google', color:'blue'},
]

export const inboxData = [
    {icon: <MailIcon/>,title:'Inbox'},
    {icon: <SendIcon/>,title:'Sent'},
    {icon: <DraftsIcon/>,title:'Draft'},
    {icon: <StarBorderIcon/>,title:'Starred'},
    {icon: <DeleteIcon/>,title:'Trash'},
]

export const labelsData = [
    {color:'#de4848', title:'Web Design'},
    {color:'#007bff', title:'Recharge'},
    {color:'#5A5A5A', title:'Paypal'},
    {color:'#5A5A5A', title:'Family'},
]