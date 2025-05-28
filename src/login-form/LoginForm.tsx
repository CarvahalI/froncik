import {AppBar, Button, TextField, Toolbar} from '@mui/material';
import './LoginForm.css'
import LoginIcon from '@mui/icons-material/Login'
import {Formik} from "formik";
import React, {useCallback, useMemo} from "react";
import * as yup from 'yup';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {useApi} from "../api/ApiProvider";
import {useTranslation} from "react-i18next";


function LoginForm() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const apiClient = useApi();
    const initialValues = { username: '', password: '', rememberMe: false};

    // const onSubmit = useCallback(
    //     (values:{username: string; password: string}, formik: any) => {
    //         navigate('/home');
    //     },
    //     [navigate],
    // );

    // wersja z logowaniem i weryfikacja
    const onSubmit = useCallback(
        (values: {username: string; password: string}, formik: any) => {
            apiClient.login(values).then((response) => {
                console.log(response.data);
                if (response.success && response.role === "ROLE_ADMIN") {
                    navigate('/home');
                } else if (response.success && response.role === "ROLE_READER") {
                    navigate('/homereader');
                }
                else {
                    formik.setFieldError('username', t('invalid_username_password'));
                }
            });
        },
            [apiClient, navigate],
        );


    const validationSchema = useMemo(() => yup.object().shape({
        username: yup.string().required(t('required')),
        password: yup.string().required(t('required')).min(8, t('password_8char'))})
    , [])
    return(
        <div>
        <AppBar position="static" sx={{ backgroundColor: '#E08D96' }}>
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
                            marginLeft: 5
                        }}
                    >
                        {t('library')}
                    </Typography>
            </Toolbar>
        </AppBar>
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnChange validateOnBlur>
            {(formik: any) => (<form className="Login-form" id="signForm" onSubmit={formik.handleSubmit} noValidate>
                <TextField
                    id="username"
                    label= {t('username')}
                    variant="outlined"
                    name='username'
                    onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                    error={formik.touched.username && !!(formik.errors.username)}
                    helperText = {formik.touched.username && formik.errors.username}/>
                <TextField
                    id="password"
                    label= {t('password')}
                    variant="outlined"
                    type="password"
                    name='password'
                    onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                    error={formik.touched.password && !!(formik.errors.password)}
                    helperText = {formik.touched.password && formik.errors.password}/>
                <Button
                    variant="text"
                    startIcon={<LoginIcon />}
                    type="submit"
                    form="signForm"
                    disabled={
                        !(formik.isValid && formik.dirty) ||
                        !formik.touched.password ||
                        !formik.touched.username
                    }
                    sx={{ color: '#F59AA5' }} // custom text color
                >
                    Log in
                </Button>
            </form>)}
        </Formik>
        </div>
    );
}

export default LoginForm;