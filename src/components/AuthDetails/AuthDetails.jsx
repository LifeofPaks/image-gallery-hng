import React, { useEffect, useState } from 'react'
import {auth} from '../../config/Firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import './AuthDetails.scss'

const AuthDetails = () => {
    const [checkUser, setCheckUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() =>{
        const check = onAuthStateChanged(auth, (user) =>{
            if(user){
                setCheckUser(user)
            } else{
                setCheckUser(null)
            }
        })

        return ()=>{
            check()
        }
    }, [])

    const signOutUser = ()=>{
        signOut(auth).then(() =>{
            console.log('sign out successful')
            navigate('/login')
            
        }).catch((error) =>{
            console.log(error)
        })
    }


  return (
    <section className='authDetails'>
        {
            checkUser && 
            <div className="signedIn">
                <p>Signed In</p> 
                <button onClick={signOutUser} > Log Out</button>
                
                </div>
        }
    </section>
  )
}

export default AuthDetails