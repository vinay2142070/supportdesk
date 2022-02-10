import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute'
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';



function App() {

  return (<>
    <div className='container'>

      <BrowserRouter>
        <Header />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/view-tickets' element={<PrivateRoute />} >
            <Route path='/view-tickets' element={<Tickets />} />
          </Route>
          <Route path='/create-ticket' element={<PrivateRoute />} >
            <Route path='/create-ticket' element={<NewTicket />} />
          </Route>

          <Route path='/ticket/:ticketId' element={<PrivateRoute />} >
            <Route path='/ticket/:ticketId' element={<Ticket />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  </>
  );
}

export default App;
