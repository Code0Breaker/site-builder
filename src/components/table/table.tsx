import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { tableData } from './tableData';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTable() {
  return (
    <TableContainer>
      <Table sx={{ width: '100%' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Amount BTC</StyledTableCell>
            <StyledTableCell align="right">BTC Remaining</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">USD</StyledTableCell>
            <StyledTableCell align="right">Fee (%)</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                tableData.map((item,i)=>{
                    return(
                      <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row">{item.date}</StyledTableCell>
                        <StyledTableCell align="right" component="th" scope="row">{item.type}</StyledTableCell>
                        <StyledTableCell align="right" component="th" scope="row">{item.amount}</StyledTableCell>
                        <StyledTableCell align="right" component="th" scope="row">{item.remaining}</StyledTableCell>
                        <StyledTableCell align="right" component="th" scope="row">{item.price}</StyledTableCell>
                        <StyledTableCell align="right" component="th" scope="row">{item.usd}</StyledTableCell>
                        <StyledTableCell align="right" component="th" scope="row">{item.usd}</StyledTableCell>
                        <StyledTableCell align="right" component="th" scope="row">
                          <Button variant='outlined' color={item.statusColor}>{item.status}</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                })
            }

         
        </TableBody>
      </Table>
    </TableContainer>
  );
}
