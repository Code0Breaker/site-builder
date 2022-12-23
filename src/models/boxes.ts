import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const Flex = styled(Box)({
    display:'flex',
})

export const FlexColumn = styled(Flex)({
    flexDirection:'column'
})

export const FlexAlignCenter = styled(Flex)({
    alignItems:'center'
})

export const FlexEnd = styled(Flex)({
    alignItems:'flex-end'
})

export const FlexStart = styled(Flex)({
    alignItems:'flex-start'
})

export const SpaceBetween = styled(Flex)({
    width:'100%',
    justifyContent:'space-between'
})

export const FlexCenter= styled(Flex)({
    width:'100%',
    justifyContent:'center'
})

export const PaperBox = styled(Flex)({
    transition: 'all 0.3s ease-in-out',
    background: '#fff',
    borderColor: '#eee',
    marginBottom: 30,
    borderRadius:5,
    width: '100%',
    backgroundColor:'white',
    padding:'20px',
    '&:hover':{
        boxShadow: '0 3px 8px 0 rgb(0 0 0 / 10%)'
    }
})

export const ProgressWitgetBox = styled(FlexColumn)({
    maxWidth:370,
    width:'100%',
    padding:20,
    alignItems:'space-between'
})