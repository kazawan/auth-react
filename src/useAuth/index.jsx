import { createContext,useContext ,useState,useEffect} from "react";
import axios from "axios";


const AuthContext = createContext();
function useAuth(){
    return useContext(AuthContext);
}

export{
    useAuth,
    AuthContext
}

const RegsiterUrl = 'http://localhost:3000/auth/register';
export const userRegsiter = async (email,username,password) => {
    console.log('Regsitering user');
    const data = await axios.post(RegsiterUrl,{
        email,
        username,
        password
    }).then(res => res.data)
    return data
}


export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
   



    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
