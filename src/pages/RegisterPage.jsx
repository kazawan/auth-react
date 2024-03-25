import { useEffect, useState } from "react";
import MinHiContainer from "../components/MinHiContainer"
import { userRegsiter } from "../useAuth";
import { useToast } from "../toast"

import {useNavigate }from 'react-router-dom';


export default function RegsiterPage() {
    const navigate = useNavigate();
    const {msg} = useToast();
    const [email,setEmail] = useState('kazawan@qq.com');
    const [username,setUsername] = useState('kazawan');
    const [password,setPassword] = useState('kazawan');
    const handleRegsiter = async () => {
        const data = await userRegsiter(email,username,password);
        console.log(data)
        if(data.code === 200){
            msg().success(data.message);
            navigate('/login');
        }
        else{
            msg().error(data.message);
        }
        
        setEmail('');
        setUsername('');
        setPassword('');
    }


    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const handleUsernameChange = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }



    
    return (
        <MinHiContainer>

            <div className=" w-[50%] h-full ">

                <div className="flex flex-col  ">
                    
                    <h1  className="   p-2 font-bold text-xl   animate-bounce-slow">Regsiter</h1>
                    <input value={email} onChange={(e) => handleEmailChange(e)} type="text" placeholder="Email" className=" text-black p-2 m-2 border border-gray-300" />
                    <input value={username} onChange={(e) => handleUsernameChange(e)} type="text" placeholder="username" className=" text-black p-2 m-2 border border-gray-300" />
                    <input  value={password} onChange={(e) => handlePasswordChange(e)} type="password" placeholder="Password" className=" text-black p-2 m-2 border border-gray-300" />
                    <button className="  bg-green-500 text-white font-bold p-2 m-2"
                    onClick={() => handleRegsiter()}
                    >Regsiter</button>
                </div>
            </div>
            <div>
                {email}
            </div>


        </MinHiContainer>
    )
}