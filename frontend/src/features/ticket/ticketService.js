import axios from 'axios'



const createTicket = async (ticketData, token) => {

    const API_URL = process.env.REACT_APP_API_URL + '/api/ticket/'
    const config = {
        headers: {
            Authorization: token,
        },
    }
    const response = await axios.post(API_URL, ticketData, config)
    // localStorage.setItem('ticket', JSON.stringify(response.data))

    return response.data
}

const getTickets = async (token) => {

    const API_URL = process.env.REACT_APP_API_URL + '/api/ticket/'
    const config = {
        headers: {
            Authorization: token,
        },
    }
    const response = await axios.get(API_URL, config)
    // localStorage.setItem('ticket', JSON.stringify(response.data))

    return response.data
}

const getTicket = async (ticketID, token) => {

    const API_URL = process.env.REACT_APP_API_URL + `/api/ticket/${ticketID}`
    const config = {
        headers: {
            Authorization: token,
        },
    }
    const response = await axios.get(API_URL, config)
    // localStorage.setItem('ticket', JSON.stringify(response.data))

    return response.data
}

const closeTicket = async (ticketID, token) => {

    const API_URL = process.env.REACT_APP_API_URL + `/api/ticket/${ticketID}`
    const config = {
        headers: {
            Authorization: token,
        },
    }
    const response = await axios.put(API_URL, { status: "closed" }, config)
    // localStorage.setItem('ticket', JSON.stringify(response.data))

    return response.data
}


const ticketService = {
    createTicket, getTickets, getTicket, closeTicket
}

export default ticketService;