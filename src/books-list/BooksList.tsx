import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './BooksList.css';
import CustomAppBar from '../app-bar/AppBar';
import {
    Box,
    Button,
    createTheme,
    Dialog,
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
}

export default function StickyHeaderTable() {
    const { t } = useTranslation();
    const apiClient = useApi();

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


    return (
        <div>
            <CustomAppBar />
            <Box sx={{ marginTop: 8 }}>
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
