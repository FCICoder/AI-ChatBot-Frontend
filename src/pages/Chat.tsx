import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import  { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { authContext } from "../Context/AuthContext"
import { red } from "@mui/material/colors";
import ChatItem from "../component/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getuserChats, senChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role : "user"| "assistant";
  content: string;
};
const Chat = () => {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  let [chatMessages , setChatMessages] = useState<Message[]>([]);
  const inputRef =useRef<HTMLInputElement | null>(null);
  const handleSubmet = async()=>{
    try{
      console.log(inputRef.current?.value);
      const content = inputRef.current?.value as string;
      if(inputRef && inputRef.current){
        inputRef.current.value = '';
      }
      const newMessage:Message = {role:'user', content: content};
      setChatMessages((prev) => [...prev , newMessage] );
      const chatData = await senChatRequest(content);
      setChatMessages([...chatData.chats]);
    }catch(err:any){
      console.log(err.response.data.message);
      toast.error(`${err.response.data.message} or buy additional Quota`);
    }
    
  }

  const handleDeleteChats = async ()=>{
    try{
      toast.loading("Deleting Chats..." ,{id:'deleteChats'});
      await  deleteUserChats();
      setChatMessages([]);
      toast.success('Chat messages deleted successfully' , {id:'deleteChats'});
    }catch(err:any){
      console.log(err);
      toast.error(`deleteChats failed` , {id:'deleteChats'});
    }
  }

  useLayoutEffect(()=>{
    if(auth?.isLoggedIn && auth.user){
      toast.loading("loading Chats..." ,{id:'loadChats'});
      getuserChats().then((data)=>{
        console.log(data);
        
        setChatMessages([...data.chats]);
        toast.success('successfully loaded chat messages' , {id:'loadChats'});
      }).catch((err)=>{
        console.log(err);
        
        toast.error('Failed to load chat messages' , {id:'loadChats'});
      })
    }
  },[auth]);

  useEffect(()=>{
    if(!auth?.user){
      return navigate('/login');
    }
  },[auth])
  
  return (
    <Box sx={{ display: "flex", flex: 1, width: '100%', height: '100%', mt: 3, gap: 3 }}>
      <Box sx={{ display: { md: "flex", xs: "none", sm: 'none' }, flex: 0.2, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', width: '100%', height: '60vh', bgcolor: 'rgb(17,29,39)', borderRadius: 5, flexDirection: "column", mx: 3 }}>
          <Avatar sx={{ mx: 'auto', my: 2, bgcolor: 'white', color: 'black', fontWeight: 700, p: 3 }}>
            {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices, Education, etc.
            But avoid sharing personal information.
          </Typography>
          <Button onClick={handleDeleteChats} sx={{ width: '200px', my: 'auto', color: 'white', fontWeight: '700', borderRadius: 3, mx: 'auto', bgcolor: red[300], ":hover": { bgcolor: red.A400 } }}>
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: 'column', px: 3 }}>
        <Typography sx={{ fontSize: '40px', color: 'white', mb: 2, mx: 'auto', fontWeight: 600 }}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box sx={{ width: '100%', height: '45vh', borderRadius1: 3, mx: 'auto', display: 'flex', flexDirection: 'column', overflow: 'scroll', overflowX: 'hidden', overflowY: 'auto', scrollBehavior: "smooth" }}>
          {chatMessages?.map((chat, index) => (
            //@ts-ignore
            <ChatItem key={index} content={chat.content} role={chat.role} />))}
        </Box>
        <div style={{ width: "100%", padding: "20px", borderRadius: 8, backgroundColor: "rgb(17,27,39)", display:"flex", margin:"auto" , height:'60px' }}>
          <input ref={inputRef} type="text" style={{ width: "100%", backgroundColor: "transparent", padding: "10px", border: 'none', outline: "none", color: "white", fontSize: "20px" }} />
          <IconButton onClick={handleSubmet} sx={{ml:'auto' , color:"white" ,}}><IoMdSend /></IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chat
