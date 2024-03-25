import MinHiContainer from "../components/MinHiContainer"





export default function LoginPage() {
    return (
        <MinHiContainer>

            <div className=" w-[50%] h-full ">

                <div className="flex flex-col">
                    <h1  className=" p-2 font-bold text-xl   animate-bounce-slow">Login</h1>
                    <input type="text" placeholder="Email" className="p-2 m-2 border border-gray-300" />
                    <input type="password" placeholder="Password" className="p-2 m-2 border border-gray-300" />
                    <button className="bg-green-500 text-white font-bold p-2 m-2">Login</button>
                </div>
            </div>


        </MinHiContainer>
    )
}