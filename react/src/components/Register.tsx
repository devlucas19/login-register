import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }

export default function Register(){
    const [user, setUser] = useState<User>()
    const [email, setEmail] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [succefulMsg, setSuccefulMsg] = useState<boolean>()

    const navigate = useNavigate()
    
    const fetchData = async()=>{
        try {
            const response = await axios.post('http://localhost:3333/register', user);
            const {data} = response

            if(response.status === 201){
                console.log(data);
                setSuccefulMsg(true)
                setError('')
            // navigate('/')
            }
          }
        catch (error) {
            const {errorMsg} = error.response.data
            setError(errorMsg)
          }
    }

    useEffect(()=>{
        if(user!= null){
            fetchData()
        }
    },[user])

    return <>
    
    <div className='resgister-form'>
        <input type="text" value={firstName} name="firstName" className="firstName-register-input" placeholder='FIRST NAME' onChange={(e)=>{
                setFirstName(e.target.value)
            }}/>

        <input type="text" value={lastName} name="lastName" className="lastName-register-input" placeholder='LAST NAME' onChange={(e)=>{
                setLastName(e.target.value)
            }}/>

        <input type="email" value={email} name="email" className="email-register-input" placeholder='EMAIL' onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            
        <input type="password" value={password} name="password" className="password-register-input" placeholder='PASSWORD' onChange={(e)=>{
                setPassword(e.target.value)
            }}/>

        <button id="register-button" onClick={()=>{
            setUser({firstName: firstName, lastName: lastName, email: email, password: password})
        }}>REGISTER</button>

        {error && <p id='error-notify-register'>{error}</p>}

        {succefulMsg && <p onClick={()=>{navigate('/')}} id='registered-notify'>ACCOUNT REGISTERED, GO TO LOGIN</p>}

    </div>
    </>

}