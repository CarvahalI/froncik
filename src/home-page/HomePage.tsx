import {
    Box,
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    ThemeProvider,
    MenuItem,
    Select,
    InputLabel,
    FormControl, SelectChangeEvent
} from "@mui/material";
import CustomAppBar from "../app-bar/AppBar";
import {useApi} from "../api/ApiProvider";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import * as React from "react";

function HomePage() {
    const apiClient = useApi();
    const { t } = useTranslation();
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
    const [openDialog, setOpenDialog] = useState(false);
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [openLoanDialog, setOpenLoanDialog] = useState(false);

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        isbn: '',
        publishYear: 0,
        availableCopies: 0,
        publisher: ''
    });
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        role: ''
    });
    const [loanData, setLoanData] = useState({
        userId: 0,
        bookId: 0
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBookData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSliderChange = (name: string) => (event: any, newValue: any) => {
        setBookData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleLoanInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoanData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLoanSliderInputChange = (name: string) => (event: any, newValue: any) => {
        setLoanData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    apiClient.getBooks().then((response) => {
        console.log(response);
    });

    const handleAddUser = async () => {
        console.log("Dodaj użytkownika");
        try {
            const response = await apiClient.addUser(userData);
            console.log(response);
            setOpenUserDialog(false);

            setUserData({
                username: '',
                email: '',
                password: '',
                fullName: '',
                role: ''
            });
        } catch (error) {
            console.error("Błąd podczas dodawania użytkownika:", error);
        }
    };

    const handleAddBook = async () => {
        console.log("Przycisk został kliknięty");
        try {
            const response = await apiClient.addBook(bookData);
            console.log(response);
            setOpenDialog(false);

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
    const handleUserRoleChange = (event: SelectChangeEvent<string>) => {
        setUserData(prevState => ({
            ...prevState,
            role: event.target.value as string
        }));
    };

    const handleAddLoan = async () => {
        console.log("Dodaj wypożyczenie");
        console.log(loanData);
        try {
            const response = await apiClient.addLoan(loanData);
            console.log(response);
            setOpenLoanDialog(false);

            setLoanData({
                userId: 1,
                bookId: 1
            });
        } catch (error) {
            console.error("Błąd podczas dodawania wypożyczenia:", error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <CustomAppBar/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '80vh',
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenUserDialog(true)}
                        sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
                    >
                        {t('add user')}
                    </Button>
                    <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
                        <DialogTitle>{t('Add New User')}</DialogTitle>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField
                                label={t('username')}
                                name="username"
                                value={userData.username}
                                onChange={handleUserInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('email')}
                                name="email"
                                value={userData.email}
                                onChange={handleUserInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('password')}
                                name="password"
                                value={userData.password}
                                onChange={handleUserInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('full name')}
                                name="fullName"
                                value={userData.fullName}
                                onChange={handleUserInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <FormControl>
                                <InputLabel>{t('role')}</InputLabel>
                                <Select
                                    name="role"
                                    value={userData.role}
                                    onChange={handleUserRoleChange}
                                    sx={{ color: 'black' }}
                                >
                                    <MenuItem value={"ROLE_ADMIN"}>{t('librarian')}</MenuItem>
                                    <MenuItem value={"ROLE_READER"}>{t('client')}</MenuItem>
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenUserDialog(false)}>{t('cancel')}</Button>
                            <Button onClick={handleAddUser} color="primary">{t('add')}</Button>
                        </DialogActions>
                    </Dialog>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenDialog(true)}
                        sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
                    >
                        {t('add book')}
                    </Button>
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>{t('Add New Book')}</DialogTitle>
                        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField
                                label={t('title')}
                                name='title'
                                value={bookData.title}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('author')}
                                name='author'
                                value={bookData.author}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('ISBN')}
                                name="isbn"
                                value={bookData.isbn}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('publish year')}
                                name="publishYear"
                                type="number"
                                value={bookData.publishYear}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('available copies')}
                                name="availableCopies"
                                type="number"
                                value={bookData.availableCopies}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                            <TextField
                                label={t('publisher')}
                                name="publisher"
                                value={bookData.publisher}
                                onChange={handleInputChange}
                                InputProps={{ style: { color: 'black' } }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)}>{t('cancel')}</Button>
                            <Button onClick={handleAddBook} color="primary">{t('add')}</Button>
                        </DialogActions>
                    </Dialog>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenLoanDialog(true)}
                        sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
                    >
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
                            <Button onClick={handleAddLoan} color="primary">{t('add')}</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default HomePage;
