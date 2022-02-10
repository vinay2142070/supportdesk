import axios from 'axios'



const register = async (userData) => {
    console.log(process.env.REACT_APP_API_URL);
    const API_URL = process.env.REACT_APP_API_URL + '/api/users/register/'
    const response = await axios.post(API_URL, userData)
    localStorage.setItem('user', JSON.stringify(response.data))

    return response.data
}

const login = async (userData) => {
    console.log(process.env.REACT_APP_API_URL);
    const API_URL = process.env.REACT_APP_API_URL + '/api/users/login/'
    const response = await axios.post(API_URL, userData)
    localStorage.setItem('user', JSON.stringify(response.data))

    return response.data
}

const logout = () => {

    localStorage.removeItem('user')

}

const authService = {
    register, login, logout
}

export default authService;