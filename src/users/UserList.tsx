import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './UserList.css';
import CustomAppBar from '../app-bar/AppBar';
import {
    Box,
<<<<<<< HEAD
    Button, createTheme,
=======
    Button,
    createTheme,
>>>>>>> zmiany-kolegi
    Dialog,
    ThemeProvider,
    DialogActions,
    DialogContent,
    DialogTitle,
<<<<<<< HEAD
    FormControl, InputLabel,
    MenuItem, Select,
=======
    FormControl,
    InputLabel,
    MenuItem,
    Select,
>>>>>>> zmiany-kolegi
    TextField
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useApi } from "../api/ApiProvider";
<<<<<<< HEAD
=======
import {useState} from "react";
import {deleteUserDto} from "../api/dto/deleteUser.dto";
>>>>>>> zmiany-kolegi

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#F59AA5',
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    fontWeight: 'bold',
    marginTop: 10
}));
const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: 'black',
}));

interface User {
    id: number;
    name: string;
    fullName: string;
    role: string;
    email: string;
}

interface ApiResponse {
    success: boolean;
    data: User[];
    statusCode?: number;
}

<<<<<<< HEAD
=======

>>>>>>> zmiany-kolegi
export default function UserList() {
    const { t } = useTranslation();
    const apiClient = useApi();

    const [rows, setRows] = React.useState<User[]>([]);
    const [openUserDialog, setOpenUserDialog] = React.useState(false);
<<<<<<< HEAD
=======
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
>>>>>>> zmiany-kolegi
    const [userData, setUserData] = React.useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        role: ''
    });
<<<<<<< HEAD
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


=======
    interface deleteUserDTO {
        id: number;
    }

    const [deleteUserDto, setDeleteUserDto] = useState<deleteUserDTO>({id: 0});

    const theme = createTheme({
        palette: {
            primary: { main: '#F59AA5' },
            secondary: { main: '#FFBAC0' },
            text: { primary: '#FFFFFF' },
        },
        typography: { fontFamily: 'Arial, sans-serif', fontSize: 16 },
    });

>>>>>>> zmiany-kolegi
    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const response: ApiResponse = await apiClient.getUsers();
<<<<<<< HEAD
                console.log("Odpowiedź z serwera:", response); // Dodane logowanie odpowiedzi z serwera
                if (response.success && Array.isArray(response.data)) {
                    setRows(response.data);
                    console.log("Ustawieni użytkownicy:", response.data); // Dodane logowanie ustawionych danych
                } else {
                    console.error('Nie udało się pobrać danych o użytkownikach:', response.statusCode);
                }
            } catch (error) {
                console.error('Błąd podczas pobierania danych o użytkownikach:', error);
            }
        };

        getUsers(); // Wywołanie funkcji getUsers wewnątrz useEffect
=======
                if (response.success && Array.isArray(response.data)) {
                    setRows(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getUsers();
>>>>>>> zmiany-kolegi
    }, [apiClient]);

    const handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
<<<<<<< HEAD
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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

            // Refresh the user list
            const refreshResponse: ApiResponse = await apiClient.getUsers();
            if (refreshResponse.success && Array.isArray(refreshResponse.data)) {
                setRows(refreshResponse.data);
            }
        } catch (error) {
            console.error("Błąd podczas dodawania użytkownika:", error);
        }
    };


    return (
        <ThemeProvider theme = {theme}>
        <div>
            <CustomAppBar />
            <Box sx={{ marginTop: 8 }}>
                <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 800, marginTop: 10, margin: '0 auto' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">{t('username')}</StyledTableCell>
                                <StyledTableCell align="right">{t('full name')}</StyledTableCell>
                                <StyledTableCell align="right">{t('email')}</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <CustomTableCell component="th" scope="row">
                                        {row.id}
                                    </CustomTableCell>
                                    <CustomTableCell align="right">{row.name}</CustomTableCell>
                                    <CustomTableCell align="right">{row.fullName}</CustomTableCell>
                                    <CustomTableCell align="right">{row.email}</CustomTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenUserDialog(true)}
                        sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF', marginRight: 2 }}
                    >
                        {t('add user')}
                    </Button>
                </Box>
            </Box>
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
                            onChange={(event: any) => handleUserInputChange(event as React.ChangeEvent<HTMLInputElement>)}
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
        </div>
    </ThemeProvider>
    );
}
=======
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddUser = async () => {
        try {
            await apiClient.addUser(userData);
            setOpenUserDialog(false);
            setUserData({ username: '', email: '', password: '', fullName: '', role: '' });
            const refresh: ApiResponse = await apiClient.getUsers();
            if (refresh.success && Array.isArray(refresh.data)) setRows(refresh.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onDeleteButtonClick = () => {
        setOpenDeleteDialog(true);
    };
    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setDeleteUserDto({id: 0});
    };

    const handleDeleteClick = async (dto: deleteUserDTO) => {
        try {
            await apiClient.deleteUser(dto);
            setOpenDeleteDialog(false);
            setDeleteUserDto({id: 0});
            const refresh: ApiResponse = await apiClient.getUsers();
            if (refresh.success) {
                setRows(refresh.data);
            }
        } catch (error) {
            console.error("Błąd przy usuwaniu użytkownika.", error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <CustomAppBar />
                <Box sx={{ marginTop: 8 }}>
                    <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 800, marginTop: 10, margin: '0 auto' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell align="right">{t('username')}</StyledTableCell>
                                    <StyledTableCell align="right">{t('full name')}</StyledTableCell>
                                    <StyledTableCell align="right">{t('email')}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.id}>
                                        <CustomTableCell component="th" scope="row">{row.id}</CustomTableCell>
                                        <CustomTableCell align="right">{row.name}</CustomTableCell>
                                        <CustomTableCell align="right">{row.fullName}</CustomTableCell>
                                        <CustomTableCell align="right">{row.email}</CustomTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenUserDialog(true)}
                            sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF', marginRight: 2 }}
                        >
                            {t('add user')}
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onDeleteButtonClick}
                            sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
                        >
                            Usuń użytkownika
                        </Button>
                    </Box>
                </Box>

                {/* Add User Dialog */}
                <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
                    <DialogTitle>{t('Add New User')}</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField label={t('username')} name="username" value={userData.username} onChange={handleUserInputChange} InputProps={{ style: { color: 'black' } }} />
                        <TextField label={t('email')} name="email" value={userData.email} onChange={handleUserInputChange} InputProps={{ style: { color: 'black' } }} />
                        <TextField label={t('password')} name="password" value={userData.password} onChange={handleUserInputChange} InputProps={{ style: { color: 'black' } }} />
                        <TextField label={t('full name')} name="fullName" value={userData.fullName} onChange={handleUserInputChange} InputProps={{ style: { color: 'black' } }} />
                        <FormControl>
                            <InputLabel>{t('role')}</InputLabel>
                            <Select
                                name="role"
                                value={userData.role}
                                onChange={(event: any) => handleUserInputChange(event as React.ChangeEvent<HTMLInputElement>)}
                                sx={{ color: 'black' }}
                            >
                                <MenuItem value="ROLE_ADMIN">{t('librarian')}</MenuItem>
                                <MenuItem value="ROLE_READER">{t('client')}</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenUserDialog(false)}>{t('cancel')}</Button>
                        <Button onClick={handleAddUser} color="primary">{t('add')}</Button>
                    </DialogActions>
                </Dialog>

                {/* Delete User Dialog */}
                <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                    <DialogTitle>{t('Remove User')}</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label={t('user ID')}
                            name="deleteId"
                            value={deleteUserDto.id}
                            onChange={e => setDeleteUserDto({ id :Number(e.target.value)})}
                            InputProps={{ style: { color: 'black' } }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>{t('cancel')}</Button>
                        <Button onClick={() => handleDeleteClick(deleteUserDto)} color="primary">{t('remove')}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}
>>>>>>> zmiany-kolegi
