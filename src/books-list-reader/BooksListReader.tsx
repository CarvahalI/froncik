import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { AppBar, Box, Toolbar } from '@mui/material';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApi } from "../api/ApiProvider";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import {styled} from "@mui/material/styles";

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
    statusCode?: number;
}

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: 'black',
}));


function BooksListReader() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const pages = [t('home')];
    const settings = [t('log out')];
    const apiClient = useApi();
    const [rows, setRows] = React.useState<Book[]>([]);


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        backgroundColor: '#F59AA5',
        color: theme.palette.common.white,
        position: 'sticky',
        top: 0,
        zIndex: 1,
        fontWeight: 'bold',
        marginTop: 10
    }));

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

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOnClick = (route: string) => {
        navigate(route);
    };

    const handleCloseNavMenu = (page?: string) => {
        setAnchorElNav(null);
        if (page) {
            switch (page) {
                case t('home'):
                    navigate('/homereader');
                    break;
                default:
                    break;
            }
        }
    };

    const handleCloseUserMenu = (page?: string) => {
        setAnchorElUser(null);
        if (page) {
            switch (page) {
                case t('log out'):
                    navigate('/login');
                    break;
                default:
                    break;
            }
        }
    };


    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#E08D96', color: '#FFFFFF' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {t('library')}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {t('library')}
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => handleCloseNavMenu(page)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                            >
                                {settings.map((page) => (
                                    <MenuItem key={page} onClick={() => handleCloseUserMenu(page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ marginTop: 8 }}>
                <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: 800, marginTop: 10, margin: '0 auto' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">ISBN</StyledTableCell>
                                <StyledTableCell align="right">Title</StyledTableCell>
                                <StyledTableCell align="right">Author</StyledTableCell>
                                <StyledTableCell align="right">Publisher</StyledTableCell>
                                <StyledTableCell align="right">Publish Year</StyledTableCell>
                                <StyledTableCell align="right">Available Copies</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <CustomTableCell component="th" scope="row">
                                        {row.id}
                                    </CustomTableCell>
                                    <CustomTableCell align="right">{row.isbn}</CustomTableCell>
                                    <CustomTableCell align="right">{row.title}</CustomTableCell>
                                    <CustomTableCell align="right">{row.author}</CustomTableCell>
                                    <CustomTableCell align="right">{row.publisher}</CustomTableCell>
                                    <CustomTableCell align="right">{row.publishYear}</CustomTableCell>
                                    <CustomTableCell align="right">{row.availableCopies}</CustomTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </div>
    );
}

export default BooksListReader;
