import styled from "@emotion/styled";
import { Switch, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export const Switcher = ({checked, setChecked}:{checked:"0"|"1", setChecked: (checked:"0"|"1")=>void}) =>{
    const AntSwitch = styled(Switch)(() => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
          '& .MuiSwitch-thumb': {
            width: 15,
          },
          '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
          },
        },
        '& .MuiSwitch-switchBase': {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
          width: 12,
          height: 12,
          borderRadius: 6,
        },
        '& .MuiSwitch-track': {
          borderRadius: 16 / 2,
          opacity: 1,
          boxSizing: 'border-box',
        },
      }));
      
    return(
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography>invisible</Typography>
            <AntSwitch checked={checked === '1'} onChange={(e)=>setChecked(!e.target.checked?'0':'1')} inputProps={{ 'aria-label': 'ant design' }} />
            <Typography>visible</Typography>
        </Stack>
    )
}

export const SwitcherType = ({checked, setChecked}:{checked:"1"|"2", setChecked: (checked:"1"|"2")=>void}) =>{
  const AntSwitch = styled(Switch)(() => ({
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
      '&:active': {
        '& .MuiSwitch-thumb': {
          width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          transform: 'translateX(9px)',
        },
      },
      '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
          transform: 'translateX(12px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            opacity: 1,
          },
        },
      },
      '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
      },
      '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        boxSizing: 'border-box',
      },
    }));
    
  return(
      <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Project</Typography>
          <AntSwitch checked={checked === '2'} onChange={(e)=>setChecked(!e.target.checked?'1':'2')} inputProps={{ 'aria-label': 'ant design' }} />
          <Typography>Blog</Typography>
      </Stack>
  )
}