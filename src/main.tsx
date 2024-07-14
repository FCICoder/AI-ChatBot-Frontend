import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { AuthProvider } from './Context/AuthContext.tsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL = 'https://ai-chat-bot-backend-five.vercel.app';
axios.defaults.withCredentials = true;

const theme = createTheme({ typography: { fontFamily: 'Roboto Slab , serif', allVariants: { color: "white" } } })
ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position='top-right'/>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
)
