
import ticketService from "./ticketService"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const user = localStorage.getItem('user')

const initialState = {
    tickets: [],
    ticket: {},
    isSuccess: false,
    isLoading: false,
    message: '',
    isError: false

}



export const createTicket = createAsyncThunk(
    'ticket/createTicket',
    async (ticket, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.createTicket(ticket, token)
        } catch (error) {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTickets = createAsyncThunk(
    'ticket/getTickets',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTickets(token)
        } catch (error) {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)



export const getTicket = createAsyncThunk(
    'ticket/getTicket',
    async (ticketID, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTicket(ticketID, token)
        } catch (error) {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const closeTicket = createAsyncThunk(
    'ticket/closeTicket',
    async (ticketID, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.closeTicket(ticketID, token)
        } catch (error) {

            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)




export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                //  state.ticket = null
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                //  state.ticket = null
            })
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                //  state.ticket = null
            })
            .addCase(closeTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //  state.ticket = action.payload
                // state.tickets = sasxastate.tickets.map()
            })
            .addCase(closeTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                //  state.ticket = null
            })

    }

})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer