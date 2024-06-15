import SearchBox from "./SearchBox";

export default function HomePage(){
    const sessionId = window.localStorage.getItem("id")
    return(
        <>
            {sessionId ? <SearchBox /> : (
                <div className='flex items-center justify-center h-[90vh]'>
                    <h1 className='capitalize text-white text-3xl font-semibold text-center rounded-tl-2xl rounded-br-2xl shadow-2xl px-4 py-8 bg-[#1D4350] transition-transform duration-500 ease-in-out transform hover:scale-105'>OOPS!! You haven't logged in yet <br /> please log in to create short link
                    </h1>
                </div>
            )}

        </>
    )
}