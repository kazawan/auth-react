
import { useEffect } from "react"
import { useAuth } from "../useAuth"
import { useNavigate } from "react-router-dom"
import { useToast } from "../toast"

export default function Home() {
    const { user, checkLogin, isLogin,expCheck ,todos,setTodos,todosGET} = useAuth()
    const Navigate = useNavigate()
    const { msg } = useToast()
    useEffect(() => {
        // console.log('home')
        expCheck()
        checkLogin()
        todosGET()
        // console.log(user)
        if (isLogin === false) {
            console.log('not login')
            msg().error('Please login first')
            Navigate('/login')
        }
       
       

    }, [isLogin])

    const todolist = todos.map((todo) => {
        return (
            <div key={todo.id} className="flex flex-row justify-between p-2 border-b border-gray-300">
                <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.content}</p>
                </div>
                <div>
                    <button className="bg-red-500 text-white p-2" onClick={() => deleteTodoById(todo.id)}>Delete</button>
                </div>
            </div>
        )
    })

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
            <div>
                {todolist}
            </div>

        </>

    )
}