import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { saveLogin as sl, removeLogout as rl } from "../util/auth_helper";
import Toast from "../toast";
const AuthContext = createContext();
function useAuth() {
    return useContext(AuthContext);
}

export {
    useAuth,
    AuthContext
}

const RegsiterUrl = 'http://localhost:3000/auth/register';
export const userRegsiter = async (email, username, password) => {
    console.log('Regsitering user');
    const data = await axios.post(RegsiterUrl, {
        email,
        username,
        password
    }).then(res => res.data)
    return data
}

const LoginUrl = 'http://localhost:3000/auth/login';
export const userLogin = async (email, password) => {
    console.log('Logging in user');
    const data = await axios.post(LoginUrl, {
        email,
        password
    }).then(res => res.data)
    return data
}

const refreshAccessTokenUrl = 'http://localhost:3000/auth/refreshToken';
// body: {refreshToken}
export const refreshAccessToken = async () => {
    console.log('Refreshing access token');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const data = await axios.post(refreshAccessTokenUrl, {
        refreshToken,
        accessToken
    }).then(res => res.data)
    return data
}

const LogoutUrl = 'http://localhost:3000/auth/logout';
export const userLogout = async (checkLogin) => {
    console.log('Logging out user');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const data = await axios.post(LogoutUrl, {
        accessToken,
        refreshToken
    }).then(res => res.data)
    if (checkLogin && typeof checkLogin === 'function') {
        rl(checkLogin);
        

    }

    return data
}


const GetAllUserTodoUrl = 'http://localhost:3000/todo/all';
export const getAllUserTodo = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const todos = await axios.post(GetAllUserTodoUrl, {
        accessToken
    }).then(res => res.data)
    return todos
}



export function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('username') || '');
    const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') ? true : false);
    const [todos, setTodos] = useState([]);
    const { msg } = Toast();
    useEffect(() => {
        checkLogin()
        todosGET()

    }, [])


    const todosGET = async () => {
        const data = await getAllUserTodo();
        console.log(data)
        if (data.code === 200) {
            setTodos(data.data.todos);
        } else {
            msg().error(data.message);
        }
    }

    const saveLogin = (data) => {
        sl(data, checkLogin);
    }
    const removeLogout = () => {
        rl(checkLogin);
    }

    const checkLogin = () => {
        const isLogin = localStorage.getItem('isLogin');
        // 计算access token是否过期



        if (isLogin) {
            const username = localStorage.getItem('username');
            // console.log(username);
            setUser(username);
            setIsLogin(true);
        } else {
            setUser('');
            setIsLogin(false);
            setTodos([]);

        }
    }



    const expCheck = async () => {
        if (!localStorage.getItem('accessToken') || !isLogin) {
            return;
        }
        const accessTokenCreateAt = localStorage.getItem('accessTokenCreateAt');
        const accessTokenExp = localStorage.getItem('accessTokenExp');
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshTokenExp = localStorage.getItem('refreshTokenExp');
        const refreshTokenCreateAt = localStorage.getItem('refreshTokenCreateAt');


        const now = new Date().getTime();
        if (now - refreshTokenCreateAt > refreshTokenExp) {
            // console.log('refresh token expired');
            msg().info('refresh token expired');
            // 这里直接登出
            await userLogout();
            rl(checkLogin);
            return
        }
        if (now - accessTokenCreateAt > accessTokenExp) {
            // console.log('access token expired');
            msg().info('更新access token');
            // 重新请求access token
            const data = await refreshAccessToken(localStorage.getItem('refreshToken'));
            // console.log(data);
            if (data.code === 200) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('accessTokenExp', data.accessTokenExp);
                localStorage.setItem('accessTokenCreateAt', data.accessTokenCreateAt);
            } else {
                // 这里直接登出
                msg().error(data.message);
                rl(checkLogin);
            }

        }
    }




    return (
        <AuthContext.Provider value={
            {
                user,
                setUser,
                isLogin,
                setIsLogin,
                saveLogin,
                removeLogout,
                checkLogin,
                expCheck,
                todos, 
                setTodos,
                todosGET,
            }
        }

        >
            {children}
        </AuthContext.Provider>
    )
}
