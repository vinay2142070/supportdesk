
import noteService from "./noteService"


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const initialState = {
    notes: [],
    isSuccess: false,
    isLoading: false,
    message: '',
    isError: false

}



export const addNote = createAsyncThunk(
    'note/addNote',
    async ({ text, ticketID }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.addNote(text, ticketID, token)
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

export const getNotes = createAsyncThunk(
    'note/getNotes',
    async (ticketID, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.getNotes(ticketID, token)
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




export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes.push(action.payload)
            })
            .addCase(addNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                //  state.ticket = null
            })

            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = action.payload
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                //  state.ticket = null
            })

    }

})

export const { reset } = noteSlice.actions
export default noteSlice.reducer