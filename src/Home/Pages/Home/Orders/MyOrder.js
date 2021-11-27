import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Button from '@restart/ui/esm/Button';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';


const MyOrder = () => {
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

    const { user } = useAuth()
    const [myOrder, setMyorder] = useState([])
    useEffect(() => {

        fetch(`https://immense-beyond-10275.herokuapp.com/orders?email=${user.email}`)
            .then(res => res.json())

            .then(data => setMyorder(data))

    }, [])
    const handleDelete = id => {
        const url = `https://immense-beyond-10275.herokuapp.com/orders/${id}`;
        fetch(url, {
            method: 'delete',

        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    alert('are you sure to delete this this?');
                    const remaining = myOrder.filter(res => res._id !== id)
                    setMyorder(remaining)
                }
            })
    }
    return (
        <div>
            <h1>this is my orders</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>

                            <StyledTableCell align="right">Customer Name</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Phone</StyledTableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myOrder.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.phone}</StyledTableCell>
                                <StyledTableCell align="right">{row.payment ?
                                    'paid' :
                                    <Link to={`/dashboard/payment/${row._id}`}><Button>pay</Button></Link>}</StyledTableCell>

                                <StyledTableCell align="right"> <Button onClick={() => handleDelete(row._id)}>X cancel</Button> </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyOrder;