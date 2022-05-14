// import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Header from './components/Header';
import {Container } from '@chakra-ui/react';


function App() {
  

  return (
    <>
    <BrowserRouter>
          <>
        <Header />
        <Container maxW='8xl' bg='gray.50'>
        <Router />
        </Container> 
          </>
    </BrowserRouter>
    </>
  );
}

export default App;
