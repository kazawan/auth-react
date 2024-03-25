
import { useEffect } from "react"
import { useAuth } from "../useAuth"
import { useNavigate } from "react-router-dom"
import { useToast } from "../toast"
export default function Home() {
    const { user, checkLogin, isLogin,expCheck } = useAuth()
    const Navigate = useNavigate()
    const { msg } = useToast()
    useEffect(() => {
        console.log('home')
        expCheck()
        checkLogin()

        console.log(user)
        if (isLogin === false) {
            console.log('not login')
            msg().error('Please login first')
            Navigate('/login')
        }
       

    }, [isLogin])

    return (
        <>
            <div className=" flex felx-col px-4 justify-start">
                <div className=" w-full flex-shrink-1">
                    <h1 className="text-4xl text-center">Home</h1>

                </div>
                <div className="text-center w-full">
                    <h2 className="text-2xl">Welcome {user}</h2>
                </div>
            </div>
        </>

    )
}