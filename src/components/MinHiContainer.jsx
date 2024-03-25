export default function MinHiContainer({children}) {

    return(
        <div className=" w-full h-full min-h-[600px]   p-4 flex  flex-col  justify-center items-center   ">
            {children}
        </div>
    )
}