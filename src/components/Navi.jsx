import { Link } from "react-router-dom"
import { useAuth } from "../useAuth"
import {useNavigate }from 'react-router-dom';
import { userLogout } from "../useAuth";
import Toast from "../toast";
export default function Navi() {
    const {msg} = Toast()
    const {removeLogout,checkLogin} = useAuth();   
    const Navigate = useNavigate()
    const handleLogout = async () => {
        await userLogout(checkLogin)
        msg().success('Logout success')
        Navigate('/login')

    }
    
    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center text-green-500">
                    
                    <ul className="flex">
                        <li><Link to="/" className=" text-lg mx-2">Home</Link></li>
                        <li><Link to="/todos" className=" text-lg mx-2">Todos</Link></li>
                        <li><Link to="/login" className=" text-lg mx-2">Login</Link></li>
                        <li><Link to="/register" className=" text-lg mx-2">Regsiter</Link></li>
                        <li onClick={handleLogout} >logut</li>
                    </ul>
                    <Link to="/" className=" text-2xl font-bold">React Tailwind</Link>
                </div>
            </nav>
        </div>
    )
}