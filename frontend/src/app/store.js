import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/ticket/ticketSlice';
import noteReducer from '../features/note/noteSlice';


export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
    ticket: ticketReducer,
    note: noteReducer
  },
});
