import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)({
    display:'flex',
    alignItems:'center',
    gap:20,
    maxWidth:210,
    width:'100%',
    padding:'13px 15px',
    color:'#380e47',
    borderRadius:5,
    transition:'all 0.5s',
    '&.active':{
        background:'#380e47',
        color:'white'
    },
    '&:hover':{
        transition:'all 0.5s',
        background:'#feb800',
        color:'white'
    }
})