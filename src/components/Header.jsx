import React from 'react'
import {  LogOut } from 'react-feather'
import { useAuth } from '../utils/AuthContext'

const Header = () => {
    const {user,handleUserLogout}=useAuth()
    console.log("user on header", user)
  return (
    <div id='header--wrapper'>
      {user ?  (<>
      Welcome {user.name}
        <LogOut  onClick={handleUserLogout}className='header--link'/>
      </>)
      :(
        <button>LOGIN</button>
      )}
    </div>
  )
}

export default Header
