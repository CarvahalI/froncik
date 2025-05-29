import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './LoansList.css';
import CustomAppBar from '../app-bar/AppBar';
import {
    Box,
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slider,
    TextField,
    ThemeProvider
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useApi } from "../api/ApiProvider";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#F59AA5',
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontWeight: 'bold',
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: 'black',
}));

const theme = createTheme({
    palette: {
        primary: {
            main: '#F59AA5',
        },
        secondary: {
            main: '#FFBAC0',
        },
        text: {
            primary: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
    },
});

interface User {
    id: number;
    name: string;
    email: string;
}

interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    publishYear: number;
    availableCopies: number
}

interface Loan {
    id: number;
    user: User;
    book: Book;
    loanDate: string;
    dueDate: string;
    returnDate: string;
}
interface LoanToAdd {
    userId: number,
    bookId: number
}

export default function StickyHeaderTable() {
    const { t } = useTranslation();
    const apiClient = useApi();
    const [openLoanDialog, setOpenLoanDialog] = useState(false);
    const [loanData, setLoanToAddData] = useState({
        userId: 0,
        bookId: 0
    });

    const handleLoanInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoanToAddData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLoanSliderInputChange = (name: string) => (event: any, newValue: any) => {
        setLoanToAddData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const [rows, setRows] = React.useState<Loan[]>([]);

    React.useEffect(() => {
        const getLoans = async () => {
            try {
                const response = await apiClient.getLoans();
                if (response.success) {
                    console.log(response.data);
                    setRows(response.data as unknown as Loan[]);
                } else {
                    console.error('Nie udało się pobrać danych o wypożyczeniach:', response.statusCode);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych o wypożyczeniach:', error);
            }
        };

        getLoans();
    }, [apiClient]);

    const handleStartNewLoan = async () => {
        console.log("Dodaj wypożyczenie");
        try {
            const response = await apiClient.addLoan(loanData);
            console.log(response);
            setOpenLoanDialog(false);

            setLoanToAddData({
                userId: 0,
                bookId: 0,
            });

            // const updatedLoans = await apiClient.getLoans();
            // if (updatedLoans.success) {
            //     setRows(updatedLoans.data as unknown as Loan[]);
            // }

        } catch (error) {
            console.error("Błąd podczas dodawania wypożyczenia:", error);
        }
    };

const handleEndLoan = async (loanId: number) => {
    try {
        const response = await apiClient.endLoan(loanId);
        if (response.success) {
            const updatedLoans = await apiClient.getLoans();
            if (updatedLoans.success && updatedLoans.data) {
    const mappedLoans: Loan[] = updatedLoans.data.map((loan: any) => ({

    id: loan.id,
    book: {
        id: loan.bookId,
        title: loan.bookTitle,
        author: loan.bookAuthor,
        isbn: loan.bookIsbn,
        publisher: loan.bookPublisher,
        publishYear: loan.bookPublishYear,
        availableCopies: loan.bookAvailableCopies
    },
    user: {
        id: loan.userId,
        name: loan.userName,
        email: loan.userEmail
    },
    loanDate: loan.loanDate,
    dueDate: loan.dueDate,
    returnDate: loan.returnDate
}));

setRows(mappedLoans);

            }
        } else {
            console.error("Nie udało się zakończyć wypożyczenia:", response.statusCode);
        }
    } catch (error) {
        console.error("Błąd przy zakończeniu wypożyczenia:", error);
    }
};




    return (
        <ThemeProvider theme={theme}>
            <div>
                <CustomAppBar />
                <Box sx={{ marginTop: 8 }}>
                    <TableContainer component={Paper}>
 <Table stickyHeader aria-label="sticky table">
                            <TableHead>
  <TableRow>
    <StyledTableCell>{t('loan id')}</StyledTableCell>
    <StyledTableCell align="center">{t('user ID')}</StyledTableCell>
    <StyledTableCell align="center">{t('book ID')}</StyledTableCell>
    <StyledTableCell align="center">{t('loan date')}</StyledTableCell>
    <StyledTableCell align="center">{t('Akcja')}</StyledTableCell>
  </TableRow>
</TableHead>
<TableBody>
  {rows.map((row) => (
    <TableRow key={row.id}>
      <CustomTableCell>{row.id}</CustomTableCell>
      <CustomTableCell align="center">{row.user.id}</CustomTableCell>
      <CustomTableCell align="center">{row.book.id}</CustomTableCell>
      <CustomTableCell align="center">{row.loanDate}</CustomTableCell>
      <CustomTableCell align="center">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => handleEndLoan(row.id)}
          disabled={!!row.returnDate}
        >
          {t('end loan')}
        </Button>
      </CustomTableCell>
    </TableRow>
  ))}
</TableBody>

  </Table>
</TableContainer>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button variant="contained"
                                color="primary"
                                onClick={() => setOpenLoanDialog(true)}
                                sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF', margin: '10px'}}>
                            {t('add loan')}
                        </Button>
                        <Dialog open={openLoanDialog} onClose={() => setOpenLoanDialog(false)}>
                            <DialogTitle>{t('Add New Loan')}</DialogTitle>
                            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <TextField
                                    label={t('user ID')}
                                    name="userId"
                                    type="number"
                                    value={loanData.userId}
                                    onChange={handleLoanInputChange}
                                    InputProps={{ style: { color: 'black' } }}
                                />
                                <TextField
                                    label={t('book ID')}
                                    name="bookId"
                                    type="number"
                                    value={loanData.bookId}
                                    onChange={handleLoanInputChange}
                                    InputProps={{ style: { color: 'black' } }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenLoanDialog(false)}>{t('cancel')}</Button>
                                <Button onClick={handleStartNewLoan} color="primary">{t('add')}</Button>
                            </DialogActions>
                        </Dialog>
                       


                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    );
}
