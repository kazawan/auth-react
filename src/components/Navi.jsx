import { Link } from "react-router-dom"

export default function Navi() {

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center text-green-500">
                    <Link to="/" className=" text-2xl font-bold">React Tailwind</Link>
                    <ul className="flex">
                        <li><Link to="/" className=" text-lg mx-2">Home</Link></li>
                        <li><Link to="/about" className=" text-lg mx-2">About</Link></li>
                        <li><Link to="/login" className=" text-lg mx-2">Login</Link></li>
                        <li><Link to="/register" className=" text-lg mx-2">Regsiter</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}