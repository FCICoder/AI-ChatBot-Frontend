import React, { useContext } from 'react'
import AppBar  from '@mui/material/AppBar'
import Toolbar  from '@mui/material/Toolbar'
import Logo from './shared/Logo'
import { authContext } from '../Context/AuthContext'
import NavigationLink from './shared/NavigationLink'

const Header = () => {
    let x = useContext(authContext);
    
    return (
    <>  
    <AppBar sx={{bgcolor:"transparent", position:"static" , boxShadow:"none"}}>
     <Toolbar sx={{display:"flex"}}>
        <Logo />
        <div>
            {x?.isLoggedIn? <>
            <NavigationLink  bg='#00fffc' to='/chat' text='Go To Chat' textColor='black' />
            <NavigationLink  bg='#51538f' to='/'      text='logout'     textColor='white' onClick={x?.logout} />

            </> :<>
            <NavigationLink  bg='#00fffc' to='/login' text='Login' textColor='black'  />
            <NavigationLink  bg='#51538f' to='/signup' text='Signup' textColor='white' />
            
            </>}
        </div>
     </Toolbar>
    </AppBar>
    </> )
}

export default Header
