import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography,Box } from '@mui/material';

    export default function ViewStudentMarks({grades}) {
        console.log(grades)

    return (
        <Box sx={{marginTop:"30px"}}>
            <Typography sx={{fontSize:"22px",fontWeight:"600",marginBottom:"18px"}}>علامات الطالب : </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">اسم الدورة</TableCell>
                        <TableCell align="left">اسم الوحدة</TableCell>
                        <TableCell align="left">اسم الاختبار</TableCell>
                        <TableCell align="left">علامة الطالب</TableCell>
                        <TableCell align="left">العلامة الكلية</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {grades.map((row,index) => (
                        <TableRow
                        key={row.Exam}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" align="left">
                            {row.Exam.Unit.Course.title}
                        </TableCell>
                        <TableCell align="left">{row.Exam.Unit.title}</TableCell>
                        <TableCell align="left">{row.Exam.title}</TableCell>
                        <TableCell align="left">{row.studentGrade}</TableCell>
                        <TableCell align="left">{row.totalGrade}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}