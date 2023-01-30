import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography,Box } from '@mui/material';

    export default function BasicTable() {
    return (
        <Box sx={{marginTop:"30px"}}>
            <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"18px"}}>علامات الطالب : </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>اسم الدورة</TableCell>
                        <TableCell align="right">اسم الوحدة</TableCell>
                        <TableCell align="right">اسم الاختبار</TableCell>
                        <TableCell align="right">علامة الطالب</TableCell>
                        <TableCell align="right">العلامة الكلية</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {[].map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}