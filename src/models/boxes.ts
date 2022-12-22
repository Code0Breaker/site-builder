import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const FlexColumn = styled(Box)({
    display:'flex',
    flexDirection:'column'
})

export const PaperBox = styled(Box)({
    display:'flex',
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