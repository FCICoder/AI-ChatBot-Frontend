import { Avatar, Box, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { authContext } from '../../Context/AuthContext';

const ChatItem = ({ content, role }: { content: string, role: "user" | "assistant" }) => {
    const auth = useContext(authContext);
    return <>
    {role === "assistant" ? <Box sx={{ display: 'flex', p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
        <Avatar sx={{ml:'0' , }}>
            <img src='openai.png' alt="openai" width={30} />
        </Avatar>
        <Box>
            <Typography fontSize={'20px'}>{content}</Typography>
        </Box>
    </Box> :
    <Box sx={{ display: 'flex', p: 2, bgcolor: "#004d56", gap: 2 }}>
        <Avatar sx={{ml:'0' , bgcolor:'black' , color:'white'  }}>
        {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
        </Avatar>
        <Box>
            <Typography fontSize={'20px'}>{content}</Typography>
        </Box>
    </Box>
}
    </> 
}

export default ChatItem
