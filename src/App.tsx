import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from "./login-form/LoginForm";
import BooksList from "./books-list/BooksList";
import HomePage from "./home-page/HomePage";
import HomeReader from "./home-reader/HomeReader";
import LoansList from "./loans-list/LoansList";
import UserList from "./users/UserList";
import BooksListReader from "./books-list-reader/BooksListReader";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoansListReader from "./loans-list-reader/LoansListReader";
import ApiProvider from "./api/ApiProvider";
import { I18nextProvider } from 'react-i18next';
import i18n from "./i18n";

function App() {
  return (
      <BrowserRouter>
          <I18nextProvider i18n={i18n}>
          <ApiProvider>
      <Routes>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/books" element={<BooksList/>}/>
          <Route path="/loans" element={<LoansList/>}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="/" element={<Navigate to={"/login"}/>}/>
          <Route path="*" element={<h1>404</h1>} />
          <Route path={"/homereader"} element={<HomeReader/>}/>
          <Route path={"/bookslistreader"} element={<BooksListReader />}/>
      </Routes>
          </ApiProvider>
          </I18nextProvider>
      </BrowserRouter>
  );
}

export default App;