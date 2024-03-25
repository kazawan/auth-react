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




export function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('username') || '');
    const [isLogin, setIsLogin] = useState( localStorage.getItem('isLogin') ? true : false);
    const {msg} = Toast();
    useEffect(() => {
        checkLogin()
    }, [])

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

        }
    }

    const expCheck = () => {
        const accessTokenCreateAt = localStorage.getItem('accessTokenCreateAt');
        const accessTokenExp = localStorage.getItem('accessTokenExp');
        const refreshTokenCreateAt = localStorage.getItem('refreshTokenCreateAt');
        const refreshTokenExp = localStorage.getItem('refreshTokenExp');
        const now = new Date().getTime();
        if (now - accessTokenCreateAt > 1000 * 3) {
            // console.log('access token expired');
            msg().error('access token expired');
            rl(checkLogin);
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
                expCheck
            }
        }

        >
            {children}
        </AuthContext.Provider>
    )
}
