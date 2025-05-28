import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
<<<<<<< HEAD
import { styled } from '@mui/material/styles';
=======
>>>>>>> zmiany-kolegi
import './BooksList.css';
import CustomAppBar from '../app-bar/AppBar';
import {
    Box,
    Button,
    createTheme,
    Dialog,
<<<<<<< HEAD
    DialogActions,
    DialogContent,
    DialogTitle,
    Slider,
    TextField
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useApi } from "../api/ApiProvider";
import {useState} from "react";
import { ThemeProvider } from '@emotion/react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#F59AA5',
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontWeight: 'bold',
    marginTop: 10
}));
=======
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    ThemeProvider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import {DeleteBookDto} from "../api/dto/DeleteBook.dto";

const theme = createTheme({
    palette: {
        primary: { main: '#F59AA5' }
    }
});
>>>>>>> zmiany-kolegi

interface Book {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publishYear: number;
    availableCopies: number;
}

interface ApiResponse {
    success: boolean;
    data: Book[];
<<<<<<< HEAD
    statusCode?: number;
}


=======
}

>>>>>>> zmiany-kolegi
export default function StickyHeaderTable() {
    const { t } = useTranslation();
    const apiClient = useApi();

<<<<<<< HEAD
    const [rows, setRows] = React.useState<Book[]>([]);
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

    React.useEffect(() => {
        const getBooks = async () => {
            try {
                const response: ApiResponse = await apiClient.getBooks();
                console.log("Odpowiedź z serwera:", response); // Dodane logowanie odpowiedzi z serwera
                if (response.success && Array.isArray(response.data)) {
                    setRows(response.data);
                    console.log("Ustawione książki:", response.data); // Dodane logowanie ustawionych danych
                } else {
                    console.error('Nie udało się pobrać danych o książkach:', response.statusCode);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych o książkach:', error);
            }
        };

        getBooks(); // Wywołanie funkcji getBooks wewnątrz useEffect
    }, [apiClient]);
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbn: '',
        publishYear: 0,
        availableCopies: 0,
        publisher: ''
    });
    const [openDialog, setOpenBookDialog] = useState(false);
    const handleAddBook = async () => {
        console.log("Przycisk został kliknięty");
        try {
            const response = await apiClient.addBook(bookData);
            console.log(response);
            setOpenBookDialog(false);

            setBookData({
                title: '',
                author: '',
                isbn: '',
                publishYear: 0,
                availableCopies: 0,
                publisher: ''
            });
        } catch (error) {
            console.error("Błąd podczas dodawania książki:", error);
        }
    };
    const handleBookInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBookData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
=======
    const [rows, setRows] = useState<Book[]>([]);
    const [bookData, setBookData] = useState({ title: '', author: '', isbn: '', publishYear: 0, availableCopies: 0, publisher: '' });
    const [openDialog, setOpenBookDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    // const [deleteBookId, setDeleteBookId] = useState<string>('');


    useEffect(() => {
        const getBooks = async () => {
            const response: ApiResponse = await apiClient.getBooks();
            if (response.success) setRows(response.data);
        };
        getBooks();
    }, [apiClient]);

    const handleAddBook = async () => {
        await apiClient.addBook(bookData);
        setOpenBookDialog(false);
        setBookData({ title: '', author: '', isbn: '', publishYear: 0, availableCopies: 0, publisher: '' });
        const resp = await apiClient.getBooks();
        if (resp.success) setRows(resp.data);
    };
// DTO
    interface DeleteBookDTO {
        bookId: number;
    }

// Stan w komponencie
    const [DeleteBookDto, setDeleteBookDTO] = useState<DeleteBookDTO>({bookId: 0 });

// Funkcja otwierająca dialog i ustawiająca DTO
    const onDeleteButtonClick = () => {
        // setDeleteBookDTO(0);      // wyczyść poprzednie ID (opcjonalnie)
        setOpenDeleteDialog(true);
    };

// Funkcja usuwająca książkę
    const handleDeleteClick = async (dto: DeleteBookDto) => {
        try {
            // Wywołanie API z DTO
            await apiClient.deleteBook(dto);

            // Zamknięcie dialogu
            setOpenDeleteDialog(false);

            // Opcjonalnie: wyczyść DTO
            setDeleteBookDTO({ bookId: 0 });

            // Odświeżenie listy książek
            const resp = await apiClient.getBooks();
            if (resp.success) {
                setRows(resp.data);
            }
        } catch (error) {
            console.error('Błąd przy usuwaniu książki:', error);
            // Możesz tu pokazać toast z info o błędzie
        }
    };


>>>>>>> zmiany-kolegi
    return (
        <div>
            <CustomAppBar />
            <Box sx={{ marginTop: 8 }}>
<<<<<<< HEAD
                <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 800, marginTop: 10, margin: '0 auto' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">{t('ISBN')}</StyledTableCell>
                                <StyledTableCell align="right">{t('title')}</StyledTableCell>
                                <StyledTableCell align="right">{t('author')}</StyledTableCell>
                                <StyledTableCell align="right">{t('publisher')}</StyledTableCell>
                                <StyledTableCell align="right">{t('publish year')}</StyledTableCell>
                                <StyledTableCell align="right">{t('available copies')}</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
=======
                <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 800, margin: '0 auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: '#FFFFFF' }}>ID</TableCell>
                                <TableCell align="right" sx={{ backgroundColor: theme.palette.primary.main, color: '#FFFFFF' }}>{t('ISBN')}</TableCell>
                                <TableCell align="right" sx={{ backgroundColor: theme.palette.primary.main, color: '#FFFFFF' }}>{t('title')}</TableCell>
                                <TableCell align="right" sx={{ backgroundColor: theme.palette.primary.main, color: '#FFFFFF' }}>{t('author')}</TableCell>
                                <TableCell align="right" sx={{ backgroundColor: theme.palette.primary.main, color: '#FFFFFF' }}>{t('publisher')}</TableCell>
                                <TableCell align="right" sx={{ backgroundColor: theme.palette.primary.main, color: '#FFFFFF' }}>{t('publish year')}</TableCell>
                                <TableCell align="right" sx={{ backgroundColor: theme.palette.primary.main, color: '#FFFFFF' }}>{t('available copies')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
>>>>>>> zmiany-kolegi
                                    <TableCell align="right">{row.isbn}</TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                    <TableCell align="right">{row.author}</TableCell>
                                    <TableCell align="right">{row.publisher}</TableCell>
                                    <TableCell align="right">{row.publishYear}</TableCell>
                                    <TableCell align="right">{row.availableCopies}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
<<<<<<< HEAD
                    <ThemeProvider theme = {theme}>
                    <Button variant="contained"
                            color="primary"
                            onClick={() => setOpenBookDialog(true)}
                            sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF', margin: '10px'}}>
                        {t('add book')}
                    </Button>
                </ThemeProvider>
                    <Dialog open={openDialog} onClose={() => setOpenBookDialog(false)}>
                        <DialogTitle>{t('Add New Book')}</DialogTitle>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField
                                label={t('title')}
                                name='title'
                                value={bookData.title}
                                onChange={handleBookInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('author')}
                                name='author'
                                value={bookData.author}
                                onChange={handleBookInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('ISBN')}
                                name="isbn"
                                value={bookData.isbn}
                                onChange={handleBookInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('publish year')}
                                name="publishYear"
                                type="number"
                                value={bookData.publishYear}
                                onChange={handleBookInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('available copies')}
                                name="availableCopies"
                                type="number"
                                value={bookData.availableCopies}
                                onChange={handleBookInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('publisher')}
                                name="publisher"
                                value={bookData.publisher}
                                onChange={handleBookInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenBookDialog(false)}>{t('cancel')}</Button>
                            <Button onClick={handleAddBook} >{t('add')}</Button>
                        </DialogActions>
                    </Dialog>
                    {/*<Button variant="contained"*/}
                    {/*        color="secondary"*/}
                    {/*        onClick={handleDeleteBook}*/}
                    {/*        sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF', margin: '10px'}}>*/}
                    {/*    {t('end loan')}*/}
                    {/*</Button>*/}

                </Box>
            </Box>
        </div>
    );
}
=======
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            onClick={() => setOpenBookDialog(true)}
                            sx={{ width: '200px', margin: '10px' }}
                        >
                            {t('add book')}
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            onClick={onDeleteButtonClick}
                            sx={{ width: '200px', margin: '10px' }}
                        >
                            {t('usun książke')}
                        </Button>
                    </ThemeProvider>
                </Box>

                <Dialog open={openDialog} onClose={() => setOpenBookDialog(false)}>
                    <DialogTitle>{t('Add New Book')}</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {['title','author','isbn','publishYear','availableCopies','publisher'].map(field => (
                            <TextField
                                key={field}
                                name={field}
                                label={t(field)}
                                type={['publishYear','availableCopies'].includes(field) ? 'number' : 'text'}
                                value={(bookData as any)[field]}
                                onChange={e => setBookData({ ...bookData, [field]: ['publishYear','availableCopies'].includes(field) ? Number(e.target.value) : e.target.value })}
                                sx={{ backgroundColor: '#fff' }}
                                InputProps={{ style: { color: 'black' } }}
                            />
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenBookDialog(false)}>{t('cancel')}</Button>
                        <Button onClick={handleAddBook}>{t('add')}</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                    <DialogTitle>{t('Delete Book')}</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label={t('book id')}
                            name="bookId"
                            value={DeleteBookDto.bookId}
                            onChange={e =>
                                setDeleteBookDTO({ bookId: Number(e.target.value) })    // <-- obiekt { bookId }
                            }
                            sx={{ backgroundColor: '#fff' }}
                            InputProps={{ style: { color: 'black' } }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDeleteDialog(false)}>{t('cancel')}</Button>
                        <Button onClick={() => handleDeleteClick(DeleteBookDto)}>
                            {t('usuń')}</Button>

                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}
>>>>>>> zmiany-kolegi
