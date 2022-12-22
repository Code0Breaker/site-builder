import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';

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

// FacebookIcon
// TwitterIcon
// LinkedInIcon
// GoogleIcon

export const socialData = [
    {icon: <FacebookIcon/>,title:'Facebook', color:'#00bcd2'},
    {icon: <TwitterIcon/>,title:'Twitter', color:'black'},
    {icon: <LinkedInIcon/>,title:'Linkedin', color:'green'},
    {icon: <GoogleIcon/>,title:'Google', color:'blue'},
]