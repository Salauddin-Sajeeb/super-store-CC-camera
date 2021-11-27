
import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../../Hooks/useAuth';
import { Spinner } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import { Link } from 'react-router-dom';


const ManageOrder = () => {

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

    const [order, setOrders] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => setOrders(data))

    }, [])
    const { isLoading } = useAuth()
    if (isLoading) {
        return <Spinner animation="border" variant="danger" />
    }
    const handleDelete = id => {
        const url = `http://localhost:5000/orders/${id}`
        fetch(url, {
            method: 'delete',

        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    alert('are you sure to delete this this?');
                    const remaining = order.filter(res => res._id !== id)
                    setOrders(remaining)
                }
            })
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                <TableHead>
                    <TableRow>

                        <StyledTableCell align="right">Customer Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Phone</StyledTableCell>




                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            <StyledTableCell align="right">{row.phone}</StyledTableCell>

                            <StyledTableCell align="right"><Link to="payment"></Link></StyledTableCell>
                            <StyledTableCell align="right"><Button onClick={() => handleDelete(row._id)}>X cancel</Button></StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ManageOrder;