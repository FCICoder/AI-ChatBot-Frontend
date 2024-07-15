import axios from "axios"

export const loginUser = async (email: string , password:string)=>{
    const res = await axios.post('/user/login', { email: email, password: password});
    if(res.status !== 200){
        throw new Error ('Unable to login');
    }
    const data = await res.data;
    return data
}

export const signupUser = async (name:string , email: string , password:string)=>{
    
    const res = await axios.post('/user/signup', {name:name ,  email: email, password: password});
    console.log(res);
    
    if(res.status !== 201){
        throw new Error ('Unable to Signup');
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
    
    const res = await axios.post('/chat/new' , {message} ,{withCredentials:true});
    
    if(res.status !== 200){
        throw new Error ('Unable to send chat request');
    }
    const data = await res.data;
    return data.data
}


export const getuserChats = async ()=>{    
    const res = await axios.get('/chat/all-chats');
    
    if(res.status !== 200){
        throw new Error ('Unable to get chat ');
    }
    const data = await res.data;
    return data.data
}


export const deleteUserChats = async ()=>{    
    const res = await axios.delete('/chat/delete');
    
    if(res.status !== 200){
        throw new Error ('Unable to delete chats ');
    }
    const data = await res.data;
    return data.data
}

export const logoutUser = async ()=>{    
    const res = await axios.get('/user/logout');
    
    if(res.status !== 200){
        throw new Error ('failed to logout');
    }
    const data = await res.data;
    return data.data
}
