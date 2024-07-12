import axios from "axios"

export const loginUser = async (email: string , password:string)=>{
    const res = await axios.post('/user/login', { email: email, password: password});
    if(res.status !== 200){
        throw new Error ('Unable to login');
    }
    const data = await res.data;
    return data
}

export const checkAuthStatus = async ()=>{
    const res = await axios.get('/user/auth-status');
    if(res.status !== 200){
        throw new Error ('Unable to authenticate');
    }
    const data = await res.data;
    return data
}

export const senChatRequest = async (message:string)=>{
    console.log(message);
    
    const res = await axios.post('/chat/new' , {message});
    console.log(res);
    
    if(res.status !== 200){
        throw new Error ('Unable to send chat request');
    }
    const data = await res.data;
    return data.data
}