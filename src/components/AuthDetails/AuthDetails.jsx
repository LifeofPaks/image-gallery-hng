import React, { useEffect, useState } from 'react'
import {auth} from '../../config/Firebase'
import { onAuthStateChanged } from 'firebase/auth'


const AuthDetails = () => {
    const [checkUser, setCheckUser] = useState(null)

    useEffect(() =>{
        const check = onAuthStateChanged(auth, (user) =>{
            if(user){
                setCheckUser(user)
            } else{
                setCheckUser(null)
            }
        })
    }, [])


  return (
    <section className='authDetails'>
        {
            checkUser ? <p>Signed In</p> : <p>Signed Out</p>
        }
    </section>
  )
}

export default AuthDetails