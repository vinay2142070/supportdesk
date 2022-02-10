import axios from 'axios'



const addNote = async (noteData, ticketID, token) => {

    const API_URL = process.env.REACT_APP_API_URL + `/api/ticket/${ticketID}/notes`
    const config = {
        headers: {
            Authorization: token,
        },
    }
    const response = await axios.post(API_URL, { text: noteData }, config)
    // localStorage.setItem('ticket', JSON.stringify(response.data))

    return response.data
}

const getNotes = async (ticketID, token) => {

    const API_URL = process.env.REACT_APP_API_URL + `/api/ticket/${ticketID}/notes`
    const config = {
        headers: {
            Authorization: token,
        },
    }
    const response = await axios.get(API_URL, config)
    // localStorage.setItem('ticket', JSON.stringify(response.data))

    return response.data
}


const noteService = {
    addNote, getNotes
}

export default noteService;