import {useEffect ,useState} from 'react'
import { useNavigate} from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addUser } from '../redux/UserReducer';
import axios from 'axios'

// To ignore the error is a type of unknown message
// "compilerOptions": {
//     "useUnknownInCatchVariables": false
//   }


interface User {
    email: string;
    password: string;
  }

export default function Login (){
    const [user, setUser] = useState<User>()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async ()=>{
        try{
            const response = await axios.post('http://localhost:3333/login', user)
            const {data} = response

            if(response.status === 200){
                const dispatcher = {email: data.email, firstName: data.firstName, lastName: data.lastName}
                dispatch(addUser(dispatcher))
                navigate('home')
            }

        }catch(error){
            const {errorMsg} = error.response.data
            setError(errorMsg)
            setPassword('')
        }
    }

    useEffect(()=>{
        if(user){
            handleLogin()
        }
    },[user])

    return <>

        <div className='login-container'>
            <div className='login-form'>
                <input className='email-input' value={email} minLength={5} name='email' type='text' placeholder='EMAIL' onChange={(e)=>{
                setEmail(e.target.value)
                }}/>

                <input className='password-input' value={password} minLength={5} name='password' type='password' placeholder='PASSWORD' onChange={(e)=>{
                setPassword(e.target.value)
                }}/>
            
                <button id='login-button' onClick={(e)=>{
                    e.preventDefault()
                    setUser({email, password})
                }}>LOGIN</button>

            </div>
            <div className="notify-link">
            {error && <p className='error-notify-login'>{error}</p>}

            <p id='register-redirect' onClick={()=>{navigate('/register')}}>DOESN'T HAVE AN ACCOUNT? REGISTER NOW!</p>
            </div>
            
        </div>


    </>


}

