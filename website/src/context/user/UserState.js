import React from 'react'
import { useState } from 'react'
import { backendHost } from '../../lib/host'
import UserContext from './userContext'

export default function UserState() {
    const [user,setUser] = useState('')
    const login = (data)=>{
        axios.post(`${backendHost}/auth/login`,data)
      .then(res=>{
          setUser(res.data)
            navigate('/')
      })
      .catch(err=>{
        console.log(err)
      })
    }
    const isAdmin = user.admin || false
  return (
      <UserContext.Provider value={{user,login}} >
          {props.children}
      </UserContext.Provider>
  )
}
