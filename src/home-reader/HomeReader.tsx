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
import {AppBar, Box, createTheme, ThemeProvider, Toolbar} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HomeReader() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const pages = [t('home')];
    const settings = [t('log out')];

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
        <ThemeProvider theme={theme}>
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
                                color = {"secondary"}
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
                    onClick={() => handleOnClick('/loanlistreader')}
                    sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
                >
                    {t('loan list reader')}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOnClick('/bookslistreader')}
                    sx={{ width: '200px', backgroundColor: '#F59AA5', color: '#FFFFFF' }}
                >
                    {t('book list')}
                </Button>
            </Box>
        </div>
        </ThemeProvider>
    );
}

export default HomeReader;
