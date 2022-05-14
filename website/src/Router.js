import React from 'react';
import {
    Routes,
    Route
  } from "react-router-dom";
import CreateEvent from './components/admin/event/Create';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import SingleEvents from './components/SingleEvents';

export default function Router() {
  return(
       <>
       <Routes>
           <Route exact path='/' element={<Home />} />
           <Route exact path='/signup' element={<Register />} />
           <Route exact path='/login' element={<Login />} />
           <Route exact path='/events/:eId' element={<SingleEvents />} />
           <Route exact path='/admin/event/create' element={<CreateEvent />} />
           
       </Routes>
       </>
    );
}