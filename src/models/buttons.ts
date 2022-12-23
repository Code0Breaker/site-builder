import styled from "@emotion/styled";
import { Accordion } from "@mui/material";
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

export const StyledMenuAccordion = styled(Accordion)({
    gap:20,
    maxWidth:210,
    width:'100%',
    paddingLeft:15,
    color:'#380e47',
    borderRadius:5,
    transition:'all 0.5s',
    boxShadow:'none',
    // '&:hover':{
    //     transition:'all 0.5s',
    //     background:'#feb800',
    //     color:'white'
    // }
})

export const StyledSubNavLink = styled(NavLink)({
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
        fontWeight:'bold'
    },
    '&:hover':{
        transition:'all 0.5s',
        background:'#feb800',
        color:'white'
    }
})