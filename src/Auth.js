import axios from 'axios';

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://api.pagesauce.io';

export async function register_user(data) {
    const response = await axios.post(`${url}/auth/register/`, {
            "username": data.get('email'),
            "email": data.get('email'),
            "first_name": data.get('firstName'),
            "last_name": data.get('lastName'),
            "website": data.get('website'),
            "password": data.get('password'),
            "confirm_password": data.get('confirmPassword')
        }, {headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },});

    localStorage.setItem('access-token', response.data.access);
    localStorage.setItem('refresh-token', response.data.refresh);
    localStorage.setItem('selected-website', response.data.website);
    
    return response;
}

export async function login(data) {
    const response = await axios.post(`${url}/auth/login/`, {
            "username": data.get('email'),
            "password": data.get('password'),
        }, {headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },});

    localStorage.setItem('access-token', response.data.access);
    localStorage.setItem('refresh-token', response.data.refresh);
    
    return response.data;
}