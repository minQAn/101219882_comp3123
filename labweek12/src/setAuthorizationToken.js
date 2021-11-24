import axios from 'axios';

export default function setAuthorizationToken(token){
    if(token){
        axios.defaultss.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}