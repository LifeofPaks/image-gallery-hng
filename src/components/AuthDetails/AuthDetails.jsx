import React, { useEffect, useState } from 'react'
import {auth} from '../../config/Firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'


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

        return ()=>{
            check()
        }
    }, [])

    const signOutUser = ()=>{
        signOut(auth).then(() =>{
            console.log('sign out successful')
        }).catch((error) =>{
            console.log(error)
        })
    }


  return (
    <section className='authDetails'>
        {
            checkUser && 
            <div className="signedIn">
                <p>Signed In</p> : <p>Signed Out</p>
                <button onClick={signOutUser} > <Link path='/login'>Log Out</Link></button>
                
                </div>
        }
    </section>
  )
}

export default AuthDetails