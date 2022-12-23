import { Checkbox, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { tableData } from "../../components/table/tableData";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
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
const Contacts = () =>(
    <>
        <TableContainer>
            <Table sx={{ width: '100%' }} aria-label="customized table">
                <TableHead >
                    <TableRow>
                        <StyledTableCell>
                            <Checkbox/>
                        </StyledTableCell>
                        <StyledTableCell align="center" sx={{fontWeight:'bold'}}>Name</StyledTableCell>
                        <StyledTableCell align="center" sx={{fontWeight:'bold'}}>Email</StyledTableCell>
                        <StyledTableCell align="center" sx={{fontWeight:'bold'}}>Phone</StyledTableCell>
                        <StyledTableCell align="center" sx={{fontWeight:'bold'}}>Address</StyledTableCell>
                        <StyledTableCell align="center" sx={{fontWeight:'bold'}}>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((item, i) => {
                        return (
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">
                                    <Checkbox/>    
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">John Smith</StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">john-smith@gmail.com</StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">123-456-789</StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">123 6th St. Melbourne, FL 32904</StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">
                                    <IconButton>
                                        <ModeEditIcon/>
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon/>
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    })}


                </TableBody>
            </Table>
        </TableContainer>
    </>
)

export default Contacts