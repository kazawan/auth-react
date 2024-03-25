import { useState } from "react"
import MinHiContainer from "../components/MinHiContainer"
import {useToast} from "../toast"
import { userLogin } from "../useAuth"
import { useAuth } from "../useAuth"
import {useNavigate }from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('kazawan@qq.com')
    const [password, setPassword] = useState('kazawan')
    const { msg } = useToast()
    const {user,setUser,saveLogin} = useAuth()
    const navigate = useNavigate()
    

    const handelLogin =async () => {
        const data = await userLogin(email,password)
        if(data.code === 200){
            console.log(data)
            saveLogin(data)
            msg().success(data.message)
            
            navigate('/')
        }
        else{
            console.log(data)
            msg().error(data.message)
        }
    }

    return (
        <MinHiContainer>

            <div className=" w-[50%] h-full ">

                <div className="flex flex-col text-black">
                    <h1  className=" p-2 font-bold text-xl text-white   animate-bounce-slow">Login</h1>
                    <input type="text" placeholder="Email" className="p-2 m-2 border border-gray-300"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    
                    />
                    <input type="password" placeholder="Password" className="p-2 m-2 border border-gray-300" 
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-green-500 text-white font-bold p-2 m-2" onClick={handelLogin} >Login</button>
                </div>
            </div>


        </MinHiContainer>
    )
}